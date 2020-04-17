import React, { useEffect } from "react";
import Horizontalcard from "../../../components/Horizontalcard";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Accueil");
  });
  return (
    <div className="Accueil row p-5">
      <div className="col-12">
        <div className="row">
          <div className="col-4 d-flex p-4">
            <Horizontalcard
              title="Utilisateurs"
              details="Creez, modifier, supprimer et attribuez des droits aux utilisateurs"
              icon="social-group"
              bgColor="blue"
              link="/admin/users"
            />
          </div>
          <div className="col-4 d-flex p-4">
            <Horizontalcard
              title="Profil"
              details="Creez, modifier et supprimer des profils avec des droits intégrés"
              icon="action-verified-user"
              bgColor="bg-success"
              link="/admin/profils"
            />
          </div>
          <div className="col-4 d-flex p-4">
            <Horizontalcard
              title="Services"
              details="Creez et deployer des services à la volée et sans recharchement"
              icon="action-wallet-travel"
              bgColor="purple"
              link="/admin/services"
            />
          </div>
          <div className="col-4 d-flex p-4">
            <Horizontalcard
              title="Logs"
              details="Consulter les fichiers journaux générés par tous les utilisateurs du système"
              icon="action-description"
              bgColor="orange"
              link="/admin/logs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
