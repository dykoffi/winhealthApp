import React, { useEffect } from "react";

//les composants
import Itemlist from "../../../../components/Itemlist";
import LoadingPoint from "../../../../components/LoadingPoint";
import Text from "../../../../components/Text";

//redux
import { connect } from "react-redux";
import { thunkListUser, thunkSearchListUser } from "../../api/Users/list";
import { thunkDetailsUser } from "../../api/Users/details";
import { thunklistApps, activeApp } from "../../api/Users/apps";

const Verticalist = ({
  thunkDetailsUser,
  thunkListUser,
  thunklistApps,
  thunkSearchListUser,
  activeApp,
  appActive,
  listApps,
  listUser,
  loading,
  aucun,
}) => {
  useEffect(() => {
    thunklistApps();
    thunkListUser(appActive);
  }, [thunklistApps,thunkListUser,appActive]);

  return (
    <div className="row white Verticalist ">
      <input
        onChange={(ev) => {
          thunkSearchListUser(appActive,ev.target.value);
        }}
        type="text"
        placeholder="Rechercher un utilisateur"
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
        {aucun && <Text text="Aucun utilisateur" />}
        {!aucun && !loading && (
          <Text text={`${listUser.length} utilisateur(s)`} />
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
        {listUser.map(
          ({ nomuser, prenomsuser, mailuser, iduser }, i) => (
            <Itemlist
              icon="social-person"
              title={nomuser + ' ' + prenomsuser}
              details={mailuser}
              key={i}
              click={() => thunkDetailsUser(iduser)}
            />
          )
        )}
      </div>
    </div>
  );
};
const mapStateToProp = (state) => {
  const {
    listReducer: { listUser, loading, aucun },
  } = state;
  const {
    appReducer: { listApps, appActive },
  } = state;
  return { listUser, loading, aucun, listApps, appActive };
};

const VerticalistConnected = connect(mapStateToProp, {
  thunkListUser,
  thunklistApps,
  thunkSearchListUser,
  thunkDetailsUser,
  activeApp,
})(Verticalist);
export default VerticalistConnected;
