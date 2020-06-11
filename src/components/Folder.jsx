import React from "react";
import "../static/css/components/Folder.css";

const Folder = ({ title, children }) => {
  return (
    <div className="row Folder">
      <div className="col-12 px-3 mt-1">
        <div className="row border white">
          <div className="col-12 text-right">
            <small className="text-secondary">
              <b>{title}</b>
            </small>
          </div>
          <div className="col-4">
            <i className="mdi-file-folder mdi-3x amber-text text-darken-1"></i>
          </div>
          <div className="col-8 text-right">
            <p className="lead" style={{ fontSize: "10px" }}>
              {children}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
