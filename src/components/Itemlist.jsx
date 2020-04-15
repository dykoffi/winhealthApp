import React from "react";

const Itemlist = ({ icon, title, details, click }) => {
  return (
    <div className="row white item border-bottom border-light" onClick={()=>click()}>
      <div className="col-2 d-flex align-items-center">
        <i className={`mdi-${icon} mdi-2x text-secondary`}></i>
      </div>
      <div className="col-8 d-flex flex-column justify-content-center p-2">
        <span className="text-secondary">{title}</span>
        <small className="grey-text">{details}</small>
      </div>
      <div className="col-2 d-flex align-items-center">
        <i className="mdi-navigation-chevron-right mdi-2x text-secondary"></i>
      </div>
    </div>
  );
};

export default Itemlist