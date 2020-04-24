import React from "react";
import { connect } from "react-redux";
import LoadingPoint from "../../../../components/LoadingPoint";
import Information from "../../../../containers/Information";
import { thunkDeleteUser, setModal } from "../../api/Users/details";

const DetailsUser = ({
  currentUser,
  loadingUser,
  modal,
  setModal,
  thunkDeleteUser,
}) => {
  return (
    <div className="row DetailsUser">
      {currentUser ? (
        <>
          <div className="col-8 d-flex flex-column">
            <div>
              <small>Nom</small> :
              <small className="font-weight-bold ml-2">
                {currentUser[0].nomuser}
              </small>
            </div>
            <div>
              <small>Prenoms</small> :
              <small className="font-weight-bold ml-2">
                {currentUser[0].prenomsuser}
              </small>
            </div>
            <div>
              <small>Contact</small> :
              <small className="font-weight-bold ml-2">
                {currentUser[0].contactuser}
              </small>
            </div>
            <div>
              <small>Mail</small> :
              <small className="font-weight-bold ml-2">
                {currentUser[0].mailuser}
              </small>
            </div>
            <div>
              <small>Module</small> :
              <small className="font-weight-bold ml-2">
                {currentUser[0].nomapp}
              </small>
            </div>
            <div>
              <small>Poste</small> :
              <small className="font-weight-bold ml-2">
                {currentUser[0].posteuser}
              </small>
            </div>
            <div>
              <small>Profil</small> :
              <small className="font-weight-bold ml-2">
                {currentUser[0].labelprofil}
              </small>
            </div>
          </div>
          <div className="col-4 text-center d-flex align-items-center">
            <i className="mdi-social-person mdi-5x text-info"></i>
          </div>

          <div
            className="col-12"
            style={{
              height: "50vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <div className="row p-4">
              <table className="table table-sm table-borderless table-striped col-12">
                <thead className="">
                  <tr className="row">
                    <th className="col-1">
                      <small>N°</small>
                    </th>
                    <th className="col-2">
                      <small>code</small>
                    </th>
                    <th className="col-9">
                      <small>droit</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.map(({ labeldroit, codedroit }, i) => (
                    <tr className="row" key={i}>
                      <td className="col-1">
                        <small>{i}</small>
                      </td>
                      <td className="col-2">
                        <small>{codedroit}</small>
                      </td>
                      <td className="col-9">
                        <small>{labeldroit}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center grey-text lighten-3 col-12">
          <div className="row">
            <i className="mdi-editor-format-align-left mdi-3x col-12 text-center"></i>
            <small className="text-center col-12">
              Aucun Utilisateur selectionné
            </small>
          </div>
        </div>
      )}
      {loadingUser && (
        <div className="d-flex align-items-center justify-content-center col-12">
          <LoadingPoint />
        </div>
      )}
      {currentUser && !loadingUser && (
        <div className="d-flex align-items-center justify-content-center col-12 text-info">
          <small onClick={() => setModal(true)} style={{ cursor: "pointer" }}>
            Supprimer cet utillisateur
          </small>
        </div>
      )}
      {modal && (
        <Information
          text={`L'utilisateur '${currentUser[0].nomuser} ${currentUser[0].prenomsuser}'  ne pourrat plus se connecter apres cette suppression. Voulez vous continuer ?`}
          close={() => setModal(false)}
          titre="Information"
          confirm={() => thunkDeleteUser(currentUser[0].iduser)}
        />
      )}
    </div>
  );
};

const mapStateToProp = (state) => {
  const {
    detailsReducer: { currentUser, loadingUser, modal },
  } = state;
  return { currentUser, loadingUser, modal };
};

const DetailsUserConnected = connect(mapStateToProp, {
  thunkDeleteUser,
  setModal,
})(DetailsUser);
export default DetailsUserConnected;
