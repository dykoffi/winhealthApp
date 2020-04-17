import React, { useEffect } from "react";
import Horizontalcard from "../../../components/Horizontalcard";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Accueil");
  });
  return (
    <div className="Accueil row p-3">
      <div className="col-12">
        <div className="row">
          <div className="col-3 d-flex">
            <Horizontalcard
              title="Utilisateurs"
              details="Creez, modifier, supprimer et attribuez des droits aux utilisateurs"
              icon="social-group"
              bgColor="white"
              textColor="blue-text"
              link="/admin/users"

            />
          </div>
          <div className="col-3 d-flex">
            <Horizontalcard
              title="Profil"
              details="Creez, modifier et supprimer des profils avec des droits intégrés"
              icon="action-verified-user"
              bgColor="white"
              textColor="green-text"
              link="/admin/profils"
            />
          </div>
          <div className="col-3 d-flex">
            <Horizontalcard
              title="Services"
              details="Creez et deployer des services à la volée et sans recharchement"
              icon="action-wallet-travel"
              bgColor="white"
              textColor="purple-text"
              link="/admin/services"
            />
          </div>
          <div className="col-3 d-flex">
            <Horizontalcard
              title="Logs"
              details="Consulter les fichiers journaux générés par tous les utilisateurs du système"
              icon="action-description"
              bgColor="white"
              textColor="orange-text"
              link="/admin/logs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
