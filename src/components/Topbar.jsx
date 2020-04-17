import React from "react";
import { deconnexionUser } from "../Apps/connexion/functions";

const Topbar = ({ toggleheure, toggleFullscreen, title, fullscreen }) => {
  return (
    <div className="col-12 p-1 Topbar">
      <div className="row">
        <div className="col-3 p-2 title ">
          <span className="p-3">{title}</span>
        </div>
        <div className="col-2 offset-6 icons p-2">
          <div className="row text-secondary">
            <div
              className="col-3 icon d-flex justify-content-center"
              onClick={() => toggleFullscreen()}
            >
              <i
                title={!fullscreen ? "Plein écran" : "Ecran reduit"}
                className={`mdi-navigation-${
                  fullscreen ? "fullscreen-exit" : "fullscreen"
                }`}
              ></i>
            </div>
            <div
              title="l'Heure"
              className="col-3 icon d-flex justify-content-center"
              onClick={() => toggleheure()}
            >
              <i className="mdi-image-timer"></i>
            </div>
            <div
              className="col-3 icon d-flex justify-content-center"
              title="Notifications"
            >
              <i className="mdi-social-notifications-on"></i>
            </div>
            <div
              title="Déconnexion"
              className="col-3 icon d-flex justify-content-center"
              onClick={() => {
                deconnexionUser();
              }}
            >
              <i className="mdi-action-lock red-textb"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
