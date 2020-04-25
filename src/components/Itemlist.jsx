import React from "react";
import PropTYpes from "prop-types";

const Itemlist = ({ icon, title, details, click }) => {
  return (
    <div
      className="row white item border-bottom border-light"
      onClick={() => click()}
    >
      <div className="col-2 d-flex align-items-center">
        <i
          className={`mdi-${icon} mdi-2x text-secondary`}
          style={{ opacity: 0.5 }}
        ></i>
      </div>
      <div className="col-8 d-flex flex-column justify-content-center p-2">
        <small className="text-secondary">{title}</small>
        <small className="grey-text">{details}</small>
      </div>
      <div className="col-2 d-flex align-items-center">
        <i className="mdi-navigation-chevron-right text-secondary"></i>
      </div>
    </div>
  );
};

Itemlist.prototype = {
  icon: PropTYpes.string,
  title: PropTYpes.string.isRequired,
  details: PropTYpes.string,
  click: PropTYpes.func.isRequired,
};

export default Itemlist;
