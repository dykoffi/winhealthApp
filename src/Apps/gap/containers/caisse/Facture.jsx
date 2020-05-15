import React from "react";

const Facture = ({ facture, encaisser, annuler }) => {
  return (
    <div className="row p-1">
      <div className="col-12 white text-secondary rounded shadow-sm p-2">
        <div className="col-12 border-bottom">
          <small className="font-weight-bold">
            FACTURE N°{facture.numerofacture}
          </small>
        </div>
        <div className="col-12">
          <small>
            {facture.nompatient} {facture.prenomspatient}
          </small>
          <br />
          <small>{facture.datefacture}</small>
          <br />
          <small>{facture.heurefacture}</small>
        </div>
        <div className="text-right my-2">
          <b>{facture.prixacte} FCFA</b>
        </div>
        <div className="row">
          <div className="col-12 py-2 d-flex justify-content-end">
            <button
              className="btn btn-sm btn-outline-secondary mx-1"
              onClick={() => annuler(facture.idsejour)}
            >
              Annuler
            </button>
            <button
              className="btn btn-sm btn-success mx-1"
              onClick={() => encaisser(facture.idsejour, facture.iddossier)}
            >
              Encaisser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facture;
