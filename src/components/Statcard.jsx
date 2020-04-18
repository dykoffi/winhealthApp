import React from "react";

const Statcard = ({ nombre, titre, details, theme }) => {
  return (
    <div className="row p-2">
      <div className={`col-4 p-2 text-center align-items-center d-flex justify-content-center flex-column ${theme}`}>
        <small className="lead">{nombre}</small>
        <small className="">{titre}</small>
      </div>
      <div className="col-8 p-2">
        <small>{details}</small>
      </div>
    </div>
  );
};
export default Statcard;
