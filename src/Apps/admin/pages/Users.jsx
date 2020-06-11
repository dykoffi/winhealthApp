import React, { useEffect } from "react";

//les containers
import ListUsers from "../containers/Users/ListUsers";
import DetailsUser from "../containers/Users/DetailsUser";
import FormAddUser from "../containers/Users/FormAddUser";

//redux
import { enableModal } from "../api/Users/modal";
import { connect } from "react-redux";
import StatsUser from "../containers/Users/StatsUser";

const Users = ({ sendTitle, modalVisible, enableModal, appActive }) => {
  useEffect(() => {
    sendTitle("Utilisateurs");
  });

  return (
    <div className="Users row">
      <div className="col-12">
        <div className="row d-flex justify-content-center">
          <section id="user_list" className="col-3 d-flex flex-column">
            <ListUsers />
            <div className="row">
              <button
                className="btn white text-info rounded-0 col-12"
                onClick={() => enableModal()}
                title={
                  appActive
                    ? "ajouter un utilisateur"
                    : "Veuillez choisir d'abord un module"
                }
                disabled={appActive === null}
              >
                <small>Ajouter un nouvel utilisateur</small>
              </button>
            </div>
          </section>
          <section className="col-3 d-flex flex-column ml-3">
            <StatsUser />
          </section>
          <section id="user_details" className="col-4">
            <DetailsUser />
          </section>
        
        </div>
      </div>
      {modalVisible && <FormAddUser />}
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

const UsersConnected = connect(mapStateToProp, { enableModal })(Users);
export default UsersConnected;
