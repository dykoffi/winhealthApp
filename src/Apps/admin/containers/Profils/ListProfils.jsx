import React, { useEffect } from "react";

//les composants
import Itemlist from "../../../../components/Itemlist";
import Loading from "../../../../components/Loading";
import Aucun from "../../../../components/Aucun";

//redux
import { connect } from "react-redux";
import { thunkListProfil, thunkSearchListProfil } from "../../api/Profils/list";
import { thunkDetailsProfil } from "../../api/Profils/details";

const Verticalist = ({
  thunkDetailsProfil,
  thunkListProfil,
  thunkSearchListProfil,
  listProfil,
  loading,
  aucun,
}) => {
  useEffect(() => {
    thunkListProfil();
  }, [thunkListProfil]);

  return (
    <div className="row white Verticalist ">
      <input
        onChange={(ev) => {
          thunkSearchListProfil(ev.target.value);
        }}
        type="text"
        placeholder="rechercher un profil"
        className="col-12 p-2 white bordertrans"
      />
      <div className="col-12 text-center">
        {loading && <Loading text="chargement des profils" />}
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
              details={`crée le ${dateprofil} par  ${auteurprofil}`}
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
  return { listProfil, loading, aucun };
};

const VerticalistConnected = connect(mapStateToProp, {
  thunkListProfil,
  thunkSearchListProfil,
  thunkDetailsProfil,
})(Verticalist);
export default VerticalistConnected;
