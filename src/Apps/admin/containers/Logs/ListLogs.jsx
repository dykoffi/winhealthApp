import React from "react";
import Aucun from "../../../../components/Aucun";

const ListLogs = () => {
  return (
    <div className="row white Verticalist ">
      <div className="col-12 border-bottom">
        <div className="row">
          <input
            onChange={(ev) => {}}
            type="text"
            placeholder="rechercher un profil"
            className="col-12 p-2 white bordertrans"
          />
        </div>
      </div>
      <div className="col-12">
        <div className="row chooseApp text-center">
          <div className={`col-sm m-1  "active"`} onClick={() => {}}>
            <small>Connexion (45)</small>
          </div>
          <div className={`col-sm m-1  "active"`} onClick={() => {}}>
            <small>Creation (11)</small>
          </div>
          <div className={`col-sm m-1  "active"`} onClick={() => {}}>
            <small>Modification (5)</small>
          </div>
          <div className={`col-sm m-1  "active"`} onClick={() => {}}>
            <small>Suppression (8)</small>
          </div>
        </div>
        <div className="col-12 text-center">
          <Aucun text={`Aucun log`} />
        </div>
        <div
          style={{
            overflowY: "scroll",
            height: "60vh",
            scrollbarWidth: "none",
          }}
          className="col-12"
        >
          <div className="row p-2 bg-light mt-1">
            <small className="col-4">Samedi 03 janvier 2020</small>
            <small className="col-4">koffiedy@gmail.com</small>
            <small className="col-4">Creatoin de facture</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListLogs;
