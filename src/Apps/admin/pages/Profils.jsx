import React, { useEffect } from "react";

//les containers
import ListProfils from "../containers/Profils/ListProfils";
import FormAddProfil from "../containers/Profils/FormAddProfil";
import DetailsProfil from "../containers/Profils/DetailsProfil";

//redux
import { enableModal } from "../api/Profils/modal";
import { connect } from "react-redux";

const Profils = ({ sendTitle, modalVisible, enableModal }) => {
  useEffect(() => {
    sendTitle("Profils");
  });

  return (
    <div className="Profils row">
      <div className="col-12">
        <div className="row d-flex justify-content-center">
          <section id="profil_list" className="col-4 d-flex flex-column">
            <ListProfils />
            <div className="row">
              <button
                className="btn btn-secondary rounded-0 col-12"
                onClick={() => enableModal()}
              >
                Ajouter un nouveau profil
              </button>
            </div>
          </section>
          <section
            id="profil_details"
            className="col-5"
          >
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
  return { modalVisible };
};

const ProfilsConnected = connect(mapStateToProp, { enableModal })(Profils);
export default ProfilsConnected;
