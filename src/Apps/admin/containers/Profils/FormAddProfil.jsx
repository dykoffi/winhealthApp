import React, { useState } from "react";
import { Check } from "../../../../components/Listcheck";
import { useEffect } from "react";
import Axios from "axios";
import Loading from "../../../../components/Loading";
import moment from "moment";

import { disableModal } from "../../api/Profils/modal";
import { thunkUpdateListProfil } from "../../api/Profils/list";
import { connect } from "react-redux";

const FormAddProfil = ({ disableModal, thunkUpdateListProfil, appActive }) => {
  moment.locale("fr");
  const [profil, setprofil] = useState("");
  const [list, setlist] = useState([]);
  const [checkedlist, setchecked] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/admin/list/${appActive}/droits`)
      .then((res) => res.data.rows)
      .then((data) => {
        setlist(data);
      });
  }, [appActive]);

  function toogleCheck(code) {
    checkedlist.includes(code)
      ? setchecked([...checkedlist.filter((x) => x !== code)])
      : setchecked([...checkedlist, code]);
  }

  function change({ target: { value } }) {
    setprofil(value);
  }

  return (
    <div className="row">
      <div className="FormAddProfil col-12 d-flex justify-content-center align-items-center">
        <div className="col-4 white p-3">
          <h5 className="lead text-center">Ajouter un nouveau profil</h5>
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
                {list.length !== 0 ? (
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
                ) : (
                  <Loading text="Chargement des droits" />
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
                  profil.trim().length === 0 || checkedlist.length === 0
                }
                className="btn btn-primary rounded-0"
                onClick={() => thunkUpdateListProfil(appActive, profil, checkedlist)}
              >
                Valider la saisie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapPropToState = (state) => {
  const {
    appReducer: { appActive },
  } = state;
  return { appActive };
};
const FormAddProfilConnected = connect(mapPropToState, {
  disableModal,
  thunkUpdateListProfil,
})(FormAddProfil);
export default FormAddProfilConnected;
