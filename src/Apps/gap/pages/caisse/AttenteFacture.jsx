import React, { useEffect } from "react";
import { connect } from "react-redux";
import Facture from "../../containers/caisse/Facture";
import {
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
} from "../../api/caisse/factures";
import { socket } from "../../constants/apiQuery";

const AttenteFacture = ({
  listFacturesAttentes,
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
}) => {
  useEffect(() => {
    thunkListFacturesAttentes();
    socket.on("facture_nouvelle", () => {
      thunkListFacturesAttentes();
    });
  }, []);
  return (
    <div className="AttenteFacture row p-3">
      {listFacturesAttentes.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h3 className="text-center lead">Aucune facture en attente</h3>
        </div>
      ) : (
        <>
          {listFacturesAttentes.map((facture, i) => (
            <div className="col-2" key={i}>
              <Facture
                facture={facture}
                annuler={thunkAnnulerFactures}
                encaisser={thunkEncaisserFactures}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    factureReducer: { listFacturesAttentes },
  } = state;
  return { listFacturesAttentes };
};

const AttenteFactureConnected = connect(mapStateToProps, {
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
})(AttenteFacture);
export default AttenteFactureConnected;
