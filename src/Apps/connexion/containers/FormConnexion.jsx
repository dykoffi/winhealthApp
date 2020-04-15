import React, { useState } from "react";

//conntainers
import Form from "../../../containers/Form";

const FormConnexion = ({ connexionUser }) => {
  //les etats locaux
  const [login, setlogin] = useState("");
  const [pass, setpass] = useState("");

  function changeLogin({ target: { value } }) {
    setlogin(value);
  }
  function changePass({ target: { value } }) {
    setpass(value);
  }

  return (
    <div className="row">
      <div className="text-dark text-center col-12">
        <i className=" mr-2 mdi-5x"></i>
        <h4 className="lead">WINHEALTH Connexion</h4>
        <small className="text-secondary text-center col">
          Veuillez vous authentifier
        </small>
      </div>
      <div className="col-12">
        <input
          value={login}
          onChange={changeLogin}
          type="text"
          className="col-12 text-center p-2 mt-3"
          autoFocus
          placeholder="Entrez votre identifiant"
        />
        <input
          value={pass}
          onChange={changePass}
          type="password"
          className="col-12 text-center p-2 mt-2"
          placeholder="Entrez votre password"
        />
        <br />
        <div className="text-center">
          {/* <small className="red-text font-weight-bold">Données incorrectes, reessayez</small> */}
          <small className="grey-text text-center">
            Veuillez remplir tous les champs
          </small>
        </div>
        <button
          className="btn btn-danger rounded-0 col-12 mt-4"
          disabled={login.trim().length === 0 || pass.trim().length === 0}
          onClick={() => {
            connexionUser(login, pass);
          }}
        >
          Connexion
        </button>
      </div>
    </div>
  );
};
export default FormConnexion;
