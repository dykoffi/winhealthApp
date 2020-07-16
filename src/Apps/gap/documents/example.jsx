import React, { useState, useEffect } from "react";
import socket from 'socket.io-client'
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
import { IconButton } from "@material-ui/core";

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
      <Text>Facture établie par: </Text>
      <Text>Imprimé le : le 25 juin 2019</Text>
    </View>
  </View>
);

const DownloadLink = ({
  code,
  sejour
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
          document={
            <Facture
              url={url}
              nompatient={sejour.nompatient}
              prenomspatient={sejour.prenomspatient}
              datenaissancepatient={sejour.datenaissancepatient}
              ipppatient={sejour.ipppatient}
              lieunaissancepatient={sejour.lieunaissancepatient}
              habitationpatient={sejour.habitationpatient}
              numerofacture={sejour.numerofacture}
              datefacture={sejour.datefacture}
              heurefacture={sejour.heurefacture}
              auteurfacture={sejour.auteurfacture}
              datedebutsejour={sejour.datedebutsejour}
              datefinsejour={sejour.datefinsejour}
              heuredebutsejour={sejour.heuredebutsejour}
              heurefinsejour={sejour.heurefinsejour}
              typesejour={sejour.typesejour}
              libelleacte={sejour.libelleacte}
              prixacte={sejour.prixacte}
              gestionnaire={sejour.gestionnaire}
              organisme={sejour.organisme}
              taux={sejour.taux}
              assureprinc={sejour.assureprinc}
              numerosejour={sejour.numerosejour}
            />
          }
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <small>...</small>
            ) : (
                <>
                  <IconButton aria-label="print" size="small" href={url} target="blank">
                    <PrintIcon />
                  </IconButton>
                </>
              )
          }
        </PDFDownloadLink>
      )
      }
    </div >
  );
};

const Facture = ({
  //patient
  nompatient,
  prenomspatient,
  datenaissancepatient,
  ipppatient,
  lieunaissancepatient,
  habitationpatient,
  url,
  //facture
  numerofacture,
  datefacture,
  heurefacture,
  auteurfacture,
  //sejour
  datedebutsejour,
  datefinsejour,
  heuredebutsejour,
  heurefinsejour,
  typesejour,
  numerosejour,
  //acte
  libelleacte,
  prixacte,

  //assurance
  gestionnaire,
  organisme,
  taux,
  assureprinc
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
                <View style={styles.l}><Text>IPP : </Text><Text>{ipppatient}</Text></View>
                <View style={styles.l}><Text>NOM : </Text><Text>{nompatient} {prenomspatient}</Text></View>
                <View style={styles.l}><Text>NAISSANCE :  </Text><Text>{datenaissancepatient} à {lieunaissancepatient}</Text></View>
                <View style={styles.l}><Text>DOMICILE : </Text><Text>{habitationpatient}</Text></View>
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>SEJOUR DU {datedebutsejour === datefinsejour ? datedebutsejour : <>{datedebutsejour} AU {datefinsejour}</>}</Text>
                <View style={styles.l}><Text>N° DE SEJOUR : </Text><Text>{numerosejour}</Text></View>
                <View style={styles.l}><Text>ENTRÉ(E) À :  </Text><Text>{heuredebutsejour}</Text></View>
                <View style={styles.l}><Text>SORTI(E) À :  </Text><Text>{heurefinsejour}</Text></View>
                <View style={styles.l}><Text>TYPE DE SEJOUR : </Text><Text>{typesejour}</Text></View>
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>ASSURANCE</Text>
                <View style={styles.l}><Text>Gestionnaire : </Text><Text>{gestionnaire}</Text></View>
                <View style={styles.l}><Text>Organisme : </Text><Text>{organisme}</Text></View>
                <View style={styles.l}><Text>Assure Princ :  </Text><Text>{assureprinc}</Text></View>
                <View style={styles.l}><Text>Exonération : </Text><Text>{taux}%</Text></View>
              </View>
            </View>
            <View style={{ flex: "10", display: "flex", fontSize: 12, }}>
              <Text style={{ ...styles.title, backgroundColor: "white", textAlign: "center", marginBottom: 10, marginTop: 10, fontSize: 14 }}>
                FACTURE N° {numerofacture} DU {datefacture}
              </Text>
            </View>
            <View style={{ display: "flex", flex: 1, flexDirection: "column", }}>
                <View style={{ ...styles.content, flex: 1, display: 'flex', flexDirection: 'column', }}>
                  <View style={{ ...styles.l, justifyContent: 'space-between', flexFlow: 'row wrap', alignItems: 'stretch' }}>
                    <View style={styles.column}>
                      <Text style={styles.tr}>DESIGNATION</Text>
                      <Text style={{ ...styles.line }}>AAAAAAAA</Text>
                    </View>
                    
                      <View style={styles.column}>
                        <Text style={styles.tr}>COEF</Text>
                        <Text style={{ ...styles.line }}>AAAAAAA</Text>
                      </View>
                      
                      <View style={styles.column}>
                        <Text style={styles.tr}> MED / SPEC </Text>
                        <Text style={{ ...styles.line }}>AAAAAAAA</Text>
                      </View>
                    
                    <View style={styles.column}>
                      <Text style={styles.tr}>DATE</Text>
                      <Text style={{ ...styles.line }}>AAAAAAAAAA</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>QT</Text>
                      <Text style={{ ...styles.line }}>AAAAAAAA</Text>
                    </View> 
                      <View style={styles.column}>
                        <Text style={styles.tr}>PU</Text>
                        <Text style={{ ...styles.line }}>AAAAAAAA</Text>
                      </View>
                      :
                      <View style={styles.column}>
                        <Text style={styles.tr}>TOTAL</Text>
                        <Text style={{ ...styles.line }}>1455555 FCA</Text>
                      </View>
                    <View style={styles.column}>
                      <Text style={styles.tr}>Part ASSU</Text>
                      <Text style={{ ...styles.line }}>1111115555</Text>
                      <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', marginTop: 5 }}>TOTAL</Text>
                    </View>
                   
                    <View style={styles.column}>
                      <Text style={styles.tr}>Part Patient</Text>
                      <Text style={{ ...styles.line }}>1111115555</Text>
                    </View>
                    
                    
              
                  </View>
                  <View>
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
    fontFamily: 'Roboto-Bold',
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

export default DownloadLink;