import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Verticalcard = ({
  title,
  details,
  icon,
  link,
  textColor = "white-text",
  bgColor,
}) => {
  return (
    <div className="row white ombre rounded Verticalcard mt-3 ml-1">
      <div
        className={`col-12 d-flex align-items-center justify-content-center ${textColor} ${bgColor} flex-column`}
      >
        {icon && (
          <>
            <i className={`mdi-${icon} mdi-2x`}></i>
          </>
        )}

        <p style={{ fontSize: "14px", fontWeight: "bold" }}>{title}</p>
      </div>
      <div className="col-12 pl-3 pb-3 d-flex align-items-stretch justify-content-center flex-column text-secondary">
        <div>
          <small>{details}</small>
        </div>
        {link && (
          <div className="text-light d-flex mt-3 text-right justify-content-end">
            <Link
              to={link}
              style={{ fontSize: "12px" }}
              className={` ${textColor}`}
            >
              Explorer <i className="mdi-navigation-arrow-forward ml-2"></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

Verticalcard.prototype = {
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default Verticalcard;
