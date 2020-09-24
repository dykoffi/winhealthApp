import React from "react";
import TablePatients from "../../containers/admission/TableListPatients";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { setLoading } from '../../api/admission/patients'
const Patients = ({ loading, setLoading }) => {
  return (
    <div className="row p-2 Patients">
      <div className="col-12">
        <TablePatients />
      </div>
      <Snackbar open={loading} onClose={() => setLoading(false)}>
        <Alert variant='standard' severity="info" >
          Chargement ...
                </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProp = (state) => {
  const {
    PatientReducer: { loading },
  } = state;
  return { loading };
};

const PatientConnected = connect(mapStateToProp, { setLoading })(Patients);
export default PatientConnected;
