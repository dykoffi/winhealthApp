import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./sidebar.css";

const SideHead = ({ user }) => {
  const { nomuser, posteuser, prenomsuser, labelprofil } = user;
  return (
    <div className="row p-4 text-dark border-bottom">
      <div className="col-12 text-center ">
        <i className={`mdi-social-person mdi-4x`}></i>
      </div>
      <div className="col-12 text-center">
        <small className="font-weight-bold">
          {nomuser + " " + prenomsuser}
        </small>
        <br />
        <small>{posteuser + "  -  " + labelprofil}</small>
      </div>
    </div>
  );
};
SideHead.prototype = {
  user: PropTypes.object.isRequired,
};

export const SideItem = ({ icon, text, actif, active }) => (
  <div
    className={`row Sideitem border-bottom px-2 py-1 ${
      actif ? "text-info" : "text-secondary"
    }`}
    onClick={() => active()}
  >
    <div className="col-12 ">
      <span className="d-flex align-items-center font-weight-normal">
        <i
          style={{ fontSize: "12px" }}
          className={`mdi-${icon} mr-3 mdi-2x`}
        ></i>{" "}
        {text}
      </span>
    </div>
  </div>
);
SideItem.prototype = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const ListItem = ({ children }) => (
  <div className="row">
    <div className="col-12">{children}</div>
  </div>
);

const Sidebar = ({ user, fonctions }) => {
  const [actif, setactif] = useState(0);
  return (
    <div className="row page white shadow-sm">
      <div className="col-12">
        <SideHead user={user} />
        {fonctions && (
          <ListItem>
            {fonctions.map(({ title, icon, path }, i) => (
              <NavLink key={i} exact to={path}>
                <SideItem
                  icon={icon}
                  text={title}
                  actif={actif === i}
                  active={() => setactif(i)}
                />
              </NavLink>
            ))}
          </ListItem>
        )}
      </div>
    </div>
  );
};
Sidebar.prototype = {
  user: PropTypes.object.isRequired,
  functions: PropTypes.array.isRequired,
};

export default Sidebar;
