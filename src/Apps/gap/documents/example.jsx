import React, { useState, useEffect } from "react";
import logo from "../../../static/images/logoms2.jpg";
import QR from "qrcode.react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import PrintIcon from "@material-ui/icons/Print";
import { header } from "../../global/apiQuery";
import { Button } from "@material-ui/core";
import { Info } from "../../global/context";

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
    }}
  >
    <View style={{ flex: 2 }}>
      <Image src={logo} style={{ height: "3cm", width: "3cm" }} />
    </View>
    <View style={{ flex: 10, textAlign: "right" }}>
      <Text style={{ fontSize: 15, fontFamily: "Roboto-Bold", }}>POLYCLINIQUE ALTEA</Text>
      <View style={{ fontSize: 8, color: "grey", lineHeight: 1.5 }}>
        <Text>Cocody Angre 7ème tranche</Text>
        <Text>Abidjan BP 05 789</Text>
        <Text>Tel : 21 58 96 35 / 58 96 32 15</Text>
        <Text>Email : info@altea-ci.com</Text>
      </View>
    </View>
  </View>
);

const DocFoot = ({ url }) => (
  <View style={{ flex: "auto", display: "flex", flexDirection: "row", alignItems: "center" }}>
    <View style={{ flex: "auto", }}>
      <Image src={url} style={{ height: "2.5cm", width: "2.5cm" }} />
    </View>
    <View style={{ flex: "auto", fontSize: 7, paddingLeft: 5, color: "grey", lineHeight: 1.5, }}>
      <Text>Fait à Abidjan le 25 juin 2019</Text>
      <Text>par Audrey Bogui</Text>
      <Text>Email : info@altea-ci.com</Text>
      <Text>Site web : www.altea.ci</Text>
    </View>
  </View>
);

const DownloadLink = ({
  code,
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
        <PDFDownloadLink
          document={<Facture url={url} facture={facture} />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <small>...</small>
            ) : (
                <div className="pr-4">
                  <Button
                    href={url}
                    size='small'
                    target='blank'
                    variant="contained"
                    // onClick={}
                    startIcon={<PrintIcon />}
                    className="red text-white "
                    style={{
                      textTransform: "none",
                      fontSize: "11px",
                    }}
                  >
                    Imprimer les factures non reçues
                    </Button>
                </div>
              )
          }
        </PDFDownloadLink>
      )
      }
    </div >
  );
};

const Facture = ({
  url,
  facture
}) => {
  return (
    <>
      {url && (
        <Document>
          <Page size="A4" style={{ padding: 20, display: "flex", flexDirection: "column", }}>
            <DocHead />
            <View style={{ flex: "10", display: "flex", fontSize: 12, }}>
              <Text style={{ ...styles.title, backgroundColor: "white", textAlign: "center", marginBottom: 10, marginTop: 10, fontSize: 17 }}>
                Liste des factures non reçues
              </Text>
              {/* <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <View style={styles.content}>
                  <View style={{ ...styles.l, fontSize: 9 }}><Text style={{ fontFamily: 'Roboto-Bold' }}>{facture[0].gestionnairefacture}</Text><Text> / {facture[0].organismefacture}</Text></View>
                  <View style={{ ...styles.l, fontSize: 9 }}><Text style={{ fontFamily: 'Roboto-Bold' }}>{facture[0].typesejourfacture}</Text></View>
                  <View style={{ ...styles.l, fontSize: 8 }}><Text style={{ fontFamily: 'Roboto-Bold' }}>{facture.length} facture(s)</Text></View>
                </View>
                <View style={styles.content}>
                  <View style={{ ...styles.l, fontSize: 9 }}><Text>Date : {facture[0].datecreationfacture}</Text></View>
                  <View style={{ ...styles.l, fontSize: 9 }}><Text>Heure : {facture[0].heurecreationfacture}</Text></View>
                  <View style={{ ...styles.l, fontSize: 8 }}><Text style={{ fontFamily: 'Roboto-Bold' }}>{facture[0].typesejourfacture}</Text></View>
                </View>
              </View> */}
              <View style={{ ...styles.content, fontSize: 9 }}>
                <Text>
                  Veuillez trouver en annexe les factures mentionnées ci-dessous dont la reception n'a pas été effectuée.
                </Text>
              </View>
              <View style={{ display: "flex", flex: 1, flexDirection: "column", }}>
                <View style={{ ...styles.content, flex: 1, display: 'flex', flexDirection: 'column', }}>
                  <View style={{ ...styles.l, justifyContent: 'space-between', flexFlow: 'row wrap', alignItems: 'stretch' }}>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Date</Text>
                      {facture.map(facture => <Text style={{ ...styles.line }}>{facture.datefacture}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>N° Facture</Text>
                      {facture.map(facture => <Text style={{ ...styles.line }}>{facture.numerofacture}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>N° PEC</Text>
                      {facture.map(facture => <Text style={{ ...styles.line }}>{facture.numeropec}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Matricule</Text>
                      {facture.map(facture => <Text style={{ ...styles.line }}>{facture.matriculeassure}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Patient</Text>
                      {facture.map(facture => <Text style={{ ...styles.line }}>{facture.nompatient} {facture.prenomspatient}</Text>)}
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Assuré Princ</Text>
                      {facture.map(facture => <Text style={{ ...styles.line }}>{facture.assureprinc}</Text>)}
                      <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', borderRight: 'none' }}>TOTAL</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Montant Total</Text>
                      {facture.map(facture => <Text style={{ ...styles.line, }}>{facture.montanttotalfacture}</Text>)}
                      <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', }}>{facture.map(facture => facture.montanttotalfacture).reduce((acc, curv) => acc + curv)}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Net à payer</Text>
                      {facture.map(facture => <Text style={{ ...styles.line, }}>{facture.partassurancefacture}</Text>)}
                      <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', }}>{facture.map(facture => facture.partassurancefacture).reduce((acc, curv) => acc + curv)}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Part Patient</Text>
                      {facture.map(facture => <Text style={{ ...styles.line, }}>{facture.partpatientfacture}</Text>)}
                      <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', }}>{facture.map(facture => facture.partpatientfacture).reduce((acc, curv) => acc + curv)}</Text>
                    </View>
                  </View>
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
    fontFamily: 'Roboto-Light'
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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 8,
    paddingHorizontal: 5,
    borderColor: 'grey',
    borderStyle: 'solid',
    backgroundColor: 'lightgrey',
    paddingTop: 7,
    borderWidth: 0.5

  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    lineHeight: 2,
    paddingHorizontal: 5,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 0.5,
    paddingTop: 7
  }
});

export default DownloadLink;
