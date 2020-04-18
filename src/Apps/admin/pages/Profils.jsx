import React, { useEffect } from "react";

//les containers
import ListProfils from "../containers/Profils/ListProfils";
import FormAddProfil from "../containers/Profils/FormAddProfil";
import DetailsProfil from "../containers/Profils/DetailsProfil";

//redux
import { enableModal } from "../api/Profils/modal";
import { connect } from "react-redux";
import StatsProfil from "../containers/Profils/StatsProfil";

const Profils = ({ sendTitle, modalVisible, enableModal, appActive }) => {
  useEffect(() => {
    sendTitle("Profils");
  });

  return (
    <div className="Profils row">
      <div className="col-12">
        <div className="row d-flex justify-content-center">
          <section id="profil_list" className="col-3 d-flex flex-column">
            <ListProfils />
            <div className="row">
              <button
                className="btn white text-info rounded-0 col-12"
                onClick={() => enableModal()}
                title={
                  appActive
                    ? "ajouter un profil"
                    : "Veuillez choisir d'abord un module"
                }
                disabled={appActive === null}
              >
                <small>Ajouter un nouveau profil</small>
              </button>
            </div>
          </section>
          <section className="col-3 d-flex flex-column ml-3">
            <StatsProfil />
          </section>
          <section id="profil_details" className="col-4">
            <DetailsProfil />
          </section>
        </div>
      </div>
      {modalVisible && <FormAddProfil />}
    </div>
  );
};

const mapStateToProp = (state) => {
  const {
    modalReducer: { visible: modalVisible },
  } = state;
  const {
    appReducer: { appActive },
  } = state;
  return { modalVisible, appActive };
};

const ProfilsConnected = connect(mapStateToProp, { enableModal })(Profils);
export default ProfilsConnected;
