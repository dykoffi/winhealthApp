import React, { useEffect } from "react";
import Listonglets from "./_onglets";
import Listpages from "./_pages";
import Onglet from "../../../../containers/onglets/index";
import { connect } from "react-redux";
import Notif from "../../../../components/Notification";

//import des action creators
import { setCurrentPage, setNotification } from "../../api/caisse/pages";
import { socket } from "../../../global/apiQuery";
import { Snackbar } from "@material-ui/core";

const Statistiques = ({
  sendTitle,
  currentPage,
  setCurrentPage,
  setNotification,
  notification,
}) => {
  useEffect(() => {
    sendTitle("Statistiques");
  });

  return (
    <div className="Statistiques row">
      <section className="col-12">
        <Onglet
          links={Listonglets}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <section
        className="col-12 px-3 mt-2"
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
        <Notif title="Nouvelle facture" cancel={() => setNotification(false)}>
          <br />
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

const StatistiquesConnected = connect(mapStatToProp, {
  setCurrentPage,
  setNotification,
})(Statistiques);
export default StatistiquesConnected;
