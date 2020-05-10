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
Font.register({
  family: "Rond",
  src: "http://192.168.43.84:3000/fonts/f1.otf",
});
Font.register({ family: "Regular", src: "http://192.168.43.84:3000/font.ttf" });
Font.register({
  family: "Roboto-Black",
  src: "http://192.168.43.84:3000/fonts/Roboto-Black.ttf",
});
Font.register({
  family: "Roboto-Bold",
  src: "http://192.168.43.84:3000/fonts/Roboto-Bold.ttf",
});
Font.register({
  family: "Roboto-Thin",
  src: "http://192.168.43.84:3000/fonts/Roboto-Thin.ttf",
});
Font.register({
  family: "Roboto-Light",
  src: "http://192.168.43.84:3000/fonts/Roboto-Light.ttf",
});
Font.register({
  family: "Roboto-Regular",
  src: "http://192.168.43.84:3000/fonts/Roboto-Regular.ttf",
});

const DocHead = () => (
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
          fontSize: 16,
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
      <Text>Tel : 21 58 96 35 / 58 96 32 15</Text>
      <Text>Fax : 21 58 62 57</Text>
      <Text>Email : info@altea-ci.com</Text>
      <Text>Site web : www.altea.ci</Text>
    </View>
  </View>
);

const DownloadLink = () => {
  const [url, seturl] = useState(null);
  useEffect(() => {
    const canvas = document.getElementById("img");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    seturl(pngUrl);
  }, []);
  return (
    <div>
      <QR
        value="edy koffi"
        id="img"
        fgColor="#696969"
        includeMargin={true}
        style={{ display: "none" }}
      />
      {url && (
        <PDFDownloadLink
          document={<Facture url={url} />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <a href={url} target="blank">
                telecharger le document
              </a>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

const Facture = ({ patient, etablissement, url }) => {
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
                  <Text style={styles.g}>IPP</Text>
                  <Text>FAR-5659F5</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>NOM </Text>
                  <Text>KOFFI kouassi Edy</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>NAISSANCE </Text>
                  <Text>05 juin à Koumassi</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>DOMICILE </Text>
                  <Text>Bouaké</Text>
                </View>
              </View>

              <Text style={styles.title}>SEJOUR DU 30 MARS 2015</Text>
              <View style={styles.content}>
                <View style={styles.l}>
                  <Text style={styles.g}>ENTRÉ(E) À </Text>
                  <Text>16h05</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>SORTI(E) À </Text>
                  <Text>16h30</Text>
                </View>
                <View style={styles.l}>
                  <Text style={styles.g}>MOTIF </Text>
                  <Text>Soins</Text>
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
                FACTURE N° 2055632 DU 25 MAI
              </Text>
              <View
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <View style={{ ...styles.content, flex: 1 }}>
                  <View style={styles.l}>
                    <Text style={styles.g}>Consultation Gyneco </Text>
                    <Text>15 700 FCFA</Text>
                  </View>
                  <View style={styles.l}>
                    <Text style={styles.g}>Pansement complet </Text>
                    <Text>7500 FCFA</Text>
                  </View>
                  <View style={styles.l}>
                    <Text style={styles.g}>Lavage d'oreilles </Text>
                    <Text>12 000 FCFA</Text>
                  </View>
                  <View style={styles.l}>
                    <Text style={styles.g}>Injection de vitamines </Text>
                    <Text>4 000 FCFA</Text>
                  </View>
                  <View style={styles.l}>
                    <Text style={styles.g}>Scanner cranien </Text>
                    <Text>42 000 FCFA</Text>
                  </View>
                  <View style={styles.l}>
                    <Text style={styles.g}>Operation frontale </Text>
                    <Text>122 000 FCFA</Text>
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
                    422 000 FCFA
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
  },
  g: {
    fontFamily: "Roboto-Bold",
    flex: 1,
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
