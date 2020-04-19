import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { header } from "../../constants/apiQuery";

import Statcard from "../../../../components/Statcard";

const StatsProfil = ({ listApps, listProfil }) => {
  const [nbProfil, setnbProfil] = useState(0);
  useEffect(() => {
    Axios({
      url: "/admin/list/profils",
      baseURL: header.url,
      method: "GET",
    })
      .then((response) => response.data.rows)
      .then((data) => {
        setnbProfil(data.length);
      });
  }, [listProfil.length]);
  return (
    <div className="row">
      <div className="col-12">
        <Statcard
          nombre={nbProfil}
          theme="bg-info text-white rounded"
          titre="Profil(s)"
          details="L'ensemble de tous les profils de connexion créés dans tous les modules."
        />
      </div>
      <div className="col-12">
        <Statcard
          nombre={listApps.length}
          theme="white warning-text ombre rounded"
          titre="App(s)"
          details="Les appliations sont des modules complètement indépendants les uns des autres : GAP, DPI, PUI."
        />
      </div>
    </div>
  );
};
const mapPropToState = (state) => {
  const {
    listReducer: { listProfil },
  } = state;
  const {
    appReducer: { listApps },
  } = state;
  return { listProfil, listApps };
};
const StatsProfilConnected = connect(mapPropToState)(StatsProfil);
export default StatsProfilConnected;
