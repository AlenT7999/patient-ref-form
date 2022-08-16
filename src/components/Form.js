import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  AccountCircle,
  Add,
  CakeOutlined,
  DeleteOutline,
  Email,
  Phone,
  TranslateOutlined,
} from "@mui/icons-material";
import * as yup from "yup";
import API from "../utils/axios";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const initialValues = {
  firstName: "",
  lastName: "",
  dob: "",
  language: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

const style = {
  textFiedStyle: {
    marginTop: "15px",
  },
};
export default function Form() {
  const colors = ["#25A575", "#2595A5", "#3A719B", '#254B7A', "#142B58"];
  const validationSchema = yup.object({
    firstName: yup.string().required("first name is required").min(3),
    lastName: yup.string().required("last name is required"),
    dob: yup.string().required("date of birth is required"),
    language: yup.string().required("contact language is required"),
    phone: yup
      .number()
      .moreThan(999999999, "10 digits required")
      .typeError("numbers are allowed")
      .required("Mobile is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("email is required"),
    address: yup.string().max(100).required("address is required"),
    notes: yup.string().max(100),
  });
  const [referrals, setReferrals] = useState([]);
  const [type, setType] = useState("text");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const [address, setAddress] = useState("");

  const sendReferrals = () => {
    if (referrals && referrals.length !== 0) {
      API.post(`/patient`, referrals)
        .then((response) => {
          const { status, message } = response.data;
          if (status) {
            setAlertColor("success");
            setMessage(
              `Success! You have submitted ${referrals.length} pending requests. You will be notified once they've been approved`
            );
            setOpen(true);
          } else {
            setMessage(message);
            setAlertColor("error");
            setOpen(true);
          }
        })
        .catch((error) => {
          setMessage(error.message);
          setAlertColor("error");
          setOpen(true);
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanger = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  const deleteItem = (i) => {
    console.log('idex', i);
    let items = [...referrals];
    items.splice(i,1);
    setReferrals(items);
    console.log('reff', referrals);
  }

  return (
    <>
      {referrals &&
        referrals.map((row, i) => {
          return (
            <Grid style={{ marginBottom: "10px" }} key={i}>
              <Grid style={{ backgroundColor: "white" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container style={{ height: "5vh" }}>
                      <Grid
                        item
                        xs={1}
                        style={{
                          backgroundColor: colors[i],
                          paddingTop: "10px",
                        }}
                      >
                        {i + 1}
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        align="left"
                        style={{ paddingTop: "10px", paddingLeft: "5px" }}
                      >
                        {row.firstName + " " + row.lastName}
                      </Grid>
                      <Grid 
                        item
                        xs={1}
                        align="right"
                        style={{ paddingTop: "10px", paddingLeft: "5px" }}>
                          <DeleteOutline onClick={()=>{deleteItem(i)}}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log("values", values, "address", address);
          setReferrals((oldData) => [...oldData, values]);
          actions.resetForm({
            firstName: "",
            lastName: "",
            dob: "",
            language: "",
            phone: "",
            email: "",
            address: "",
            notes: "",
          });
          setAddress('');
          // console.log('works');
        }}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          values,
          touched,
          setFieldValue,
        }) => {
          return (
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{ marginTop: "20px" }}
            >
              <Grid style={{ backgroundColor: "white", paddingBottom: "20px" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container style={{ height: "5vh" }}>
                      <Grid
                        item
                        xs={1}
                        style={{
                          backgroundColor: colors[referrals.length + 1],
                          paddingTop: "10px",
                        }}
                      >
                        {referrals.length + 1}
                      </Grid>
                      <Grid
                        item
                        xs={11}
                        align="left"
                        style={{ paddingTop: "10px", paddingLeft: "5px" }}
                      >
                        New Referral
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item style={{ marginLeft: "20px" }}>
                  <Grid item xs={5}>
                    <TextField
                      style={style.textFiedStyle}
                      fullWidth
                      required
                      placeholder="First Name *"
                      id="outlined-required"
                      variant="standard"
                      name="firstName"
                      helperText={touched.firstName && errors.firstName}
                      error={touched.firstName && !!errors.firstName}
                      onChange={handleChange}
                      value={values.firstName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <TextField
                      style={style.textFiedStyle}
                      fullWidth
                      required
                      placeholder="Last Name *"
                      id="outlined-required"
                      variant="standard"
                      name="lastName"
                      helperText={touched.lastName && errors.lastName}
                      error={touched.lastName && !!errors.lastName}
                      onChange={handleChange}
                      value={values.lastName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* second row */}

                  <Grid item xs={5}>
                    <TextField
                      style={style.textFiedStyle}
                      fullWidth
                      required
                      placeholder="Date of Birth *"
                      type={type}
                      id="outlined-required"
                      variant="standard"
                      name="dob"
                      helperText={touched.dob && errors.dob}
                      error={touched.dob && !!errors.dob}
                      onChange={handleChange}
                      value={values.dob}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CakeOutlined />
                          </InputAdornment>
                        ),
                      }}
                      onFocus={() => setType("date")}
                      onBlur={() => setType("text")}
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <TextField
                      style={style.textFiedStyle}
                      fullWidth
                      required
                      placeholder="Contact Language *"
                      id="outlined-required"
                      variant="standard"
                      name="language"
                      helperText={touched.language && errors.language}
                      error={touched.language && !!errors.language}
                      onChange={handleChange}
                      value={values.language}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TranslateOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* third row */}

                  <Grid item xs={5}>
                    <TextField
                      style={style.textFiedStyle}
                      fullWidth
                      required
                      placeholder="Phone *"
                      id="outlined-required"
                      variant="standard"
                      name="phone"
                      helperText={touched.phone && errors.phone}
                      error={touched.phone && !!errors.phone}
                      onChange={handleChange}
                      value={values.phone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <TextField
                      style={style.textFiedStyle}
                      fullWidth
                      required
                      placeholder="Email *"
                      id="outlined-required"
                      variant="standard"
                      name="email"
                      helperText={touched.email && errors.email}
                      error={touched.email && !!errors.email}
                      onChange={handleChange}
                      value={values.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    {/* <TextField
                    style={style.textFiedStyle}
                    fullWidth
                    required
                    id="outlined-required"
                    placeholder="Address *"
                    variant="standard"
                    name="address"
                    helperText={touched.address && errors.address}
                    error={touched.address && !!errors.address}
                    onChange={handleChange}
                    value={values.address}
                  /> */}
                    <PlacesAutocomplete
                      value={address}
                      onChange={(e) => {
                        setFieldValue("address", e);
                        handleChanger(e);
                      }}
                      onSelect={(e) => {
                        setFieldValue("address", e);
                        handleSelect(e);
                      }}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <TextField
                            fstyle={style.textFiedStyle}
                            fullWidth
                            required
                            id="outlined-required"
                            placeholder="Address *"
                            variant="standard"
                            name="address"
                            helperText={
                              address == "" && touched.address
                                ? "address is required"
                                : null
                            }
                            error={
                              address == "" &&
                              touched.address &&
                              !!errors.address
                            }
                            onChange={() => {
                              console.log("works");
                            }}
                            value={address}
                            style={style.textFiedStyle}
                            {...getInputProps({
                              className: "location-search-input",
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, i) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                  key={i}
                                >
                                  <div
                                    style={{
                                      backgroundColor: "white",
                                      padding: "10px",
                                      boxShadow: "2px 2px 2px 2px grey",
                                    }}
                                  >
                                    <span style={{ backgroundColor: "white" }}>
                                      {suggestion.description}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      style={style.textFiedStyle}
                      fullWidth
                      required
                      id="outlined-required"
                      placeholder="Notes/Reason"
                      variant="standard"
                      name="notes"
                      onChange={handleChange}
                      value={values.notes}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {referrals.length < 5 ? (
                <Grid
                  style={{
                    width: "fit-content",
                  }}
                >
                  <Button
                    style={{
                      color: "black",
                    }}
                    variant="text"
                    type="submit"
                    startIcon={<Add />}
                  >
                    ADD ANOTHER PATIENT
                  </Button>
                </Grid>
              ) : null}
              <Grid align="center" style={{ marginTop: "20px" }}>
                <Button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#0B2B5B",
                    width: "100%",
                    color: "white",
                  }}
                  onClick={sendReferrals}
                >
                  SEND REFERRALS
                </Button>
              </Grid>
            </form>
          );
        }}
      </Formik>
      <Snackbar
        style={{ backgroundColor: "#25A575" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={6000}
        // eslint-disable-next-line
        key={"top" + "center"}
      >
        <Alert
          onClose={handleClose}
          severity={alertColor}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
