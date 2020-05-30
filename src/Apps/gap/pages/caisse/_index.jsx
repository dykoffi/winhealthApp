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

const Caisse = ({
  sendTitle,
  currentPage,
  setCurrentPage,
  setNotification,
  notification,
}) => {
  useEffect(() => {
    sendTitle("Caisse");
    const son = new Audio("../../../../static/son.mp3");
    socket.on("facture_nouvelle", () => {
      son.play();
      setNotification(true);
    });
  });

  return (
    <div className="Caisse row">
      <section className="col-12 px-3 bg-light">
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

const CaisseConnected = connect(mapStatToProp, {
  setCurrentPage,
  setNotification,
})(Caisse);
export default CaisseConnected;
