import React, { useState, useEffect } from "react";
import Axios from "axios";
const FormAddUser = () => {
  const [apps, setapps] = useState([]);
  const [appActive, setappActive] = useState(0);
  const [profils, setprofils] = useState([]);
  const [profilActive, setprofilActive] = useState(0);

  useEffect(() => {
    Axios({
      url : ``
    })
  });
  return (
    <div className="row">
      <div className="col-12 FormAddUser d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-7 white ">
            <div className="row d-flex justify-content-center">
              <div className="col-5 p-5 text-left">
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
              <div className="col-6 p-5 text-left">
                <small>Choisissez votre application</small>
                <div className="row p-3 chooseApp">
                  <div className="border m-1 text-center p-2 col-sm">
                    <span>GAP</span>
                  </div>
                </div>
                <small>Selectionner un profil de connexion</small>
                <div className="row p-3 chooseProfil">
                  <div className="border m-1 text-center p-2 col-md">
                    <span>Admin</span>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end pr-5 pb-5">
                <button className="btn btn-secondary rounded-0">Annuler</button>
                <button className="btn btn-success rounded-0">
                  Valider la creation
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
