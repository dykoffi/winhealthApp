import React from "react";
import PropTypes from "prop-types";

const Statcard = ({ nombre, titre, details, theme }) => {
  return (
    <div className="row p-2">
      <div
        className={`col-4 p-2 text-center align-items-center d-flex justify-content-center flex-column ${theme}`}
      >
        <small className="lead">{nombre}</small>
        <small className="">{titre}</small>
      </div>
      <div className="col-8 p-2">
        <small>{details}</small>
      </div>
    </div>
  );
};

Statcard.prototype = {
  nombre: PropTypes.arrayOf[(PropTypes.string, PropTypes.number)],
  titre: PropTypes.string,
  details: PropTypes.string,
  theme: PropTypes.string,
};
export default Statcard;
