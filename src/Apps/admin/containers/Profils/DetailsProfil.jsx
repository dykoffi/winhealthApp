import React from "react";
import { connect } from "react-redux";

const DetailsProfil = ({ currentProfil }) => {
  return (
    <div className="row DetailsProfil">
      {currentProfil ? (
        <>
          <div className="p-2 col-12">
            <div className="col-12 text-center">
              <i className="mdi-action-verified-user mdi-5x text-success"></i>
            </div>
            <div className="col-12 text-center">
              <h6>{currentProfil[0].labelprofil}</h6>
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
            <i className="mdi-editor-format-align-left mdi-5x col-12 text-center"></i>
            <span className="text-center col-12">Aucun profil selectionné</span>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProp = (state) => {
  const {
    detailsReducer: { currentProfil },
  } = state;
  return { currentProfil };
};

const DetailsProfilConnected = connect(mapStateToProp)(DetailsProfil);
export default DetailsProfilConnected;
