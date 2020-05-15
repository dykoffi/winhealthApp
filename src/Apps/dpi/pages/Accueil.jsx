import React, { useEffect } from "react";
const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("DPI Accueil");
  });
  return (
    <div className="Accueil row p-3">
      <div className="col-12 text-center text-secondary">
        <h2>Bienvenue sur Win DPI</h2>
        <p>
          votre interface DPI qui vous permettra de controler toutes les
          données médicales liées au patient
        </p>
      </div>
    </div>
  );
};
export default Accueil;
