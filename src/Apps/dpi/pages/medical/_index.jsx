import React, { useEffect, useState } from "react";
import Listonglets from "./_onglets";
import Listpages from "./_pages";
import Onglet from "../../../../containers/onglets/index";
import { connect } from "react-redux";

import Notif from "../../../../components/Notification";

//import des action creators
import { setCurrentPage, setNotification } from "../../api/medical/pages";
import { thunkDetailsPatient } from "../../api/medical/patients";
import { socket } from "../../../global/apiQuery";
import { Snackbar } from "@material-ui/core";
const Soins = ({
  sendTitle,
  currentPage,
  setCurrentPage,
  notification,
  setNotification,
  thunkDetailsPatient,
}) => {
  const [data, setdata] = useState({});
  useEffect(() => {
    sendTitle("DPI Medical");
    socket.on("nouveau_patient", ({ sejour, patient }) => {
      setdata({ sejour, patient });
      setNotification(true);
    });
  }, []);

  return (
    <div className="Soins row">
      <section className="col-12 pt-3 px-3 grey lighten-4 ombre-bottom">
        <Onglet
          links={Listonglets}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <section
        className="col-12 p-3"
        style={{
          height: "83vh",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {Listpages.map(
          ({ id, Component }, index) =>
            id === currentPage && <Component key={index} />
        )}
      </section>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={notification}
        className="col-2"
      >
        <Notif
          title="Nouveau patient"
          valid={() => {
            thunkDetailsPatient(data.patient, data.sejour);
            setNotification(false);
          }}
          cancel={() => setNotification(false)}
        >
        <p></p>
        </Notif>
      </Snackbar>
    </div>
  );
};

const mapStatToProp = (state) => {
  const {
    pageReducer: { currentPage, notification },
  } = state;
  return { currentPage, notification };
};

const SoinsConnected = connect(mapStatToProp, {
  setCurrentPage,
  setNotification,
  thunkDetailsPatient,
})(Soins);
export default SoinsConnected;
