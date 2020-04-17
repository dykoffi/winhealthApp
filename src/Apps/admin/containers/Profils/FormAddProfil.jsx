import React, { useState } from "react";
import { Check } from "../../../../components/Listcheck";
import LoadingPoint from "../../../../components/LoadingPoint";
import { useEffect } from "react";
import Axios from "axios";
import Loading from "../../../../components/Loading";
import moment from "moment";

import { disableModal } from "../../api/Profils/modal";
import { thunkUpdateListProfil } from "../../api/Profils/list";
import { connect } from "react-redux";
import { header } from "../../constants/apiQuery";
import Aucun from "../../../../components/Aucun";

const FormAddProfil = ({
  disableModal,
  thunkUpdateListProfil,
  appActive,
  nomApp,
}) => {
  moment.locale("fr");
  const [profil, setprofil] = useState("");
  const [loadAdd, setloadAdd] = useState(false);
  const [profilExist, setprofilExist] = useState(false);
  const [list, setlist] = useState([]);
  const [checkedlist, setchecked] = useState([]);

  const [loading, setloading] = useState(null);
  const [aucun, setaucun] = useState(null);

  useEffect(() => {
    setloading(true);
    Axios({
      url: `/admin/list/${appActive}/droits`,
      baseURL: header.url,
      method: "GET",
    })
      .then((res) => res.data.rows)
      .then((data) => {
        setloading(false);
        data.length === 0 ? setaucun(true) : setlist(data);
      });
  }, [appActive]);

  function toogleCheck(code) {
    checkedlist.includes(code)
      ? setchecked([...checkedlist.filter((x) => x !== code)])
      : setchecked([...checkedlist, code]);
  }

  function change({ target: { value } }) {
    setprofil(value.toUpperCase());
    verifyProfil(value.toUpperCase());
  }

  function verifyProfil(profil) {
    if (profil.trim().length) {
      setloadAdd(true);
      setprofilExist(false)
      Axios({
        url: `/admin/strictsearch/${appActive}/profil/${profil}`,
        baseURL: header.url,
        method: "GET",
      })
        .then((res) => res.data.rows)
        .then((data) => {
          console.log(data);
          setloadAdd(false);
          data.length === 0 ? setprofilExist(false) : setprofilExist(true);
        });
    }
  }

  function addProfil() {
    setloadAdd(true);
    thunkUpdateListProfil(appActive, profil, checkedlist);
  }

  return (
    <div className="row">
      <div className="FormAddProfil col-12 d-flex justify-content-center align-items-center">
        <div className="col-4 white p-3">
          <h5 className="lead text-center">
            Ajouter un nouveau profil - {nomApp}
          </h5>
          <div className="p-3">
            <input
              value={profil}
              onChange={change}
              type="text"
              className="col-12 p-2"
              autoFocus
              placeholder="entrez le nom du profil"
            />
            <small>{checkedlist.length} droit(s) selectionné(s)</small>
            <div className="row p-3">
              <div
                className={`"col-12 p-3 ${
                  list.length === 0 &&
                  "d-flex justify-content-center align-items-center"
                }`}
                style={{
                  height: "50vh",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
              >
                {loading && <Loading text="Chargement des droits" />}
                {aucun ? (
                  <Aucun text={`aucun droit détecté pour ${nomApp}`} />
                ) : (
                  list.map(({ labeldroit, codedroit }) => (
                    <Check
                      selected={checkedlist.includes(codedroit)}
                      text={labeldroit}
                      key={codedroit}
                      click={() => {
                        toogleCheck(codedroit);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="row">
              <button
                className="btn btn-secondary rounded-0"
                onClick={() => disableModal()}
              >
                Annuler
              </button>
              <button
                disabled={
                  profil.trim().length === 0 || checkedlist.length === 0 || profilExist
                }
                className="btn btn-primary rounded-0"
                onClick={() => addProfil()}
              >
                Valider la saisie
              </button>
              {loadAdd && (
                <div className="d-flex col-sm align-items-center justify-content-center">
                  <LoadingPoint />
                </div>
              )}
              {profilExist && (
                <div className="d-flex col-sm align-items-center justify-content-center text-danger">
                  <small>Ce profil existe deja dans {nomApp}</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapPropToState = (state) => {
  const {
    appReducer: { appActive, nomApp },
  } = state;
  return { appActive, nomApp };
};
const FormAddProfilConnected = connect(mapPropToState, {
  disableModal,
  thunkUpdateListProfil,
})(FormAddProfil);
export default FormAddProfilConnected;
