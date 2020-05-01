import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Horizontalcard = ({
  title,
  details,
  icon,
  link,
  textColor = "white-text",
  bgColor,
}) => {
  return (
    <div className="row white ombre rounded Horizontalcard mt-3 ml-1">
      <div
        className={`col-3 d-flex align-items-center justify-content-center ${textColor} ${bgColor} flex-column`}
      >
        {icon && (
          <>
            <i className={`mdi-${icon} mdi-2x`}></i>
            <br />
          </>
        )}
        {link ? (
          <Link to={link} style={{ fontSize: "11px" }}>
            <p
              className={`${textColor} ${bgColor}`}
              style={{ fontWeight: "bold" }}
            >
              {title}
            </p>
          </Link>
        ) : (
          <p
            className={`${textColor} ${bgColor}`}
            style={{ fontSize: "11px", fontWeight: "bold" }}
          >
            {title}
          </p>
        )}
      </div>
      <div className="col p-4 d-flex align-items-stretch justify-content-around flex-column text-secondary">
        <div>
          <small style={{ fontSize: "10px" }}>{details}</small>
        </div>
      </div>
    </div>
  );
};

Horizontalcard.prototype = {
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default Horizontalcard;
