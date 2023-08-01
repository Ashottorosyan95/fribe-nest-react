import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { countries } from '../../helpers/countriesList';
import { createLocation, getPlacesByCoordinates, uploadExcel } from '../../utils/apis';
import pinIcon from '../../assets/images/pin.svg';
import { categories } from '../../helpers/categoriesList';

let markers = [];
let showLocationsGlobal = false;

const AddPlace = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [googleMap, setGoogleMap] = useState(null);
  const [googleMarker, setGoogleMarker] = useState(null);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const inputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    formattedAddress: "",
    latitude: "",
    longitude: "",
    city: "",
    country: "",
    category: ""
  });
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileReset = (e) => {
    setFile(null);
    inputRef.current.value = null
  };

  const handleReset = () => {
    setFormData({
      name: "",
      formattedAddress: "",
      latitude: "",
      longitude: "",
      city: "",
      country: "",
      category: ""
    });
  };

  const handleFormSubmit = async (e) => {
    if (formData.name && formData.longitude && formData.latitude && formData.formattedAddress && formData.city && formData.country && formData.category) {
      const result = await createLocation(formData, enqueueSnackbar);
      result.status === 201 && handleReset();
    } else {
      enqueueSnackbar("All fields are required.", { variant: "error" });
    }
  };

  const handleFileUploadServer = async () => {
    if (file) {
      setUploadLoader(true);
      const formDataFile = new FormData();
      formDataFile.append("file", file);

      try {
        const result = await uploadExcel(formDataFile, enqueueSnackbar);
        result && handleFileReset();
        setUploadLoader(false);
        enqueueSnackbar("File uploaded successfully!", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(`Error uploading file: ${error}`, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Please provide excel file first", { variant: "error" });
    }
  };

  const handleApiLoaded = () => {
    googleMap.addListener('click', async function (event) {
      document.querySelector('button[title=Close]')?.click()
      googleMarker.setPosition(event.latLng.toJSON());
      googleMap.panTo(event.latLng);
      await displayLocation(event.latLng.toJSON().lat, event.latLng.toJSON().lng);
    });
  };

  function displayLocation(latitude, longitude) {
    let geocoder = new window.google.maps.Geocoder();
    let latlng = new window.google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
      { 'latLng': latlng },
      function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let formatted_address = results[0].formatted_address;
            let value = formatted_address.split(",");
            let country = value[value.length - 1];
            let city = results[0].address_components.filter(ac => ~ac.types.indexOf('locality'))[0].long_name
            setFormData({
              name: document.querySelector('.title')?.innerHTML || formatted_address,
              latitude,
              longitude,
              formattedAddress: formatted_address,
              city: city.trim(),
              country: country.trim(),
            })
          }
          else {
            enqueueSnackbar(`Address not found`, { variant: "error" });
          }
        }
        else {
          enqueueSnackbar(`Geocoder failed due to: ${status}`, { variant: "error" });
        }
      }
    )
  }

  const getCurrentPositionPromise = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const getBoundsRadius = (map) => {
    let bounds = map.getBounds();
    let r = 6378.8;
    let ne_lat = bounds.getNorthEast().lat() / 57.2958;
    let ne_lng = bounds.getNorthEast().lng() / 57.2958;
    let c_lat = bounds.getCenter().lat() / 57.2958;
    let c_lng = bounds.getCenter().lng() / 57.2958;
    let r_km = r * Math.acos(
      Math.sin(c_lat) * Math.sin(ne_lat) +
      Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
    ) * 1000;
    return r_km;
  }

  const fetchLocations = async (map) => {
    const filters = {
      location: `${map.getCenter().lng()},${map.getCenter().lat()}`,
      radius: getBoundsRadius(map)
    };
    const places = await getPlacesByCoordinates(filters, enqueueSnackbar)
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    if (places?.data && places?.data?.length) {
      places.data.forEach(place => {
        const m = new window.google.maps.Marker({
          position: { lat: place.latitude, lng: place.longitude },
          map,
          icon: pinIcon
        })
        markers.push(m);
      })
    }
  }

  const loadMap = async () => {
    if ("geolocation" in navigator) {
      try {
        const position = await getCurrentPositionPromise();
        const { latitude, longitude } = position.coords;
        const map = new window.google.maps.Map(document.getElementById('myMap'), {
          center: { lat: latitude, lng: longitude },
          zoom: 13,
          styles: [{
            featureType: 'all',
            elementType: 'labels',
            stylers: [{
              visibility: 'on'
            }]
          }]
        });
        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          icon: pinIcon
        });

        window.google.maps.event.addListener(map, 'idle', async function () {
          if (showLocationsGlobal) {
            fetchLocations(map || googleMap)
          }
        });
        displayLocation(latitude, longitude)
        setGoogleMap(map);
        setGoogleMarker(marker);
      } catch (error) {
        enqueueSnackbar(error, {
          variant: "error"
        });
      }
    } else {
      enqueueSnackbar("Geolocation is not supported by this browser", {
        variant: "error"
      });
    }
  };

  useEffect(() => {
    loadMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (googleMap && googleMarker) {
      handleApiLoaded(googleMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMarker, googleMap])

  useEffect(() => {
    if (showLocations) {
      fetchLocations(googleMap)
    } else {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLocations])


  return (
    <div className="row m-0 w-100">
      <div className="col-6">
        <p className="fs-18 fw-500 fribe-secondary-dark-text mb-4">
          Here you can update, remove and add new location to the databases and it will reflects to users
          immediately.
        </p>
        <div className="row m-0 w-100 row-gap-3">
          <div className="col-6 grid-col-side-padding ps-0">
            <label htmlFor="modifyLocationTitle" className="form-label primary-form-label">Title</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control primary-form-control" id="modifyLocationTitle" />
          </div>
          <div className="col-6 grid-col-side-padding pe-0">
            <label htmlFor="modifyLocationLatitude" className="form-label primary-form-label">Latitude</label>
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="form-control primary-form-control" id="modifyLocationLatitude" />
          </div>
          <div className="col-6 grid-col-side-padding ps-0">
            <label htmlFor="modifyLocationAddress" className="form-label primary-form-label">Address</label>
            <input type="text" name="formattedAddress" value={formData.formattedAddress} onChange={handleChange} className="form-control primary-form-control" id="modifyLocationAddress" />
          </div>
          <div className="col-6 grid-col-side-padding pe-0">
            <label htmlFor="modifyLocationLongtitude" className="form-label primary-form-label">Longitude</label>
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="form-control primary-form-control" id="modifyLocationLongtitude" />
          </div>
          <div className="col-6 grid-col-side-padding">
            <label htmlFor="modifyLocationCity" className="form-label primary-form-label">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control primary-form-control" id="modifyLocationCity" />
          </div>
          <div className="col-6 grid-col-side-padding">
            <label htmlFor="modifyLocationCategory" className="form-label primary-form-label">Category</label>
            <select id="modifyLocationCategory" name="category" value={formData.category} onChange={handleChange} className="form-select" aria-label="Time window">
              <option value={""} disabled>Category</option>
              {categories.map((category) => {
                return (
                  <option key={category} value={category}>{category}</option>
                )
              })}
            </select>
          </div>
          <div className="col-6 grid-col-side-padding">
            <label htmlFor="modifyLocationCountry" className="form-label primary-form-label">Country name</label>
            <select id="modifyLocationCountry" name="country" value={formData.country} onChange={handleChange} className="form-select" aria-label="Time window">
              <option value={""} disabled>Choose a country</option>
              {countries.map((country) => {
                return (
                  <option key={country} value={country}>{country}</option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="my-5 border-bottom pb-5 add-place-actions-grid">
          <button className="btn fribe-primary-btn modify-location-btn-submit" onClick={handleFormSubmit}>Submit</button>
          {/* <button className="btn fribe-primary-outline-btn">Update</button> */}
        </div>

        <div>
          <p className="fs-18 fw-600 text-black">Attach xslx or csv</p>
          <div className="d-flex align-items-center gap-3">
            <div className="input-bg-dark-light">
              {file ? file.name : ""}
              <input
                ref={inputRef}
                type="file"
                id="upload-excel"
                onChange={handleFileUpload}
              />
            </div>
            {file ?
              <button className="btn btn-danger" onClick={handleFileReset}>Clear</button> : null
            }
            <button className="btn attached-upload-btn" disabled={uploadLoader} onClick={handleFileUploadServer}>{uploadLoader ? 'Loading...' : 'Upload'}</button>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="form-check form-switch custom-switch-lg mb-3">
          <input className="form-check-input" type="checkbox" role="switch" id="hideShowLocations" checked={showLocations} onChange={(e) => { setShowLocations(e.target.checked); showLocationsGlobal = e.target.checked }} />
          <label className="form-check-label" htmlFor="hideShowLocations">{showLocations ? 'Hide locations' : 'Show locations'}</label>
        </div>
        <div id='myMap' style={{ height: "100%" }} />
      </div>
    </div>
  )
}

export default AddPlace;