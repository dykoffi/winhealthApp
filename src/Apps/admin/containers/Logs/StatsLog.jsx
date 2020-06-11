import React, { useEffect, useState } from "react";
import Statcard from "../../../../components/Statcard";
import { header } from "../../../global/apiQuery";
import Axios from "axios";
import { connect } from "react-redux";

const StatsLog = ({ currentApp, typeLogs }) => {
  const [nbLogs, setnbLogs] = useState(0);
  const [nbUsers, setnbUsers] = useState(0);
  useEffect(() => {
    Axios({
      url: "/admin/listall/logs",
      baseURL: header.url,
      method: "GET",
    })
      .then((response) => response.data.rows)
      .then((data) => {
        setnbLogs(data.length);
      });

    Axios({
      url: "/admin/list/logs/users",
      baseURL: header.url,
      method: "GET",
    })
      .then((response) => response.data.rows)
      .then((data) => {
        setnbUsers(data.length);
      });
  }, [typeLogs]);
  return (
    <div className="row">
      <div className="col-12">
        <Statcard
          nombre={nbLogs}
          theme="bg-info rounded text-white"
          titre="Log(s)"
          details="Tous les logs générés par les utilisateurs du système dans tous les modules."
        />
      </div>
      <div className="col-12">
        <Statcard
          nombre={nbUsers}
          theme="white ombre rounded"
          titre="User(s)"
          details="Le nombre d'utilisateur ayant générés des logs jusqu'à aujoud'hui."
        />
      </div>
    </div>
  );
};

const mapPropToState = (state) => {
  const {
    appReducer: { currentApp },
  } = state;
  const {
    listLogsReducer: { typeLogs },
  } = state;
  return { currentApp, typeLogs };
};

const StatsLogConnected = connect(mapPropToState)(StatsLog);
export default StatsLogConnected;
