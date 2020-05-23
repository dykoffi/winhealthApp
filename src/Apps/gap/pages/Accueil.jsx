import React, { useEffect } from "react";
import logo from "../../../static/images/logo.png";
import { header } from "../../global/apiQuery";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("GAP Accueil");
    const audio = new Audio(`${header.url}/son.mp3`);
    audio.play();
  });
  return (
    <div
      className="Accueil d-flex justify-content-center align-items-center row p-3"
      style={{
        height: "90vh",
      }}
    >
      <img src={logo} className="col-3" style={{ opacity: 0.9 }} alt="" />
    </div>
  );
};

export default Accueil;
