import React, { useEffect } from "react";
import LoadingPoint from "../../../components/LoadingPoint";
import Horizontalcard from "../../../components/Horizontalcard";

const Logs = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Logs");
  });
  return (
    <div className="Logs row p-3">
      <section className="col-3">
        <div className="col-12 d-flex">
          <Horizontalcard
            title="GAP"
            details="Gestion Administrative du Patient"
            icon="action-description"
            bgColor="white"
            textColor="blue-text"
          />
        </div>
        <div className="col-12">
          <Horizontalcard
            title="DPI"
            details="Dossier Patient Informatisé"
            icon="action-description"
            bgColor="white"
            textColor="orange-text"
          />
        </div>
        <div className="col-12">
          <Horizontalcard
            title="PUI"
            details="Pharmacie à Usage Interne"
            icon="action-description"
            bgColor="white"
            textColor="green-text"
          />
        </div>
        <div className="col-12">
          <Horizontalcard
            title="ADMIN"
            details="Administrateur du système"
            icon="action-description"
            bgColor="white"
            textColor="grey-text darken-2"
          />
        </div>
      </section>
    </div>
  );
};

export default Logs;
