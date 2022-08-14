import { Grid, Typography } from "@mui/material";
import React from "react";
import Form from "./Form";

export default function PatientRef() {
  return (
    <>
      <Grid item xs={12} style={{ height: "20vh" }}>
        <Grid container style={{ justifyContent: "center" }}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              style={{ font: "Montserrat" }}
            >
              Patient Referral Form
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              letterSpacing={3}
              variant="h6"
              align="center"
              style={{ font: "Montserrat" }}
            >
              Haveys Valley Health San Francisco
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        style={{ backgroundColor: "#CDE7ED", height: "auto", minHeight: '80vh' }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            style={{ font: "Montserrat" }}
          >
            Referral Patients
          </Typography>
          <Typography
            variant="h6"
            align="center"
            style={{ font: "Montserrat" }}
          >
            You can add up to five patients at a times
          </Typography>
          <Grid item xs={12} align='center' style={{marginTop: '50px'}}>
            <Grid item xs={2}/>
            <Grid item xs={8}>
              <Form />
            </Grid>
            <Grid item xs={2}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
