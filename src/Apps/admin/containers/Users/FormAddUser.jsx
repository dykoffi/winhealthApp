import React, { useState, useEffect } from "react";
import Axios from "axios";
const FormAddUser = () => {
  const [apps, setapps] = useState([]);
  const [appActive, setappActive] = useState(0);
  const [profils, setprofils] = useState([]);
  const [profilActive, setprofilActive] = useState(0);

  useEffect(() => {
    Axios({
      url: ``,
    });
  });
  return (
    <div className="row">
      <div className="col-12 FormAddUser d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-5 white ">
            <div className="row d-flex justify-content-center">
              <div className="col-5 p-3 text-left">
                <small>Informations de l'utilisateur</small>
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Nom"
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Prenoms"
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Contact"
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Mail"
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Pass"
                />
              </div>
              <div className="col-6 p-3 text-left">
                <small>Choisir l'application</small>
                <div className="row p-3 chooseApp">
                  <small>GAP</small>
                </div>
                <small>Selectionner un profil de connexion</small>
                <div className="row p-3 chooseProfil">
                  <small>Admin</small>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end pr-3 pb-3">
                <button className="btn btn-secondary rounded-0">
                  <small>Annuler</small>
                </button>
                <button className="btn btn-info rounded-0">
                  <small>Valider</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
