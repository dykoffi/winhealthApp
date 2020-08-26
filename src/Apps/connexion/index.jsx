import Axios from "axios";
import React, { useState, useContext } from "react";
import { Cookies } from "react-cookie";
import logo from "../../static/images/logo4.png";
import { header } from "../global/apiQuery";
import { TextField } from '@material-ui/core'
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
        <section id="form_connexion" className="form col-12 px-5 d-flex justify-content-center align-items-center" >
          <div className="col-2 white px-3 py-3 rounded shadow-lg" style={{ opacity: 0.82 }}>
            <div className="row">
              <div className="text-dark text-center col-12 mb-2">
                <img src={logo} alt="" className="col-7" /><br />
                <small>WinHealth Connexion</small>
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
              <div className="col-12 mt-3">
                <div className="text-center">
                  {loading ? (<small className="grey-text text-center small">Verification ...</small>) :
                    error ? (<small className="red-text text-center small">Données incorrectes, veuillez reessayer</small>) :
                      (<small className="grey-text text-center small">Veuillez remplir tous les champs</small>)
                  }
                </div>
                <button
                  className="btn btn-sm white-text col-6 mt-2 offset-3"
                  disabled={login.trim().length === 0 || pass.trim().length === 0}
                  onClick={() => { connexionUser(login, pass) }}
                  style={{ backgroundColor: global.theme.primary }}
                >Connexion</button>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Connexion;
