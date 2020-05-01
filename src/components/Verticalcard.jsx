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
    <Link to={link}>
      <div className="row Verticalcard mt-3" style={{ marginLeft: "0.05cm" }}>
        <div
          className={`col-12 d-flex align-items-center ${textColor} ${bgColor} flex-column`}
        >
          {icon && (
            <i
              style={{ fontSize: "13px" }}
              className={`mdi-${icon} mdi-3x ${textColor} ${bgColor} `}
            ></i>
          )}

          <small
            className={`${textColor} ${bgColor} px-2`}
            style={{ fontSize: "12px", zIndex: 10, fontWeight: "bold" }}
          >
            {title}
          </small>
        </div>
        <div className="col-12 pl-3 pb-2 text-center text-secondary">
          <div>
            <small
              style={{
                fontSize: "12px",
              }}
            >
              {details}
            </small>
          </div>
        </div>
      </div>
    </Link>
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
