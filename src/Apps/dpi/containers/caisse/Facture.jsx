import React from "react";

const Facture = ({ facture, encaisser, annuler }) => {
  return (
    <div className="row p-1">
      <div className="col-12 white rounded border p-2">
        <h6>FACTURE N°{facture.numerofacture}</h6>
        <hr />
        <div className="col-12 text-secondary">
          <small>
            {facture.datefacture} à {facture.heurefacture}
          </small>
          <br />
          <small>
            {facture.nompatient} {facture.prenomspatient}
          </small>
          <br />
          <small>né le 5 juin à koumassi</small>
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
              className="btn btn-sm btn-primary mx-1"
              onClick={() => encaisser(facture.idsejour)}
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
