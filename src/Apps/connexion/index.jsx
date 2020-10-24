import Axios from "axios";
import Particles from 'react-particles-js'
import React, { useState, useContext } from "react";
import { Cookies } from "react-cookie";
import illus from "../../static/images/illus.jpg";
import intersatLogo from "../../static/images/intersat.jpg";
import { LockOpenOutlined, SupervisedUserCircle } from "@material-ui/icons";
import winhealthLogo from "../../static/images/winhealth.png";
import logo from "../../static/images/logo4.png";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import alteaLogo from "../../static/images/0.png";
import { header } from "../global/apiQuery";
import { Button, TextField } from '@material-ui/core'
//components
import GlobalContext, { Info } from "../global/context";
import { withStyles } from "@material-ui/core/styles";
const Input = withStyles({
  root: {
    "& label.Mui-focused": {
      color: Info.theme.primary,
    },
    "_& .MuiInput-underline:after": {
      borderBottomColor: Info.theme.primary,
    },
    get "& .MuiInput-underline:after"() {
      return this["_& .MuiInput-underline:after"];
    },
    set "& .MuiInput-underline:after"(value) {
      this["_& .MuiInput-underline:after"] = value;
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: Info.theme.primary,
      },
    },
  },
})(TextField);

const Connexion = () => {
  const cookies = new Cookies(); //instantier le module des cookies
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false); // s'il ya une erreur elle s'affiche là
  const [login, setlogin] = useState(""); //For input login
  const [pass, setpass] = useState(""); //For input pass

  function changeLogin({ target: { value } }) { setlogin(value); }
  function changePass({ target: { value } }) { setpass(value); }
  function connexionUser(login, pass) {
    seterror(false);
    setloading(true);
    Axios({
      url: `/connexion/verify/user`,
      baseURL: header.url,
      method: "post",
      data: { login: login, pass: pass },
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
      .then((reponse) => reponse.data)
      .then((data) => {
        if (data) {
          //ajouter toujours les path comme options sinon ca ne marchera pas à long terme pour la deconnexion
          cookies.set("user_winhealth", data, { expire: 0, path: "/" });
          cookies.set("currentPage", data.nomapp.toLowerCase(), { expire: 0, path: "/", }); window.location = "/admin";
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
        <section id="form_connexion" className="form col-12 px-5 d-flex justify-content-center align-items-center" >
          <div className="col-5 p-5 white-text">
            <h1 className="font-weight-bold Oswald display-4">Bienvenue</h1>
            <h4 className="font-weight-bold Oswald">Sur votre interface de connexion de la plateforme e-sante Winhealth.</h4>
            <Particles width={500} height={500} />
          </div>
          <div className="col-2 white px-3 py-3 shadow-lg rounded" style={{ opacity: 0.92 }}>
            <div className="row">
              <div className="text-dark text-center col-12 mb-2">
              </div>
              <div className="col-12">
                <div className="row mx-1">
                  <Input
                    required
                    className="col"
                    variant="filled"
                    size="small"
                    label="Identifiant"
                    onChange={changeLogin}
                    error={error}
                  />
                </div>
                <div className="row mt-3 mx-1">
                  <Input
                    required
                    className="col"
                    variant="filled"
                    type="password"
                    size="small"
                    label="Mot de passe"
                    onKeyPress={(ev) => { ev.charCode === 13 && connexionUser(login, pass); }}
                    onChange={changePass}
                    error={error}
                  />
                </div>
              </div>
              <br />
              <div className="col-12 mt-2 d-flex justify-content-center flex-column align-items-center">
                <div className="text-center">
                  {loading ? (<small className="grey-text text-center small">Verification ...</small>) :
                    error ? (<small className="red-text text-center small">Données incorrectes, veuillez reessayer</small>) :
                      (<small className="grey-text text-center small">Veuillez remplir tous les champs</small>)
                  }
                </div>
              </div>
              <div className="row white" style={{ position: 'fixed', bottom: '0.5cm', right: "0.7cm", zIndex:1001}}>
                <img style={{ height: "2cm" }} src={alteaLogo} />
              </div>
            </div>
            <Button
              variant="contained"
              endIcon={<LockOpenOutlined />}
              className="white-text col mt-2 font-weight-bold"
              disabled={login.trim().length === 0 || pass.trim().length === 0}
              onClick={() => { connexionUser(login, pass) }}
              style={{ backgroundColor: "#2E88A0", textTransform: "none" }}
            >Connexion</Button>
          </div>
          <img className="col-4 offset-1" src={illus} alt="" id="illus" />
        </section>
      </div>
    </div >
  );
};
export default Connexion;
