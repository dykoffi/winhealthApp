import React from "react";
import Itemlist from "../../../../components/Itemlist";

const ListPatient = () => {
  return (
    <div className="Verticalist row white">
      <input
        type="text"
        className="col-12 p-2"
        placeholder="Rechercher un patient"
      />

      <div
        className="col-12 items ombre"
        style={{
          height: "60vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <Itemlist
          icon="social-person"
          title={"KOFFI Kouassi Edy"}
          details={"ne le 30 juin 2001 à paris"}
          key={4}
          click={() => {}}
        />
      </div>
      <div className="col-12">
        <button className="btn white text-info rounded-0 col-12">
          <small>Ajouter un nouveau dossier</small>
        </button>
      </div>
    </div>
  );
};

export default ListPatient;
