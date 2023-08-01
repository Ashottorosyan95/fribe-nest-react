import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { searchPlacesByText, searchPlacesByCoordinates } from '../../utils/apis';
import markerIcon from '../../assets/images/places_pin.svg';
import pinIcon from '../../assets/images/pin.svg';
import fribeLogo from '../../assets/images/fribe-logo.png';
import { useClickOutside } from '../../hooks/useClickOutside';

var infoWindow = null;

const SearchPlace = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchValue, setSearchValue] = useState("");
  const [coordinates, setCoordinates] = useState({
    lng: '',
    lat: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [googleMap, setGoogleMap] = useState(null);
  const [googleMarker, setGoogleMarker] = useState(null);
  const ref = React.useRef();
  useClickOutside(ref, () => setShowResults(false));

  const handleSearchClick = async (value) => {
    infoWindow?.close();
    setSearchResults([])
    if (value) {
      const filters = {
        search: value
      }
      const result = await searchPlacesByText(filters, enqueueSnackbar);
      setSearchResults(result.data);
      setShowResults(true);
    } else if (coordinates.lat && coordinates.lng) {
      const filters = {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      }
      const result = await searchPlacesByCoordinates(filters, enqueueSnackbar);
      if (result.data) {
        setSearchResults([result.data]);
      }
      setShowResults(true);
    }
  }

  const handleApiLoaded = () => {
    let geocoder = new window.google.maps.Geocoder();
    googleMap.addListener('click', function (event) {
      infoWindow?.close();
      geocoder.geocode(
        { 'latLng': event.latLng },
        function (results, status) {
          if (results[0]) {
            let formatted_address = results[0].formatted_address;
            infoWindow = new window.google.maps.InfoWindow({
              position: event.latLng.toJSON(),
            });
            infoWindow.setContent(formatted_address);
            infoWindow.open(googleMap, googleMarker);
          }
        }
      )
      googleMarker.setPosition(event.latLng.toJSON())
      googleMap.panTo(event.latLng);
    });
  };

  const handleRowClick = (row) => {
    let lat = row?.latitude || row?.location?.coordinates[1];
    let lng = row?.longitude || row?.location?.coordinates[0];
    googleMap.setCenter({
      lat,
      lng
    });
    googleMap.setZoom(18);
    googleMarker.setPosition({
      lat,
      lng
    })
    setSearchValue(`${row?.name}, ${row?.formattedAddress}`);
    setShowResults(false);
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { 'latLng': new window.google.maps.LatLng(lat, lng) },
      function (results, status) {
        if (results[0]) {
          let formatted_address = results[0].formatted_address;
          infoWindow = new window.google.maps.InfoWindow({
            position: new window.google.maps.LatLng(lat, lng),
          });
          infoWindow.setContent(formatted_address);
          infoWindow.open(googleMap, googleMarker);
        }
      }
    )
  }

  const getCurrentPositionPromise = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
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

  return (
    <div className="search-place-screen">
      <div className="filter-grid">
        <div ref={ref} className="form-group search-places-field">
          <input type="text" className="form-control primary-form-control" placeholder="Search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value); handleSearchClick(e.target.value) }} />
          {showResults ?
            <div className="search-result">
              <div className="search-result-container">
                {searchResults.length ? searchResults.map((res) => {
                  return (
                    <div className="d-flex align-items-center result-row" key={res._id} onClick={() => handleRowClick(res)}>
                      <img src={markerIcon} alt='marker' />
                      <strong className="mx-2 text-capitalize">{res.name + ", "}</strong>
                      <span>{res.formattedAddress}</span>
                    </div>
                  )
                }) : <div>No result found</div>}
              </div>
              <div className="d-flex align-items-center justify-content-center search-result-footer">
                <img src={fribeLogo} alt="fribe logo" />
                <span>Fribe</span>
              </div>
            </div> : null
          }
        </div>
        <div className='search-btn'>
          <button type="button" onClick={handleSearchClick}>Search</button>
        </div>
        <div className="form-group coordinates-field">
          <input type="number" className="form-control primary-form-control" placeholder="Latitude" value={coordinates.lat} onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })} />
        </div>
        <div className="form-group coordinates-field">
          <input type="number" className="form-control primary-form-control" placeholder="Longitude" value={coordinates.lng} onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })} />
        </div>
      </div>
      <div className="map-container">
        <div id='myMap' style={{ height: "100%" }} />
      </div>
    </div>
  )
}

export default SearchPlace