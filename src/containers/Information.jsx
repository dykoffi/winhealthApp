import React from "react";
import Modal from "../components/Modal";

const Information = ({ titre, close, confirm, text }) => {
  return (
    <div className="row">
      <div className="Information col-12 d-flex justify-content-center align-items-start">
        <div className="col-3 text-left mt-2">
          <Modal titre={titre} confirm={confirm} close={close} text={text} />
        </div>
      </div>
    </div>
  );
};

export default Information;
