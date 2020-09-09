import React, { useEffect } from "react";
import Listonglets from "./_onglets";
import Listpages from "./_pages";
import Onglet from "../../../../containers/onglets/index";
import { connect } from "react-redux";
import Notif from "../../../../components/Notification";

//import des action creators
import { setCurrentPage, setNotification } from "../../api/caisse/pages";
import { Snackbar } from "@material-ui/core";

const Administration = ({
  sendTitle,
  currentPage,
  setCurrentPage,
  setNotification,
  notification,
}) => {
  useEffect(() => {
    sendTitle("Administration");
  });

  return (
    <div className="Administration row">
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

const AdministrationConnected = connect(mapStatToProp, {
  setCurrentPage,
  setNotification,
})(Administration);
export default AdministrationConnected;