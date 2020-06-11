import React from "react";
import TablePatients from "../../containers/soins/TableListPatients";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Patients = ({ loading }) => {
  return (
    <div className="row p-3 Patients">
      <div className="col-12">
        <TablePatients />
      </div>
      <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={loading}
        >
          <MuiAlert
            elevation={6}
            variant="standard"
            severity="info"
          >
            Recherche de patients ...
          </MuiAlert>
        </Snackbar>
    </div>
  );
};

const mapStateToProp = (state) => {
  const {
    patientsReducer: { loading },
  } = state;
  return { loading };
};

const PatientConnected = connect(mapStateToProp)(Patients);
export default PatientConnected;
