import React, { useState, useEffect } from "react";
import logo from "../../../static/images/logoms2.jpg";
import { Info } from "../../global/context";
import moment from 'moment'
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
import { NumberToLetter, separate } from "../../global/functions";

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
            <View style={{ flex: "10", display: "flex", fontSize: 12, }}>
              <Text style={{ ...styles.title, backgroundColor: "white", textAlign: "center", marginBottom: 10, marginTop: 10, fontSize: 14 }}>
                RECU DE PAIEMENT N° {facture[0].numerofacture} DU {facture[0].datefacture}
              </Text>
              <View style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <Text>
                  Nous reconnaissons avoir réçu la somme de dix huit mille (18000) Francs CFA pour le règlement du sejour s N° 2020362 du patient KOFFI KOUASSI               </Text>
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

  </View>
);

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
