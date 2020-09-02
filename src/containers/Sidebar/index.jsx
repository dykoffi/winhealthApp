import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./sidebar.css";
import { Tooltip } from "@material-ui/core";

const SideHead = ({ user }) => {
  const { nomuser, posteuser, prenomsuser, labelprofil } = user;
  return (
    <div className="row p-4 text-light Sidehead">
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
    title={text}
    className={`row Sideitem text-center d-flex justify-content-center ${
      actif ? "text-info active" : "text-light"
      }`}
    onClick={() => active()}
  >
    <i style={{ fontSize: "9px" }} className={`mdi-${icon} mdi-3x col-9`}></i>{" "}
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
    <div className="col-12 page Sidebar">
      <div className="row">
        <div className="col-12">
          {/* <SideHead user={user} /> */}
          {fonctions && (
            <>
              <ListItem>
                {fonctions.map(({ title, icon, path }, i) => (
                  <Tooltip title={title} key={i}>
                    <NavLink key={i} exact to={path}>
                      <SideItem
                        // text={title}
                        icon={icon}
                        actif={actif === i}
                        active={() => setactif(i)}
                      />
                    </NavLink>
                  </Tooltip>
                ))}
              </ListItem>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
Sidebar.prototype = {
  user: PropTypes.object.isRequired,
  functions: PropTypes.array.isRequired,
};

export default Sidebar;
