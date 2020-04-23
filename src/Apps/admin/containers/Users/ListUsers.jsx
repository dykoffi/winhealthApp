import React, { useEffect } from "react";

//les composants
import Itemlist from "../../../../components/Itemlist";
import LoadingPoint from "../../../../components/LoadingPoint";
import Aucun from "../../../../components/Aucun";

//redux
import { connect } from "react-redux";
import { thunkListProfil, thunkSearchListProfil } from "../../api/Profils/list";
import { thunkDetailsProfil } from "../../api/Profils/details";
import { thunklistApps, activeApp } from "../../api/Profils/apps";

const Verticalist = ({
  thunkDetailsProfil,
  thunkListProfil,
  thunklistApps,
  thunkSearchListProfil,
  activeApp,
  appActive,
  listApps,
  listProfil,
  loading,
  aucun,
}) => {
  useEffect(() => {
    thunklistApps();
    thunkListProfil(appActive);
  }, [thunklistApps,thunkListProfil,appActive]);

  return (
    <div className="row white Verticalist ">
      <input
        onChange={(ev) => {
          thunkSearchListProfil(appActive,ev.target.value);
        }}
        type="text"
        placeholder="rechercher un profil"
        className="col-12 p-2 white bordertrans"
      />
      <div className="col-12">
        <div className="row chooseApp text-center">
          {listApps.map(({ nomapp, codeapp }, i) => (
            <div
              key={i}
              className={`col-sm m-1 ${appActive === codeapp && "active"}`}
              onClick={() => {
                activeApp(codeapp, nomapp);
              }}
            >
              <small>{nomapp}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 text-center">
        {loading && <LoadingPoint />}
        {aucun && <Aucun text="Aucun profil" />}
        {!aucun && !loading && (
          <Aucun text={`${listProfil.length} profil(s)`} />
        )}
      </div>
      <div
        className="col-12 items ombre"
        style={{
          height: "60vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        {listProfil.map(
          ({ labelprofil, dateprofil, auteurprofil, idprofil }, i) => (
            <Itemlist
              icon="action-verified-user"
              title={labelprofil}
              key={i}
              click={() => thunkDetailsProfil(idprofil)}
            />
          )
        )}
      </div>
    </div>
  );
};
const mapStateToProp = (state) => {
  const {
    listReducer: { listProfil, loading, aucun },
  } = state;
  const {
    appReducer: { listApps, appActive },
  } = state;
  return { listProfil, loading, aucun, listApps, appActive };
};

const VerticalistConnected = connect(mapStateToProp, {
  thunkListProfil,
  thunklistApps,
  thunkSearchListProfil,
  thunkDetailsProfil,
  activeApp,
})(Verticalist);
export default VerticalistConnected;
