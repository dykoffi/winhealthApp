import React, { useEffect } from "react";
import logo from "../../../static/images/winhealth.png";
import entryoffice from "../../../static/images/entryoffice.png";
const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("GAP Accueil");
  });
  return (
    <div
      className="Accueil d-flex justify-content-center align-items-center flex-column row p-3"
      style={{ height: "90vh", }}>
      {/* <img src={entryoffice} className="col-3" style={{ opacity: 0.9 }} alt="" /> */}
      <img src={logo} className="col-3" style={{ opacity: 0.9 }} alt="" />
      <h6 className="small bg-light p-1">Bienvenue sur la GAP de Winhealth</h6>
    </div>
  );
};

export default Accueil;
