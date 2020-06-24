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

Font.register({
  family: "Roboto-Bold",
  src: `${header.local}/fonts/Roboto-Bold.ttf`,
});

Font.register({
  family: "Roboto-Light",
  src: `${header.local}/fonts/Roboto-Light.ttf`,
});

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
      <Text
        style={{
          fontSize: 18,
          fontFamily: "Roboto-Bold",
        }}
      >
        POLYCLINIQUE ALTEA
      </Text>
      <View style={{ fontSize: 9, color: "grey", lineHeight: 1.5 }}>
        <Text>
          Cocody Angre 7ème tranche près de la grande boulangerie des carnes de
          sucres fondues
        </Text>
        <Text>Abidjan BP 05 789</Text>
        <Text>Tel : 21 58 96 35 / 58 96 32 15</Text>
        <Text>Fax : 21 58 62 57</Text>
        <Text>Email : info@altea-ci.com</Text>
        <Text>Site web : www.altea.ci</Text>
      </View>
    </View>
  </View>
);

const DocFoot = ({ url }) => (
  <View
    style={{
      flex: "auto",
      display: "flex",
      flexDirection: "row",
      fontFamily: "Regular",
    }}
  >
    <View
      style={{
        flex: "auto",
      }}
    >
      <Image src={url} style={{ height: "2.5cm", width: "2.5cm" }} />
    </View>
    <View
      style={{
        flex: "auto",
        fontSize: 9,
        paddingLeft: 15,
        color: "grey",
        lineHeight: 1.5,
        borderLeftWidth: 5,
        borderLeftColor: "#c9c9c9",
        borderLeftStyle: "solid",
      }}
    >
      <Text>Fait à Abidjan le 25 juin 2019</Text>
      <Text>par Audrey Bogui</Text>
      <Text>Email : info@altea-ci.com</Text>
      <Text>Site web : www.altea.ci</Text>
    </View>
  </View>
);

const DownloadLink = ({
  //patient
  nompatient,
  prenomspatient,
  datenaissancepatient,
  ipppatient,
  lieunaissancepatient,
  habitationpatient,
  code,
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
  //acte
  libelleacte,
  prixacte,
}) => {
  const [url, seturl] = useState(null);
  const io = socket.connect('https://localhost:8000')
  useEffect(() => {
    const canvas = document.getElementById("img");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    seturl(pngUrl);
  }, []);
  return (
    <div className="row">
      <QR
        value={code}
        id="img"
        fgColor="#696969"
        includeMargin={true}
        style={{ display: "none" }}
      />
      {url && (
        <PDFDownloadLink
          document={
            <Facture
              url={url}
              nompatient={nompatient}
              prenomspatient={prenomspatient}
              datenaissancepatient={datenaissancepatient}
              ipppatient={ipppatient}
              lieunaissancepatient={lieunaissancepatient}
              habitationpatient={habitationpatient}
              numerofacture={numerofacture}
              datefacture={datefacture}
              heurefacture={heurefacture}
              auteurfacture={auteurfacture}
              datedebutsejour={datedebutsejour}
              datefinsejour={datefinsejour}
              heuredebutsejour={heuredebutsejour}
              heurefinsejour={heurefinsejour}
              typesejour={typesejour}
              libelleacte={libelleacte}
              prixacte={prixacte}
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
  //acte
  libelleacte,
  prixacte,
}) => {
  return (
    <>
      {url && (
        <Document>
          <Page
            size="A4"
            style={{
              padding: 30,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DocHead />
            <View
              style={{
                flex: 10,
                display: "flex",
                fontSize: 12,
              }}
            >
              <Text style={styles.title}>PATIENT(E)</Text>
              <View style={styles.content}>
                <View style={styles.l}>
                  <Text style={styles.g}>IPP : </Text>
                  <Text>{ipppatient}</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>NOM : </Text>
                  <Text>
                    {nompatient} {prenomspatient}
                  </Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>NAISSANCE :  </Text>
                  <Text>
                    {datenaissancepatient} à {lieunaissancepatient}
                  </Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>DOMICILE : </Text>
                  <Text>{habitationpatient}</Text>
                </View>
              </View>

              <Text style={styles.title}>
                SEJOUR DU
                {datedebutsejour === datefinsejour ? (
                  <> {datedebutsejour}</>
                ) : (
                    <>
                      {datedebutsejour} AU {datefinsejour}
                    </>
                  )}
              </Text>
              <View style={styles.content}>
                <View style={styles.l}>
                  <Text style={styles.g}>ENTRÉ(E) À :  </Text>
                  <Text>{heuredebutsejour}</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>SORTI(E) À :  </Text>
                  <Text>{heurefinsejour}</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>TYPE DE SEJOUR : </Text>
                  <Text>{typesejour}</Text>
                </View>
              </View>
              <Text
                style={{
                  ...styles.title,
                  backgroundColor: "white",
                  textAlign: "center",
                  borderLeft: "none",
                  marginBottom: 10,
                }}
              >
                FACTURE N° {numerofacture} DU {datefacture}
              </Text>
              <View
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <View style={{ ...styles.content, flex: 1 }}>
                  <View style={styles.l}>
                    <Text style={styles.g}>{libelleacte}</Text>
                    <Text>{prixacte} FCFA</Text>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.l,
                    fontSize: 17,
                    marginBottom: 25,
                    backgroundColor: "#fafafa",
                    padding: 15,
                  }}
                >
                  <Text style={styles.g}>TOTAL </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {prixacte} FCFA
                  </Text>
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
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Regular",
    padding: 5,
    paddingLeft: 15,
    marginTop: 10,
    backgroundColor: "#fafafa",
    borderLeftWidth: 5,
    borderLeftColor: "#c9c9c9",
    borderLeftStyle: "solid",
  },
  l: {
    display: "flex",
    flexDirection: "row",
    flex: 1
  },
  g: {
    fontFamily: "Roboto-Bold",
    color: "grey",
  },
  content: {
    fontFamily: "Roboto-Light",
    fontWeight: "normal",
    lineHeight: 1.6,
    padding: 10,
    fontSize: 11,
  },
});

export default DownloadLink;
