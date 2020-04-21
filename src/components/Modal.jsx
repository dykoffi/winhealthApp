import React from "react";

const Modal = ({ close, confirm, text, titre }) => {
  return (
    <div className="Modal row">
      <div
        className="col-12 p-3 white text-light text-dark"
        style={{ opacity: 0.95 }}
      >
        <h6>{titre}</h6>
        <small>{text}</small>
        <div className="row d-flex justify-content-end pr-3 pt-2">
          <button onClick={close} className="btn btn-secondary rounded-0">
            <small>Annuler</small>
          </button>
          <button onClick={confirm} className="btn btn-info rounded-0">
            <small>Continuer</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
