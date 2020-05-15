import React, { useEffect } from "react";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("GAP Accueil");
  });
  return (
    <div className="Accueil row p-3">
      <div className="col-12 text-center text-secondary">
        <h2>Bienvenue sur Win GAP</h2>
        <p>
          votre interface qui vous permettra de gérer toutes les données
          administratives liées au patient
        </p>
      </div>
    </div>
  );
};

export default Accueil;
