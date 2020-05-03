import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {
  TextFieldAutoComplete,
  TextField,
  Select,
} from "../../../../components/InputCustom";

const AddPatient = () => {
  return (
    <div className="row p-3">
      <h6 className="font-weight-bold font-italic text-secondary">
        Information personnelles du patient
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField className="col-2 ml-1" label="Nom" />
          <TextField className="col-3 ml-1" label="Prenoms" />
          <TextField className="col-3 ml-1" label="Nom de jeune fille" />
        </div>
        <div className="row py-2">
          <Select
            className="col-2 ml-1"
            label="Sexe"
            options={[
              { value: "oui", label: "Oui" },
              { value: "non", label: "Non" },
            ]}
          />
          <TextField
            className="col-3 ml-1"
            label="Date de naissance"
            type="date"
          />
          <TextField className="col-3 ml-1" label="Lieu de naissance" />
        </div>
        <div className="row py-2">
          <TextField className="col-2 ml-1" label="Nationalité" />
          <Select
            className="col-3 ml-1"
            label="Réligion"
            options={[
              { value: "chretien", label: "Chretien" },
              { value: "musulman", label: "Musulman" },
              { value: "boudiste", label: "Boudiste" },
              { value: "animiste", label: "Animiste" },
              { value: "autre", label: "Autre réligion" },
              { value: "sans", label: "Sans réligion" },
            ]}
          />
          <Select
            className="col-3 ml-1"
            label="Profession"
            options={[
              { value: "activité", label: "En activité" },
              { value: "chomage", label: "Au chomage" },
              { value: "retraite", label: "Retraité" },
            ]}
          />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Informations relatives aux parents
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField className="col-2 ml-1" label="Nom du père" />
          <TextField className="col-3 ml-1" label="Prenoms du père" />
          <TextField className="col-3 ml-1" label="Contact du père" />
        </div>
        <div className="row py-2">
          <TextField className="col-2 ml-1" label="Nom du mère" />
          <TextField className="col-3 ml-1" label="Prenoms du mère" />
          <TextField className="col-3 ml-1" label="Contact du mère" />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Informations relatives au tuteur
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField className="col-2 ml-1" label="Nom du tuteur" />
          <TextField className="col-3 ml-1" label="Prenoms du tuteur" />
          <TextField className="col-3 ml-1" label="Contact du tuteur" />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Personne à contacter en cas de besoin
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField className="col-2 ml-1" label="Nom" />
          <TextField className="col-3 ml-1" label="Prenoms" />
          <TextField className="col-3 ml-1" label="Contact" />
          <TextField className="col-3 ml-1" label="Mail" />
        </div>
      </div>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <Select
            className="col-2 ml-1"
            label="Assuré(e) ?"
            options={[
              { value: "oui", label: "Oui" },
              { value: "non", label: "Non" },
            ]}
          />
          <Select
            className="col-3 ml-1"
            label="Nom de l'assurance"
            options={[
              { value: "nsia", label: "NSIA" },
              { value: "sgbci", label: "SBGCI" },
              { value: "alianz", label: "Alianz" },
            ]}
          />
        </div>
      </div>
      <div className="">
        <Button variant="contained" className="bg-info text-white">
          Envoyer le formulaire
        </Button>
      </div>
    </div>
  );
};

export default AddPatient;
