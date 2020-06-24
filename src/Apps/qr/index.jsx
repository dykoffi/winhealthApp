import React, { useState } from "react";
import QrReader from 'react-qr-scanner'
import logo from '../../static/images/logo.png'
import qr from '../../static/images/qr.png'
import PDFViewer from 'pdf-viewer-reactjs'
import { header, socket } from "../global/apiQuery";
import { useEffect } from "react";
import Alert from '@material-ui/lab/Alert';
import Axios from "axios";

const Gap = () => {
  const [result, setresult] = useState(null)
  const [url, seturl] = useState(null)
  const [facture, setfacture] = useState(null)
  useEffect(() => {
    socket.on("project_facture", (facture) => {
      console.log(facture);
      setfacture(facture)
    })

  }, [])
  return (
    <div className="col-12 page grey darken-4" id="qr">
      {
        !facture ? (
          <div className="row d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <img src={logo} alt="" />
          </div>
        ) : (
            <div className="row">
              <section style={{ height: "100vh" }} className="col-6 offset-3 white">
                <h3 className="text-center mt-3">Facture N° {facture.numerofacture}</h3>
                <div className="row p-4">
                  <div className="col-4 p-2 bg-light">
                    <h4>Patient</h4>
                    <small><b>IPP : </b> {facture.ipppatient}</small><br />
                    <small><b>Nom :</b> {facture.nompatient}</small><br />
                    <small><b>Prenoms :</b> {facture.prenomspatient}</small><br />
                    <small><b>Naissance :</b> {facture.datenaissancepatient} à {facture.lieunaissancepatient}</small><br />
                    <small><b>Contact : </b> {facture.contactpatient}</small><br />
                    <small><b>Domicile : </b> {facture.habitationpatient}</small><br />
                    <hr className="bg-light" />
                    <h4>Assurance</h4>
                    <small><b>Gestionnaire : </b> {facture.gestionnaire}</small><br />
                    <small><b>Bénéficiaire :</b> {facture.beneficiaire}</small><br />
                    <small><b>Assuré principal :</b> {facture.assureprinc}</small><br />
                    <small><b>Taux de couverture :</b> {facture.taux}</small><br />

                    <hr className="bg-light" />
                    <h4>Compte sante</h4>
                    <small><b>N° compte : </b> {facture.numerocompte}</small><br />
                    <small><b>Solde :</b> {facture.montantcompte}</small><br />
                    <div className="white mt-5">
                      <img src={qr} alt="" className="col-8 offset-2 my-3" />
                    </div>
                  </div>
                  <div className="col-8 px-4 text-center">
                    <b>Sejour N° {facture.numerosejoure} du {facture.datedebutsejour} au {facture.datefinsejour}</b><br />
                    <h4 className="mt-5">
                      <b>Part du Patient : </b> {facture.restepatientfacture} F CFA <br />
                      <b>part de l'assurance :</b> {facture.partassurancefacture} F CFA
                    </h4>
                  </div>
                </div>
              </section>
              <section style={{ height: "100vh" }} className="col-3 d-flex flex-column justify-content-center text-center">
                <i className="mdi-navigation-fullscreen mdi-5x text-warning  animated infinite flash"></i>
                <p className="text-white font-weight-bold">Scanner votre Qr code pour valider la transaction sur votre compte</p>
                <QrReader
                  delay={500}
                  style={{ width: "100%" }}
                  onError={(err) => { console.log(err) }}
                  onScan={(result) => {
                    if (result != null) Axios({ url: `${header.url}/gap/verify/compte/${result}` }).then(({ data: { rows } }) => {
                      if (rows.lenght === 0) setresult("false")
                      else {
                        setresult("true")
                        socket.emit("valid_paiement", facture.numerofacture, facture.restepatientfacture)
                        setfacture(false)
                        setresult("off")
                        const audio = new Audio(`${header.url}/son.mp3`);
                        audio.play();
                      }

                    });
                  }} />
                <p className="bg-warning p-2"><b>Vous serai débité de {facture.restepatientfacture} F CFA sur votre compte</b></p>
                {result === "false" && <Alert variant="filled" severity="error">Erreur</Alert>}
                {result === "true" && <Alert variant="filled" severity="success">Transaction reussie</Alert>}
              </section>
            </div>
          )}

    </div>
  );
};

export default Gap;
