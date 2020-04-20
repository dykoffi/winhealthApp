import React, { useEffect } from "react";
import Verticalcard from "../../../components/Verticalcard";

const Accueil = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Accueil");
  });
  return (
    <div className="Accueil row p-3">
      <div className="col-12">
        <div className="row">
          <div className="col-3 d-flex">
            <Verticalcard
              title="Utilisateurs"
              details="Creez, modifier, supprimer et attribuez des droits aux utilisateurs"
              icon="social-group"
              bgColor="white"
              textColor="blue-text"
              link="/admin/users"

            />
          </div>
          <div className="col-3 d-flex">
            <Verticalcard
              title="Profil"
              details="Creez, modifier et supprimer des profils avec des droits intégrés"
              icon="action-verified-user"
              bgColor="white"
              textColor="green-text"
              link="/admin/profils"
            />
          </div>
          <div className="col-3 d-flex">
            <Verticalcard
              title="Services"
              details="Creez et deployer des services à la volée et sans recharchement"
              icon="action-wallet-travel"
              bgColor="white"
              textColor="purple-text"
              link="/admin/services"
            />
          </div>
          <div className="col-3 d-flex">
            <Verticalcard
              title="Logs"
              details="Consulter les fichiers journaux générés par tous les utilisateurs du système"
              icon="action-description"
              bgColor="white"
              textColor="orange-text"
              link="/admin/logs"
            />
          </div>
         <div className="col-3 d-flex">
            <Verticalcard
              title="Com"
              details="Partagez des informations avec tous les utilisateurs actifs du sytème (fonctionalité indisponible)"
              icon="hardware-headset-mic"
              bgColor="white"
              textColor="red-text"
            />
          </div>
          <div className="col-3 d-flex">
            <Verticalcard
              title="Settings"
              details="Réglez et paramétrez tous les modules du système à votre guise (fonctionalité indisponible)"
              icon="action-settings"
              bgColor="white"
              textColor="grey-text darken-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
