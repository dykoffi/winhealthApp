import React, { useState, useEffect } from "react";
import logo from "../../../static/images/logoms2.jpg";
import QR from "qrcode.react";
import {
  Page,
  Text,
  View,
  Document,
  BlobProvider,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import PrintIcon from "@material-ui/icons/Print";
import { Button } from "@material-ui/core";
import { NumberToLetter, separate } from "../../global/functions";

const DocHead = ({ etablissement }) => (
  <View
    style={{
      flex: "auto",
      display: "flex",
      paddingBottom: 8,
      flexDirection: "row",
    }}
  >
    <View style={{ flex: 2 }}>
      <Image src={logo} style={{ height: "3cm", width: "3cm" }} />
    </View>
    <View style={{ flex: 10, textAlign: "right" }}>
      <Text style={{ fontSize: 15, }}>POLYCLINIQUE ALTEA</Text>
      <View style={{ fontSize: 8, color: "grey", lineHeight: 1.5 }}>
        <Text>Tel : 21 58 96 35 / 58 96 32 15</Text>
        <Text>Cocody Angre 7ème tranche</Text>
        <Text>Email : info@altea-ci.com</Text>
        <Text>Abidjan BP 05 789</Text>
      </View>
    </View>
  </View>
);

const Facture = ({
  facture,
  url
}) => {
  return (
    <>
      {url && (
        <Document>
          <Page size="A4" style={{ padding: 15, display: "flex", flexDirection: "column", }}>
            <DocHead />
            <View style={{ flex: "auto", display: "flex", flexDirection: 'row', justifyContent: "space-around", fontSize: 12, }}>
              <View style={styles.content}>
                <Text style={styles.title}>PATIENT(E)</Text>
                <View style={styles.l}><Text>IPP : </Text><Text>{facture[0].ipppatient}</Text></View>
                <View style={styles.l}><Text>NOM : </Text><Text>{facture[0].nompatient} {facture[0].prenomspatient}</Text></View>
                <View style={styles.l}><Text>NAISSANCE :  </Text><Text>{facture[0].datenaissancepatient} à {facture[0].lieunaissancepatient}</Text></View>
                <View style={styles.l}><Text>DOMICILE : </Text><Text>{facture[0].habitationpatient}</Text></View>
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>SEJOUR DU {facture[0].datedebutsejour === facture[0].datefinsejour ? facture[0].datedebutsejour : <>{facture[0].datedebutsejour} AU {facture[0].datefinsejour}</>}</Text>
                <View style={styles.l}><Text>N° DE SEJOUR : </Text><Text>{facture[0].numerosejour}</Text></View>
                <View style={styles.l}><Text>ENTRÉ(E) À :  </Text><Text>{facture[0].heuredebutsejour}</Text></View>
                <View style={styles.l}><Text>SORTI(E) À :  </Text><Text>{facture[0].heurefinsejour}</Text></View>
                <View style={styles.l}><Text>TYPE DE SEJOUR : </Text><Text>{facture[0].typesejour}</Text></View>
              </View>
              {facture[0].gestionnaire.trim() !== "" &&
                <View style={styles.content}>
                  <Text style={styles.title}>ASSURANCE ({facture[0].gestionnaire})</Text>
                  <View style={styles.l}><Text>Organisme : </Text><Text>{facture[0].organisme}</Text></View>
                  <View style={styles.l}><Text>Assure Princ :  </Text><Text>{facture[0].assureprinc}</Text></View>
                  <View style={styles.l}><Text>N° Bon :  </Text><Text>{facture[0].numeropec}</Text></View>
                  <View style={styles.l}><Text>Exonération : </Text><Text>{facture[0].taux}%</Text></View>
                </View>
              }
            </View>
            <View style={{ flex: "10", display: "flex", fontSize: 12, }}>
              <Text style={{ ...styles.title, backgroundColor: "white", textAlign: "center", marginBottom: 10, marginTop: 10, fontSize: 14 }}>
                FACTURE N° {facture[0].numerofacture} DU {facture[0].datefacture}
              </Text>
              <View style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <View style={{ ...styles.content, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <View style={{ ...styles.l, justifyContent: 'space-between', }}>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Designation</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.libelleacte}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Coef</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.cotationacte}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Med / Spec</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.medecinsejour} / {facture.specialitesejour}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Date</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.datedebutsejour}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Qte</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.quantite}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Prix U</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.prixacte}</Text>)}
                      <Text style={{ ...styles.line, marginTop: 5, }}>TOTAL G</Text>
                      <Text style={{ ...styles.line }}>Encaissé</Text>
                      <Text style={{ ...styles.line }}>Reste</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Prix T</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.prixacte * facture.quantite}</Text>)}
                      <Text style={{ ...styles.line, marginTop: 5 }}>{facture[0].montanttotalfacture}</Text>
                      <Text style={{ ...styles.line, }}>{facture[0].montanttotalfacture - facture[0].restepatientfacture - facture[0].resteassurancefacture}</Text>
                      <Text style={{ ...styles.line, }}>{facture[0].restepatientfacture + facture[0].resteassurancefacture}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Part Assu</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.plafondassurance * facture.quantite * facture.taux / 100}</Text>)}
                      <Text style={{ ...styles.line, marginTop: 5 }}>{facture[0].partassurancefacture}</Text>
                      <Text style={{ ...styles.line }}>{facture[0].partassurancefacture - facture[0].resteassurancefacture}</Text>
                      <Text style={{ ...styles.line }}>{facture[0].resteassurancefacture}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Part Patient</Text>
                      {facture.map((facture,i) => <Text key={i} style={{ ...styles.line }}>{facture.prixacte * facture.quantite - (facture.plafondassurance * facture.quantite * facture.taux / 100)}</Text>)}
                      <Text style={{ ...styles.line, marginTop: 5 }}>{facture[0].partpatientfacture}</Text>
                      <Text style={{ ...styles.line }}>{facture[0].partpatientfacture - facture[0].restepatientfacture}</Text>
                      <Text style={{ ...styles.line }}>{facture[0].restepatientfacture}</Text>
                    </View>
                  </View>
                </View>
                <Text style={{ fontSize: 8 }}>Certifié exact, la présente facture s'élévant à la somme de {NumberToLetter(facture[0].montanttotalfacture)} francs CFA</Text>
              </View>
            </View>
            <DocFoot url={url} facture={facture} />
          </Page>
        </Document>
      )}
    </>
  );
};

