import React, { useEffect } from "react";
import logo from "../../../static/images/logo3.png";
import { header } from "../../global/apiQuery";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("GAP Accueil");
    // const audio = new Audio(`${header.url}/son.mp3`);
    // audio.play();
  });
  return (
    <div
      className="Accueil d-flex justify-content-center align-items-center flex-column row p-3"
      style={{
        height: "90vh",
      }}
    >
      <img src={logo} className="col-3" style={{ opacity: 0.9 }} alt="" />
      <h6 className="small bg-light p-1">Bienvenu sur le GAP de Winhealth</h6>
    </div>
  );
};

export default Accueil;
