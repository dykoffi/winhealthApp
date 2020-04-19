import React, { useEffect } from "react";
import Statcard from "../../../../components/Statcard";

const StatsLog = () => {
  useEffect(()=>{
    
  })
  return (
    <div className="row">
      <div className="col-12">
        <Statcard
          nombre={5}
          theme="bg-info rounded text-white"
          titre="Log(s)"
          details="Tous les logs générés par les utilisateurs du système dans tous les modules."
        />
      </div>
      <div className="col-12">
        <Statcard
          nombre={7}
          theme="white ombre rounded"
          titre="User(s)"
          details="Le nombre d'utilisateur ayant générés des logs jusqu'à aujoud'hui."
        />
      </div>
    </div>
  );
};

export default StatsLog;
