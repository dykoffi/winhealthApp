import Axios from "axios";
import React, { useState, useContext } from "react";
import { Cookies } from "react-cookie";
import logo from "../../static/images/wh_logo.png";
import { header } from "../global/apiQuery";
import LoadingPoint from "../../components/LoadingPoint";
import { TextField, Button } from "@material-ui/core";
import ThemeContext from "../global/context";
import LockOpenIcon from "@material-ui/icons/LockOpen";
//components

const Connexion = () => {
  const cookies = new Cookies();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [login, setlogin] = useState("");
  const [pass, setpass] = useState("");

  const theme = useContext(ThemeContext);
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
      url: `/connexion/verify/user`,
      baseURL: header.url,
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
          cookies.set("currentPage", data.nomapp.toLowerCase(), {
            expire: 0,
            path: "/",
          });
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
          className="form col-12 px-5 d-flex justify-content-center align-items-center"
        >
          <div
            className="col-3 white px-5 py-4 rounded"
            style={{ opacity: 0.92 }}
          >
            <div className="row">
              <div className="text-dark text-center col-12 mb-2">
                <img src={logo} alt="" className="col-5" />
                <h6 className="lead">WinHealth Connexion</h6>
              </div>
              <div className="col-12">
                <TextField
                  error={error}
                  required
                  className="my-2 col-12"
                  variant="outlined"
                  size="small"
                  label="Identifiant"
                  value={login}
                  onChange={changeLogin}
                />
                <TextField
                  error={error}
                  required
                  className="my-2 col-12"
                  variant="outlined"
                  size="small"
                  type="password"
                  label="Password"
                  value={pass}
                  onChange={changePass}
                />

                <br />
                <div className="text-center">
                  {loading ? (
                    <LoadingPoint />
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
                <Button
                  variant="contained"
                  endIcon={<LockOpenIcon />}
                  disabled={
                    login.trim().length === 0 || pass.trim().length === 0
                  }
                  onClick={() => {
                    connexionUser(login, pass);
                  }}
                  className="white-text col-12 mt-4"
                  style={{
                    textTransform: "none",
                    backgroundColor: theme.primary,
                  }}
                >
                  Connexion
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Connexion;
