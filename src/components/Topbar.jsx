import React from "react";
import { deconnexionUser } from "../Apps/connexion/functions";

const Topbar = ({ toggleheure, toggleFullscreen, title, fullscreen }) => {
  return (
    <div className="col-12 p-1 Topbar">
      <div className="row">
        <div className="col-3 p-2 title ">
          <h5 className="p-3">{title}</h5>
        </div>
        <div className="col-2 offset-6 icons p-2">
          <div className="row text-secondary">
            <div
              className="col-3 icon d-flex justify-content-center"
              onClick={() => toggleFullscreen()}
            >
              <i
                className={`mdi-navigation-${
                  fullscreen ? "fullscreen-exit" : "fullscreen"
                } mdi-2x`}
              ></i>
            </div>
            <div
              className="col-3 icon d-flex justify-content-center"
              onClick={() => toggleheure()}
            >
              <i className="mdi-image-timer mdi-2x"></i>
            </div>
            <div className="col-3 icon d-flex justify-content-center">
              <i className="mdi-social-notifications-on mdi-2x"></i>
            </div>
            <div
              className="col-3 icon d-flex justify-content-center"
              onClick={() => {
                deconnexionUser();
              }}
            >
              <i className="mdi-action-lock red-textb mdi-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
