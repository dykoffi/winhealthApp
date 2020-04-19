import React from "react";

const ListApp = () => {
  return (
    <div className="row">
      <div className="col-12 d-flex blue rounded p-3">
        <small className="font-weight-bold  white-text">GAP</small>
      </div>
      <div className="col-12 d-flex p-3">
        <small className="font-weight-bold green-text">PHARMA</small>
      </div>
      <div className="col-12 d-flex p-3">
        <small className="font-weight-bold orange-text">DPI</small>
      </div>
      <div className="col-12 d-flex p-3">
        <small className="font-weight-bold red-text">ADMIN</small>
      </div>
    </div>
  );
};


export default ListApp