import React from "react";
import PropTypes from "prop-types";
import './onglet.css'

const Onglet = ({ links, currentPage, setCurrentPage }) => {
  return (
    <div className="row onglets">
      {links.map(({ title, icon, target }, i) => (
        <div
          key={i}
          onClick={() => {
            setCurrentPage(target);
          }}
          style={{
            cursor: "pointer",
          }}
          className={`px-3 text-center onglet py-2 ${
            currentPage === target ? "grey lighten-5 text-secondary actifOnglet" : "text-secondary"
          } `}
        >
          <i className={`mdi-${icon} mr-2`}></i>
          {title}
        </div>
      ))}
    </div>
  );
};
Onglet.prototype = {
  user: PropTypes.object.isRequired,
  functions: PropTypes.array.isRequired,
};

export default Onglet;
