import React from "react";

const AddPatient = () => {
  return (
    <div className="row p-3">
      <h6 className="font-weight-bold font-italic text-secondary">
        Information personnelles du patient
      </h6>
      <div className="col-12 p-3 grey-text text-darken-1">
        <div className="row py-1">
          <div className="col-3">
            <span className="">Nom</span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
            placeholder=""
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>
              Prenoms <b className="red-text">*</b>
            </span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
            placeholder=""
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>
              Nom de jeune fille <b className="red-text">*</b>
            </span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
          />
        </div>

        <div className="row py-1">
          <div className="col-3">
            <span>Sexe *</span>
          </div>
          <select
            value={['Masculin','Feminin']}
            className="px-2 custom-select text-secondary py-1 col-3 rounded bordertrans shadow-sm"
            placeholder=""
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>Date de naissance</span>
          </div>
          <input
            type="date"
            className="px-2 text-secondary py-1 col-3 rounded bordertrans shadow-sm"
            placeholder=""
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>
              Lieu de naissance <b className="red-text">*</b>
            </span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>
              Nationalité <b className="red-text">*</b>
            </span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>
              Profession <b className="red-text">*</b>
            </span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
          />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Personne à contacter en cas de besoin
      </h6>
      <div className="col-12 p-3 grey-text text-darken-1">
        <div className="row py-1">
          <div className="col-3">
            <span>Nom</span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
            placeholder=""
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>
              Prenoms <b className="red-text">*</b>
            </span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
            placeholder=""
          />
        </div>
        <div className="row py-1">
          <div className="col-3">
            <span>
              Nom de jeune fille <b className="red-text">*</b>
            </span>
          </div>
          <input
            type="text"
            className="px-2 text-secondary py-1 col-3 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
