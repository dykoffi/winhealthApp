import Axios from "axios";
import React, { useState, useContext } from "react";
import { Cookies } from "react-cookie";
import logo from "../../static/images/logo4.png";
import intersatLogo from "../../static/images/intersat.jpg";
import { LockOpenOutlined, SupervisedUserCircle } from "@material-ui/icons";
import winhealthLogo from "../../static/images/winhealth.png";
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
  const cookies = new Cookies();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [login, setlogin] = useState("");
  const [pass, setpass] = useState("");
  const global = useContext(GlobalContext);

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
        <section id="form_connexion" className="form col-12 px-5 d-flex justify-content-end align-items-center" >
          {/* <div className="col-6 ml-4">
            <h1 className="display-1 font-weight-bold textcolor-secondaryDark">Bienvenue</h1>
            <h1 className="font-weight-bold grey-text darken-1 bg-white mb-1">sur l'une des meilleures plateformes </h1>
            <h1 className="font-weight-bold grey-text darken-1 bg-white mb-1">de gestion adminitratives du monde et</h1>
            <h1 className="font-weight-bold grey-text darken-1 bg-white">sur la planète</h1>
          </div> */}
          <div className="col-3 white px-3 py-3 rounded shadow-lg" style={{ opacity: 0.82 }}>
            <div className="row">
              <div className="text-dark text-center col-12 mb-2">
                <SupervisedUserCircle style={{ fontSize: 150 }} className="blue-grey-text" />
                {/* <img src={logo} alt="" className="col-5" /><br /> */}
                <h4 className="font-weight-bold blue-grey-text">Connexion</h4>
              </div>
              <div className="col-12">
                <div className="row mx-1">
                  <Input
                    required
                    className="col"
                    variant="outlined"
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
                    variant="outlined"
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
              <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                <img src={alteaLogo} />
                <img src={intersatLogo} />
                <img src={winhealthLogo} />
              </div>
              <div className="col-12 mt-3 d-flex justify-content-center flex-column align-items-center">
                <div className="text-center">
                  {loading ? (<small className="grey-text text-center small">Verification ...</small>) :
                    error ? (<small className="red-text text-center small">Données incorrectes, veuillez reessayer</small>) :
                      (<small className="grey-text text-center small">Veuillez remplir tous les champs</small>)
                  }
                </div>
                <Button
                  variant="contained"
                  endIcon={<LockOpenOutlined />}
                  className="white-text col-6 mt-2"
                  disabled={login.trim().length === 0 || pass.trim().length === 0}
                  onClick={() => { connexionUser(login, pass) }}
                  style={{ backgroundColor: global.theme.primary }}
                >Connexion</Button>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </section>
      </div>
    </div>
  );
};
export default Connexion;
