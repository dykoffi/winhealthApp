import React from "react";

const Notification = ({ title, cancel, valid, children }) => {
  return (
    <div className="row rounded shadow-lg white p-3 text-secondary">
      <div className="col-12">
        <h6>
          <i className="mdi-social-notifications mr-2"></i>
          {title}
        </h6>
      </div>
      <p>{children}</p>
      <div className="col-12 d-flex justify-content-center">
        {cancel && (
          <button
            onClick={() => cancel()}
            className="btn-sm btn btn-light mr-1"
          >
            Plus tard
          </button>
        )}
        {valid && (
          <button onClick={() => valid()} className="btn-sm btn btn-primary ">
            Consulter
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
