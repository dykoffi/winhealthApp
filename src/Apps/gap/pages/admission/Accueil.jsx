import React, { useEffect } from "react";
import Verticalcard from "../../../../components/Verticalcard";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Admission Accueil");
  });
  return (
    <div className="Accueil row p-3">
      <div className="col-12">
        <div className="row">
          <div className="col-3 d-flex">
            <Verticalcard
              title="Patients"
              details="Creer, modifier, supprimer des patients"
              icon="social-person-add"
              bgColor="white"
              textColor="blue-text"
              link="/gap/admission/patients"
            />
          </div>
          <div className="col-3 d-flex">
            <Verticalcard
              title="Dossiers Patients"
              details="Creer, modifier et supprimer des profils avec des droits intégrés"
              icon="file-folder-shared"
              bgColor="white"
              textColor="green-text"
              link="/gap/admission/dossiers"
            />
          </div>
          <div className="col-3 d-flex">
            <Verticalcard
              title="Statistiques"
              details="Consulter les statistiques générées par toutes les fontions de l'admission"
              icon="editor-insert-chart"
              bgColor="white"
              textColor="orange-text"
              link="/gap/admission/stats"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
