import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setActiveApp, thunkSetListApps } from "../../api/Logs/app";
import LoadingPoint from "../../../../components/LoadingPoint";
import Axios from "axios";
import { header } from "../../../global/apiQuery";

const ListApp = ({ listApps, currentApp, setActiveApp, thunkSetListApps }) => {
  const [allLogs, setallLogs] = useState([]);
  useEffect(() => {
    Axios({
      url: `/admin/listall/logs`,
      baseURL: header.url,
      method: "GET",
    })
      .then((response) => response.data.rows)
      .then((data) => {
        setallLogs(data);
      });
  }, []);
  useEffect(() => {
    thunkSetListApps();
  }, [thunkSetListApps]);
  return (
    <div className="row">
      {listApps.length === 0 ? (
        <LoadingPoint />
      ) : (
        listApps.map(({ nomapp, codeapp }, i) => (
          <div key={i} className="col-12 d-flex rounded p-2 logListApps">
            <small
              onClick={() => {
                setActiveApp(codeapp);
              }}
              className={`font-weight-bold  ${
                currentApp === codeapp ? "text-info" : "grey-text"
              }`}
            >
              {nomapp} ({allLogs.filter((x) => x.codeapp === codeapp).length})
            </small>
          </div>
        ))
      )}
    </div>
  );
};

const mapPropToState = (state) => {
  const {
    appReducer: { listApps, currentApp },
  } = state;

  return { listApps, currentApp };
};
const ListAppConnected = connect(mapPropToState, {
  thunkSetListApps,
  setActiveApp,
})(ListApp);

export default ListAppConnected;
