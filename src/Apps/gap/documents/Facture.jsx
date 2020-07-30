import React, { useState, useEffect } from "react";
import logo from "../../../static/images/logoms2.jpg";
import { Info } from "../../global/context";
import QR from "qrcode.react";
import {
  Page,
  Text,
  View,
  Document,
  BlobProvider,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import PrintIcon from "@material-ui/icons/Print";
import { header } from "../../global/apiQuery";
import { Button } from "@material-ui/core";

Font.register({ family: "Regular", src: `${header.local}/font.ttf` });
Font.register({ family: "Roboto-Bold", src: `${header.local}/fonts/Roboto-Bold.ttf`, });
Font.register({ family: "Roboto-Light", src: `${header.local}/fonts/Roboto-Light.ttf`, });

const DocHead = ({ etablissement }) => (
  <View
    style={{
      flex: "auto",
      display: "flex",
      paddingBottom: 8,
      flexDirection: "row",
      fontFamily: "Regular",
    }}
  >
    <View style={{ flex: 2 }}>
      <Image src={logo} style={{ height: "3cm", width: "3cm" }} />
    </View>
    <View style={{ flex: 10, textAlign: "right" }}>
      <Text style={{ fontSize: 15, fontFamily: "Roboto-Bold", }}>POLYCLINIQUE ALTEA</Text>
      <View style={{ fontSize: 8, color: "grey", lineHeight: 1.5 }}>
        <Text>Cocody Angre 7ème tranche près de la grande boulangerie des carnes de sucres fondues</Text>
        <Text>Abidjan BP 05 789</Text>
        <Text>Tel : 21 58 96 35 / 58 96 32 15</Text>
        <Text>Email : info@altea-ci.com</Text>
      </View>
    </View>
  </View>
);

const DocFoot = ({ url }) => (
  <View style={{ flex: "auto", display: "flex", flexDirection: "row", alignItems: "center", fontFamily: "Regular", }}>
    <View style={{ flex: "auto", }}>
      <Image src={url} style={{ height: "2.5cm", width: "2.5cm" }} />
    </View>
    <View style={{ flex: "auto", fontSize: 8, paddingLeft: 5, color: "grey", lineHeight: 1.5, }}>
      <Text>Fait à Abidjan le 25 juin 2019</Text>
      <Text>par Audrey Bogui</Text>
      <Text>Email : info@altea-ci.com</Text>
      <Text>Site web : www.altea.ci</Text>
    </View>
  </View>
);

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
        <BlobProvider
          document={
            <Facture
              facture={facture}
              url={code}
            />
          }
          fileName="somename.pdf"
        >
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

const Facture = ({
  facture,
  url
}) => {
  return (
    <>
      {url && (
        <Document>
          <Page size="A4" style={{ padding: 30, display: "flex", flexDirection: "column", }}>
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
                  <Text style={styles.title}>ASSURANCE</Text>
                  <View style={styles.l}><Text>Gestionnaire : </Text><Text>{facture[0].gestionnaire}</Text></View>
                  <View style={styles.l}><Text>Organisme : </Text><Text>{facture[0].organisme}</Text></View>
                  <View style={styles.l}><Text>Assure Princ :  </Text><Text>{facture[0].assureprinc}</Text></View>
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
                    <Text>Désignation</Text>
                    <Text>Coef</Text>
                    <Text>Med / Spec</Text>
                    <Text>Date</Text>
                    <Text>QT</Text>
                    <Text>PU</Text>
                    <Text>Total</Text>
                    <Text>Part Assu</Text>
                    <Text>Part Patient</Text>
                    <Text>Total</Text>
                  </View>
                  {
                    facture.map((f, i) =>
                      <View style={styles.l}>
                        <Text>{f.libelleacte}</Text>
                        <Text>{f.prixacte} FCFA</Text>
                      </View>
                    )
                  }
                  <View style={styles.l}>
                    <Text>{facture[0].libelleacte}</Text>
                    <Text>{facture[0].prixacte} FCFA</Text>
                  </View>
                </View>
                <View style={{ ...styles.l, fontSize: 15, marginBottom: 25, backgroundColor: "#fafafa", padding: 15, flex: 'auto' }}>
                  <Text>TOTAL </Text>
                  <Text style={{ fontFamily: "Roboto-Bold", }}>{facture[0].montanttotalfacture} FCFA</Text>
                </View>
              </View>
            </View>
            <DocFoot url={url} />
          </Page>
        </Document>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: 'Roboto-Bold'
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
    fontSize: 8,
  },
});

export default DownloadLink;
