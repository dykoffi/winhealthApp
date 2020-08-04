import React, { useEffect } from "react";
import Listonglets from "./_onglets";
import Listpages from "./_pages";
import Onglet from "../../../../containers/onglets/index";
import { connect } from "react-redux";

//import des action creators
import { setCurrentPage, setNotification } from "../../api/assurance/pages";


const Assurance = ({
  sendTitle,
  currentPage,
  setCurrentPage,
  setNotification,
  notification,
}) => {
  useEffect(() => {
    sendTitle("Assurances");
  });

  return (
    <div className="Assurance row">
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
    </div>
  );
};

const mapStatToProp = (state) => {
  const {
    pageReducer: { currentPage, notification },
  } = state;
  return { currentPage, notification };
};

const AssuranceConnected = connect(mapStatToProp, {
  setCurrentPage,
  setNotification,
})(Assurance);
export default AssuranceConnected;
