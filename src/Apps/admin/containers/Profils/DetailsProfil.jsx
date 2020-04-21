import React from "react";
import { connect } from "react-redux";
import LoadingPoint from "../../../../components/LoadingPoint";
import Information from "../../../../containers/Information";
import { thunkDeleteProfil, setModal } from "../../api/Profils/details";

const DetailsProfil = ({
  currentProfil,
  loadingProfil,
  modal,
  setModal,
  thunkDeleteProfil,
}) => {

  return (
    <div className="row DetailsProfil">
      {currentProfil ? (
        <>
          <div className="p-2 col-12">
            <div className="col-12 text-center">
              <i className="mdi-action-verified-user mdi-3x text-info"></i>
            </div>
            <div className="col-12 text-center">
              <small className="font-weight-bold">
                {currentProfil[0].labelprofil}
              </small>{" "}
              <br />
              <small>{`crée  par ${currentProfil[0].auteurprofil} le ${currentProfil[0].dateprofil}`}</small>
            </div>
          </div>
          <div
            className="col-12"
            style={{
              height: "46vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <div className="row p-4">
              <table className="table table-sm table-borderless table-striped col-12">
                <thead className="">
                  <tr className="row">
                    <th className="col-1">
                      <small>N°</small>
                    </th>
                    <th className="col-2">
                      <small>code</small>
                    </th>
                    <th className="col-9">
                      <small>droit</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProfil.map(({ labeldroit, codedroit }, i) => (
                    <tr className="row" key={i}>
                      <td className="col-1">
                        <small>{i}</small>
                      </td>
                      <td className="col-2">
                        <small>{codedroit}</small>
                      </td>
                      <td className="col-9">
                        <small>{labeldroit}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center grey-text lighten-3 col-12">
          <div className="row">
            <i className="mdi-editor-format-align-left mdi-3x col-12 text-center"></i>
            <small className="text-center col-12">
              Aucun profil selectionné
            </small>
          </div>
        </div>
      )}
      {loadingProfil && (
        <div className="d-flex align-items-center justify-content-center col-12">
          <LoadingPoint />
        </div>
      )}
      {currentProfil && !loadingProfil && (
        <div className="d-flex align-items-center justify-content-center col-12 text-info">
          <small
            onClick={() => setModal(true)}
            style={{ cursor: "pointer" }}
          >
            Supprimer ce profil
          </small>
        </div>
      )}
      {modal && (
        <Information
          text={`la suppression de ce profil est dangereuse. Si des utilisateurs sont enregistrés avec ce profil, ils ne pourront plus se connecter apres cette suppression. Voulez vous continuer ?`}
          close={() => setModal(false)}
          titre="Information"
          confirm={() => thunkDeleteProfil(currentProfil[0].idprofil)}
        />
      )}
    </div>
  );
};

const mapStateToProp = (state) => {
  const {
    detailsReducer: { currentProfil, loadingProfil, modal },
  } = state;
  return { currentProfil, loadingProfil, modal };
};

const DetailsProfilConnected = connect(mapStateToProp, { thunkDeleteProfil, setModal })(
  DetailsProfil
);
export default DetailsProfilConnected;
