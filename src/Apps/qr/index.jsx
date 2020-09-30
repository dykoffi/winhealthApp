import React, { useState } from "react";
import QrReader from 'react-qr-scanner'
import logo from '../../static/images/logo4.png'
import qr from '../../static/images/qr.png'
import { header, socket } from "../global/apiQuery";
import { useEffect } from "react";
import Alert from '@material-ui/lab/Alert';
import Axios from "axios";

const Gap = () => {
  const [result, setresult] = useState(null)
  const [facture, setfacture] = useState(null)
  const [projeter, setprojeter] = useState(false)
  const columns = [
    "Désigantion",
    "Coef",
    "Med / Spec",
    "Date",
    "Qte",
    "Prix U",
    "Prix T",
    "Part Assu",
    "Part Patient"
  ]
  useEffect(() => {
    socket.on("project_facture", (facture) => {
      const audio = new Audio(`${header.url}/alert.mp3`);
      audio.play();
      if (projeter) {
        setprojeter(false)
      } else {
        setprojeter(true)
      }
      setfacture(facture)
    })
  }, [])
  return (
    <div className="col-12 page grey darken-4" id="qr">
      {
        facture && projeter ? (
          <div className="row">
            <section style={{ height: "100vh" }} className="col-12 text-white">
              <h1 className="text-center display-3 font-weight-bold mt-3">Facture N° {facture[0].numerofacture}</h1>
              <h3 className="text-center bgcolor-primary">Sejour N° {facture[0].numerosejour} du {facture[0].datedebutsejour} au {facture[0].datefinsejour}</h3>
              <div className="row p-4">
                <div className="col p-2">
                  <h4>Patient</h4>
                  <small><b>IPP : </b> {facture[0].ipppatient}</small><br />
                  <small><b>Nom :</b> {facture[0].nompatient}</small><br />
                  <small><b>Prenoms :</b> {facture[0].prenomspatient}</small><br />
                  <small><b>Naissance :</b> {facture[0].datenaissancepatient} à {facture[0].lieunaissancepatient}</small><br />
                  <small><b>Contact : </b> {facture[0].contactpatient}</small><br />
                  <small><b>Domicile : </b> {facture[0].habitationpatient}</small><br />
                </div><div className="col p-2 mx-2">
                  <h4>Assurance</h4>
                  <small><b>Gestionnaire : </b> {facture[0].gestionnaire}</small><br />
                  <small><b>Bénéficiaire :</b> {facture[0].beneficiaire}</small><br />
                  <small><b>Assuré principal :</b> {facture[0].assureprinc}</small><br />
                  <small><b>Taux de couverture :</b> {facture[0].taux}%</small><br />
                </div>
                <div className="col p-2">
                  <h4>Compte sante</h4>
                  <small><b>N° compte : </b> {facture[0].numerocompte}</small><br />
                  <small><b>Solde :</b> {facture[0].montantcompte}</small><br />
                </div>
                <table className="col-12 table-sm table-sm table-striped mt-4">
                  <thead className="bgcolor-secondaryDark">
                    <tr>
                      {columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      facture.map(({ libelleacte, cotationacte, medecinacte, plafondassurance, taux, datedebutsejour, specialitesejour, quantite, prixacte }, i) =>
                        <tr>
                          <td>{libelleacte}</td>
                          <td>{cotationacte}</td>
                          <td>{medecinacte} / {specialitesejour}</td>
                          <td>{datedebutsejour}</td>
                          <td>{quantite}</td>
                          <td>{prixacte}</td>
                          <td> {eval(quantite * prixacte)}</td>
                          <td>{eval(plafondassurance * quantite * taux / 100)}</td>
                          <td>{eval(prixacte * quantite - (plafondassurance * quantite * taux / 100))}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
                <div className="col-12">
                  <h4 className="mt-5">
                    <b>Part du Patient : </b> {facture[0].restepatientfacture} F CFA <br />
                    <b>part de l'assurance :</b> {facture[0].partassurancefacture} F CFA
                </h4>
                </div>
              </div>
            </section>
            <section style={{ height: "100vh" }} className="col-3 d-flex flex-column justify-content-center text-center">
              <i className="mdi-navigation-fullscreen mdi-5x text-warning  animated infinite flash"></i>
              <p className="text-white font-weight-bold">Scanner votre Qr code pour valider la transaction sur votre compte</p>
              <QrReader
                delay={500}
                style={{ width: "500", height : "500", position : "fixed", bottom : 0.5, right : 0.5 }}
                onError={(err) => { console.log(err) }}
                onScan={(result) => {
                  if (result != null) Axios({ url: `${header.url}/gap/verify/compte/${result}` }).then(({ data: { rows } }) => {
                    if (rows.lenght === 0) setresult("false")
                    else {
                      setresult("true")
                      socket.emit("valid_paiement", facture[0].numerofacture, facture[0].restepatientfacture)
                      setfacture(false)
                      setresult("off")
                      const audio = new Audio(`${header.url}/son.mp3`);
                      audio.play();
                    }

                  });
                }} />
              <p className="bg-warning p-2"><b>Vous serai débité de {facture[0].restepatientfacture} F CFA sur votre compte</b></p>
              {result === "false" && <Alert variant="filled" severity="error">Erreur</Alert>}
              {result === "true" && <Alert variant="filled" severity="success">Transaction reussie</Alert>}
            </section>
          </div>
        ) : (
            <div className="row d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <img src={logo} className="infinite animated pulse" alt="" style={{ height: 150 }} />
            </div>
          )
      }

    </div >
  );
};

export default Gap;
