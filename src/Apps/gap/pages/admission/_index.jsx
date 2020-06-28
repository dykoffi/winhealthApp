import React, { useEffect } from "react";
import Listonglets from "./_onglets";
import Listpages from "./_pages";
import Onglet from "../../../../containers/onglets/index";
import { connect } from "react-redux";

//import des action creators
import { setCurrentPage } from "../../api/admission/pages";
const Admission = ({ sendTitle, currentPage, setCurrentPage }) => {
  useEffect(() => {
    sendTitle("Admission");
  });

  return (
    <div className="Admission row">
      <section className="col-12 px-3 bg-light">
        <Onglet
          links={Listonglets}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <section
        className="col-12"
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
    </div>
  );
};

const mapStatToProp = (state) => {
  const {
    pageReducer: { currentPage },
  } = state;
  return { currentPage };
};

const AdmissionConnected = connect(mapStatToProp, { setCurrentPage })(
  Admission
);
export default AdmissionConnected;
