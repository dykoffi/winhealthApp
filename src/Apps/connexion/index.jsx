import Axios from "axios";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
//components
import Clock from "../../components/Clock";

const Connexion = () => {
  const cookies = new Cookies();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [login, setlogin] = useState("");
  const [pass, setpass] = useState("");

  function changeLogin({ target: { value } }) {
    setlogin(value);
  }
  function changePass({ target: { value } }) {
    setpass(value);
  }
  function connexionUser(login, pass) {
    seterror(false);
    setloading(true);
    Axios({
      url: "http://localhost:8000/connexion/verify/user",
      method: "post",
      data: {
        login: login,
        pass: pass,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((reponse) => reponse.data)
      .then((data) => {
        if (data) {
          //ajouter toujours les path comme options sinon ca ne marchera pas à long terme pour la deconnexion
          cookies.set("user", data, { expire: 0, path: "/" });
          cookies.set("currentPage", data.app, { expire: 0, path: "/" });
          window.location = "/admin";
        } else {
          setloading(false);
          seterror(true);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="col-12" id="Connexion">
      <div className="row page">
        <section
          id="form_connexion"
          className="form col-12 d-flex justify-content-center align-items-center"
        >
          <div className="col-3 white p-4" style={{ opacity: 0.92 }}>
            <div className="row">
              <div className="text-dark text-center col-12">
                <i className=" mr-2 mdi-5x"></i>
                <h4 className="lead">WinHealth Connexion</h4>
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
                  {loading ? (
                    <small className="grey-text text-center">
                      Verification en cours ...
                    </small>
                  ) : error ? (
                    <small className="red-text text-center">
                      Données incorrectes, veuillez reessayer
                    </small>
                  ) : (
                    <small className="grey-text text-center">
                      Veuillez remplir tous les champs
                    </small>
                  )}
                </div>
                <button
                  className="btn btn-info rounded-0 col-12 mt-4"
                  disabled={
                    login.trim().length === 0 || pass.trim().length === 0
                  }
                  onClick={() => {
                    connexionUser(login, pass);
                  }}
                >
                  Connexion
                </button>
              </div>
            </div>
          </div>
          <div style={{ position: "fixed", bottom: 0, right: 0, opacity: 0.9 }}>
            <Clock position="fixed" />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Connexion;
