import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { Fragment, useState } from "react";
import { create, uploadExcel } from "./utils/apis";

export default function AddressForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    formattedAddress: "",
    latitude: 0.0,
    longitude: 0.0,
    country: "",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("formData: ", formData);
    let data = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };
    const result = await create(data, enqueueSnackbar);
    result && handleReset();
  };

  const handleFileReset = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      formattedAddress: "",
      latitude: 0.0,
      longitude: 0.0,
      country: "",
    });
  };

  const handleFileUploadServer = async () => {
    if (file) {
      const formDataFile = new FormData();
      formDataFile.append("file", file);

      try {
        const result = await uploadExcel(formDataFile, enqueueSnackbar);
        result && handleReset();
        console.log("File uploaded successfully!");
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    } else {
      enqueueSnackbar("Please provide excel file first", { variant: "error" });
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit}>
        <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
          <Box sx={{ m: 5, padding: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Title
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Country
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Address
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="formattedAddress"
                  name="formattedAddress"
                  label="Address"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={formData.formattedAddress}
                  onChange={handleChange}
                />
              </Grid>

              {/*  */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Latitude
                </InputLabel>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="latitude"
                  name="latitude"
                  label="Latitude"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={formData.latitude}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Longtitude
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="longitude"
                  name="longitude"
                  label="Longtitude"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={formData.longitude}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Upload Excel
                </InputLabel>
              </Grid>

              <Grid item xs={12} sm={6}>
                <input
                  accept=".xlsx, .xls"
                  id="upload-excel"
                  type="file"
                  name="excelFile"
                  style={{ display: "none" }}
                  onChange={!file ? handleFileUpload : null}
                />

                <Stack direction={"row"} spacing={2}>
                  <label htmlFor="upload-excel">
                    <Button
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      variant="outlined"
                      style={{ color: file ? "red" : undefined }} // Updated line
                    >
                      {file ? file.name : "Upload Excel"}
                    </Button>
                  </label>
                  {file && (
                    <Button variant="outlined" onClick={handleFileReset}>
                      <ClearIcon style={{ color: "red" }} />
                    </Button>
                  )}
                  <Button variant="outlined" onClick={handleFileUploadServer}>
                    Upload
                  </Button>
                </Stack>
              </Grid>

              {/* Company Dropdown */}
              {/* <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Company</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Company"
                    onChange={handleChange}
                  >
                    {categories.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid item xs={12} sm={12}>
                <Stack
                  direction={"row"}
                  display={"flex"}
                  spacing={2}
                  justifyContent={"flex-end"}
                >
                  <Button variant="contained" color="primary" type="submit">
                    Create
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
    </Fragment>
  );
}
