import React, { useEffect } from "react";
import logo from "../../../static/images/logo.png";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("GAP Accueil");
  });
  return (
    <div className="Accueil d-flex justify-content-center align-items-center row p-3" style={{
      height:'90vh'
    }}>
      <img src={logo} className="col-3" style={{opacity:0.7}} alt="" />
    </div>
  );
};

export default Accueil;
