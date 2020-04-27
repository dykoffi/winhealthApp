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
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck"
            name="example1"
          />
          <label className="custom-control-label" for="customCheck">
            Check this custom checkbox
          </label>
        </div>
        <Itemlist
          icon="social-person"
          title={"KOFFI Kouassi Edy"}
          details={"ne le 30 juin 2001 à paris"}
          key={4}
          click={() => {}}
        />
      </div>
    </div>
  );
};

export default ListPatient;
