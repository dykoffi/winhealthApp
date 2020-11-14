import React, { useEffect } from "react";
import Listonglets from "./_onglets";
import Listpages from "./_pages";
import Onglet from "../../../../containers/onglets/index";
import { connect } from "react-redux";

//import des action creators
import { setCurrentPage } from "../../api/utilisateur/pages";
const Utilisateur = ({ sendTitle, currentPage, setCurrentPage }) => {
  useEffect(() => {
    sendTitle("Utilisateurs");
  });

  return (
    <div className="Utilisateur row">
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
    </div>
  );
};

const mapStatToProp = (state) => {
  const {
    pageReducer: { currentPage },
  } = state;
  return { currentPage };
};

const UtilisateurConnected = connect(mapStatToProp, { setCurrentPage })(
  Utilisateur
);
export default UtilisateurConnected;
