import React, { useState, useEffect } from "react";
import Axios from "axios";
import { disableModal } from "../../api/Users/modal";
import { thunkUpdateListUser } from "../../api/Users/list";
import password from "../../api/Users/getPassword";
import { connect } from "react-redux";
import { header } from "../../constants/apiQuery";
import Check from "../../../../components/Check";
import Text from "../../../../components/Text";
import LoadingPoint from "../../../../components/LoadingPoint";

const FormAddUser = ({
  disableModal,
  appActive,
  nomApp,
  thunkUpdateListUser,
}) => {
  const [profils, setprofils] = useState([]);
  const [profilActive, setprofilActive] = useState(null);
  const [loading, setloading] = useState(null);
  const [aucun, setaucun] = useState(null);

  const [nom, setnom] = useState("");
  const [prenoms, setprenoms] = useState("");
  const [contact, setcontact] = useState("");
  const [mail, setmail] = useState("");
  const [poste, setposte] = useState("");
  const [pass] = useState(password(5));

  function firstName(name) {
    return name.split(" ")[0];
  }

  function handleNom({ target: { value } }) {
    setnom(value);
  }
  function handlePrenoms({ target: { value } }) {
    setprenoms(value);
  }

  function send() {
    thunkUpdateListUser(
      appActive,
      nom,
      prenoms,
      contact,
      mail,
      poste,
      profilActive,
      pass
    );
  }

  function novalid() {
    return (
      nom.trim().length === 0 ||
      prenoms.trim().length === 0 ||
      poste.trim().length === 0 ||
      contact.trim().length === 0 ||
      mail.trim().length === 0 ||
      profilActive === null
    );
  }

  useEffect(() => {
    setloading(true);
    Axios({
      url: `/admin/list/${appActive}/profils`,
      baseURL: header.url,
      method: "GET",
    })
      .then((response) => response.data.rows)
      .then((data) => {
        setloading(false);
        data.length === 0 ? setaucun(true) : setprofils(data);
      });
  }, [appActive]);
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
                  value={nom}
                  onChange={(ev) => {
                    handleNom(ev);
                  }}
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Prenoms"
                  value={prenoms}
                  onChange={(ev) => {
                    handlePrenoms(ev);
                  }}
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Contact"
                  value={contact}
                  onChange={(ev) => {
                    setcontact(ev.target.value);
                  }}
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Mail"
                  value={mail}
                  onChange={(ev) => {
                    setmail(ev.target.value);
                  }}
                />
                <input
                  type="text"
                  className="col-12 mt-2 p-2"
                  placeholder="Poste"
                  value={poste}
                  onChange={(ev) => {
                    setposte(ev.target.value);
                  }}
                />
                <hr />
                <small>{`Login :  ${
                  nom[0]
                    ? nom[0].toUpperCase() +
                      "." +
                      firstName(prenoms.toLowerCase())
                    : ""
                }`}</small>
                <br />
                <small>{`password :  ${pass}`}</small>
              </div>
              <div className="col-6 p-3 text-left">
                <small>Selectionner un profil de connexion {nomApp}</small>
                <div className="row p-3 chooseProfil">
                  <div
                    className={`"col-12 p-3 ${
                      profils.length === 0 &&
                      "d-flex justify-content-center align-items-center"
                    }`}
                    style={{
                      height: "50vh",
                      overflowY: "scroll",
                      scrollbarWidth: "none",
                    }}
                  >
                    {loading && <LoadingPoint />}
                    {aucun ? (
                      <Text text={`aucun profil détecté pour ${nomApp}`} />
                    ) : (
                      profils.map(({ labelprofil, idprofil }, i) => (
                        <div
                          key={i}
                          className={`col-12 ${
                            appActive === idprofil && "active"
                          }`}
                        >
                          <Check
                            selected={profilActive === idprofil}
                            text={labelprofil}
                            key={idprofil}
                            click={() => {
                              setprofilActive(idprofil);
                            }}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end pr-3 pb-3">
                <button
                  className="btn btn-secondary rounded-0"
                  onClick={disableModal}
                >
                  <small>Annuler</small>
                </button>
                <button
                  onClick={send}
                  className="btn btn-info rounded-0"
                  disabled={novalid()}
                >
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

const mapStateToProp = (state) => {
  const {
    appReducer: { appActive, nomApp },
  } = state;
  return { appActive, nomApp };
};

const FormAddUserConnected = connect(mapStateToProp, {
  disableModal,
  thunkUpdateListUser,
})(FormAddUser);
export default FormAddUserConnected;
