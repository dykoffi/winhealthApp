import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import LoadingPoint from "../../../../components/LoadingPoint";
import Text from "../../../../components/Text";
import logsType from "../../constants/typeLogs";

import { setTypeLogs, thunkSetListList } from "../../api/Logs/listLogs";
import Axios from "axios";
import { header } from "../../constants/apiQuery";

const ListLogs = ({
  setTypeLogs,
  typeLogs,
  thunkSetListList,
  loading,
  listLogs,
  currentApp,
}) => {
  const [allLogs, setallLogs] = useState([]);
  useEffect(() => {
    Axios({
      url: `/admin/list/${currentApp}/logs`,
      baseURL: header.url,
      method: "GET",
    })
      .then((response) => response.data.rows)
      .then((data) => {
        setallLogs(data);
      });
  }, [currentApp]);
  useEffect(() => {
    thunkSetListList(currentApp, typeLogs);
  }, [thunkSetListList, currentApp, typeLogs]);

  return (
    <div className="row white Verticalist">
      <div className="col-12 ombre border-top">
        <div className="row chooseApp text-center">
          {logsType.map(({ type, nom }, i) => (
            <div
              key={i}
              className={`col-sm m-1 ${typeLogs === type && "active"}`}
              onClick={() => {
                setTypeLogs(type);
              }}
            >
              <small>
                {nom} ({allLogs.filter((x) => x.typelog === type).length})
              </small>
            </div>
          ))}
        </div>
        <div className="col-12 text-center">
          {loading ? (
            <LoadingPoint />
          ) : listLogs.length === 0 ? (
            <Text text={`Aucun log`} />
          ) : (
            <Text text={`${listLogs.length} log(s)`} />
          )}
        </div>
        <div className="row p-2 bg-light">
          <small className="col-2">date</small>
          <small className="col-2">heure</small>
          <small className="col-4">Utilisateur</small>
          <small className="col-4">Action</small>
        </div>
        <div
          style={{
            overflowY: "scroll",
            height: "70vh",
            scrollbarWidth: "none",
          }}
          className="row"
        >
          <div className="col-12">
            {listLogs.map(({ datelog, auteurlog, actionlog, heurelog }, i) => (
              <div key={i} className="row p-2 border-bottom border-light">
                <small className="col-2">{datelog}</small>
                <small className="col-2">{heurelog}</small>
                <small className="col-4">{auteurlog}</small>
                <small className="col-4">{actionlog}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapPropToState = (state) => {
  const {
    listLogsReducer: { typeLogs, loading, listLogs },
  } = state;
  const {
    appReducer: { currentApp },
  } = state;
  return { typeLogs, loading, listLogs, currentApp };
};

const ListLogsConnected = connect(mapPropToState, {
  setTypeLogs,
  thunkSetListList,
})(ListLogs);
export default ListLogsConnected;
