import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setActiveApp, thunkSetListApps } from "../../api/Logs/app";
import LoadingPoint from "../../../../components/LoadingPoint";

const ListApp = ({ listApps, currentApp, setActiveApp, thunkSetListApps }) => {
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
              className={`font-weight-bold  ${currentApp === codeapp ?  "text-info" : "grey-text"}`}
            >
              {nomapp}
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
