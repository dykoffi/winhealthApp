import React, { useEffect } from "react";
import Listonglets from "./_onglets";
import Listpages from "./_pages";
import Onglet from "../../../../containers/onglets/index";
import { connect } from "react-redux";
import Notif from "../../../../components/Notification";

//import des action creators
import { setCurrentPage, setNotification } from "../../api/encaissement/pages";
import { Snackbar } from "@material-ui/core";

const Encaissement = ({
  sendTitle,
  currentPage,
  setCurrentPage,
  setNotification,
  notification,
}) => {
  useEffect(() => {
    sendTitle("Encaissements");
  });

  return (
    <div className="Encaissement row">
      <section className="col-12">
        <Onglet
          links={Listonglets}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <section
        className="col-12 px-3"
        style={{
          height: "90vh",
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

const EncaissementConnected = connect(mapStatToProp, {
  setCurrentPage,
  setNotification,
})(Encaissement);
export default EncaissementConnected;
