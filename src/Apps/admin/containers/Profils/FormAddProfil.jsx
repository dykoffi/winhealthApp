import React, { useState } from "react";

import Check from "../../../../components/Check";
import LoadingPoint from "../../../../components/LoadingPoint";
import { useEffect } from "react";
import Axios from "axios";
import moment from "moment";

import { disableModal } from "../../api/Profils/modal";
import { thunkUpdateListProfil } from "../../api/Profils/list";
import { connect } from "react-redux";
import { header } from "../../constants/apiQuery";
import Text from "../../../../components/Text";

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
    setprofil(value);
    verifyProfil(value);
  }

  function verifyProfil(profil) {
    if (profil.trim().length) {
      setloadAdd(true);
      setprofilExist(false);
      Axios({
        url: `/admin/strictsearch/${appActive}/profil/${profil}`,
        baseURL: header.url,
        method: "GET",
      })
        .then((res) => res.data.rows)
        .then((data) => {
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
      <div className="FormAddProfil Modal col-12 d-flex justify-content-center align-items-center">
        <div className="col-3 white p-3">
          <small className="text-center">
            Ajouter un nouveau profil - {nomApp}
          </small>
          <input
            value={profil}
            onChange={change}
            type="text"
            className="col-12 rounded p-1"
            autoFocus
            placeholder="Entrez le nom du profil"
          />
          <div>
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
                {loading && <LoadingPoint />}
                {aucun ? (
                  <Text text={`aucun droit détecté pour ${nomApp}`} />
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
            <div className="row pl-2">
              <button
                className="btn btn-secondary rounded-0"
                onClick={() => disableModal()}
              >
                <small>Annuler</small>
              </button>
              <button
                disabled={
                  profil.trim().length === 0 ||
                  checkedlist.length === 0 ||
                  profilExist
                }
                className="btn btn-info rounded-0"
                onClick={() => addProfil()}
              >
                <small>Valider</small>
              </button>
              {loadAdd && (
                <div className="d-flex col-sm align-items-center justify-content-center">
                  <LoadingPoint />
                </div>
              )}
              {profilExist && (
                <div className="d-flex col-sm align-items-center justify-content-center text-danger">
                  <small>Ce profil existe dejà dans {nomApp}</small>
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