const DocFoot = ({ url, facture }) => (
  <View style={{ flex: "auto", display: "flex", flexDirection: "column", }}>
    <View style={{ flex: 1, fontSize: 8, display: 'flex', marginTop: 7, color: "grey", lineHeight: 1.5, borderBottomColor: 'grey', borderBottomStyle: 'solid', borderBottomWidth: 0.5 }}>
      <Text style={{ ...styles.tr, textAlign: 'center' }}>COUPON À JOINDRE AU RÈGLEMENT</Text>
      <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1, padding: 3, display: 'flex', flexDirection: 'column' }}>
          <Text>BANQUE : BGFI BANK </Text>
          <Text>IBAN : CI33CI1620100200211010440121 </Text>
          <Text>BIC : BGFIABXXX </Text>
          <Text>DOMICILE : BGFIBANK</Text>
        </View>
        <View style={{ flex: 1, padding: 3, display: 'flex', flexDirection: 'column' }}>
          <Text>DESTINATAIRE : {facture[0].assureprinc} </Text>
          <Text>PATIENT : {facture[0].nompatient} {facture[0].prenomspatient} </Text>
          <Text>SEJOUR  : N° {facture[0].numerosejour} DU {facture[0].datedebutsejour}
            {facture[0].datefinsejour !== facture[0].datedebutsejour ? ' AU ' + facture[0].datefinsejour : ''} </Text>
          <Text>FACTURE : N° {facture[0].numerofacture} DU {facture[0].datefacture}</Text>
          <Text>MONTANT : {separate(facture[0].montanttotalfacture)} F CFA</Text>
        </View>
      </View>
    </View>
    <View style={{ flex: 1, justifyContent: 'flex-start', fontSize: 8, marginTop: 7, color: "grey", lineHeight: 1.5, }}>
      <Text>Fait à Abidjan le {facture[0].datefacture}</Text>
      <Text>par {facture[0].auteurfacture}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  l: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    lineHeight: 2
  },
  content: {
    padding: 10,
    lineHeight: 1.6,
    fontSize: 7.2,
  },
  column: {
    flex: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 8,
    paddingHorizontal: 5,
    borderColor: 'grey',
    borderStyle: 'solid',
    backgroundColor: 'lightgrey',
    paddingTop: 7,
    borderWidth: 0.4

  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    lineHeight: 2,
    paddingHorizontal: 5,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 0.4,
    paddingTop: 7
  }
});

const DownloadLink = ({
  code,
  showPDF,
  facture
}) => {
  const [url, seturl] = useState(null);
  useEffect(() => {
    const canvas = document.getElementById("img");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    seturl(pngUrl);
  }, []);

  return (
    <div className="row">
      <QR value={code} id="img" fgColor="#696969" includeMargin={true} style={{ display: "none" }} />
      {url && (
        <BlobProvider document={<Facture facture={facture} url={code} />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              <small>...</small>
            ) : (
                <Button
                  variant="contained"
                  className="mb-2 mx-4 col"
                  startIcon={<PrintIcon />}
                  onClick={() => showPDF(url)}
                  style={{
                    textTransform: "none",
                    fontSize: "11px",
                  }}
                >Imprimer la facture</Button>
              )
          }
        </BlobProvider>
      )
      }
    </div >
  );
};

export default DownloadLink;
