import React, { useEffect } from "react";
import { connect } from "react-redux";

import LoadingPoint from "../../../../components/LoadingPoint";
import Aucun from "../../../../components/Aucun";
import logsType from "../../constants/typeLogs";

import { setTypeLogs, thunkSetListList } from "../../api/Logs/listLogs";

const ListLogs = ({
  setTypeLogs,
  typeLogs,
  thunkSetListList,
  loading,
  listLogs,
  currentApp,
}) => {
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
              <small>{nom} </small>
            </div>
          ))}
        </div>
        <div className="col-12 text-center">
          {loading ? (
            <LoadingPoint />
          ) : listLogs.length === 0 ? (
            <Aucun text={`Aucun log`} />
          ) : (
            <Aucun text={`${listLogs.length} log(s)`} />
          )}
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
            <div className="row p-2 bg-light">
              <small className="col-2">date</small>
              <small className="col-2">heure</small>
              <small className="col-5">Utilisateur</small>
              <small className="col-3">Action</small>
            </div>
            {listLogs.map(({ datelog, auteurlog, actionlog, heurelog }, i) => (
              <div className="row p-2 border-bottom border-light">
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
