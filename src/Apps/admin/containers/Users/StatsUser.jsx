import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { header } from "../../../global/apiQuery";

import Statcard from "../../../../components/Statcard";

const StatsUser = ({ listApps, listUser }) => {
  const [nbUser, setnbUser] = useState(0);
  useEffect(() => {
    Axios({
      url: "/admin/list/users",
      baseURL: header.url,
      method: "GET",
    })
      .then((response) => response.data.rows)
      .then((data) => {
        setnbUser(data.length);
      });
  }, [listUser.length]);
  return (
    <div className="row">
      <div className="col-12">
        <Statcard
          nombre={nbUser}
          theme="bg-info text-white rounded"
          titre="User(s)"
          details="L'ensemble de tous les utilisateur enregitrés dans le système"
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
    listReducer: { listUser },
  } = state;
  const {
    appReducer: { listApps },
  } = state;
  return { listUser, listApps };
};
const StatsUserConnected = connect(mapPropToState)(StatsUser);
export default StatsUserConnected;
