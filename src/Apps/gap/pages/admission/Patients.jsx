import React, { useEffect } from "react";

import DetailsPatient from "../../containers/admission/DetailsPatients";
import ListPatient from "../../containers/admission/ListPatients";
import QR from "qrcode.react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  BlobProvider,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useState } from "react";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  view: {
    backgroundColor: "#ffffff",
  },
  image: {
    height: "2cm",
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

// Create Document Component
const MyDocument = () => {
  const [url, seturl] = useState(null);
  useEffect(() => {
    const canvas = document.getElementById("img");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    seturl(pngUrl);
  }, []);

  return (
    <>
      <QR includeMargin={true} id="img" value="edy koffi" />
      {url && (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
            <Image style={styles.image} src={url} />
          </Page>
        </Document>
      )}
    </>
  );
};
const Mydoc = () => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <Text style={styles.title}>Don Quijote de la Mancha</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      <Text style={styles.subtitle}>
        Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
        Quijote de la Mancha
      </Text>
      <Text style={styles.text}>
        Y era la verdad que por él caminaba; y añadió diciendo: —Dichosa edad y
        siglo dichoso aquel adonde saldrán a luz las famosas hazañas mías,
        dignas de entallarse en bronces, esculpirse en mármoles y pintarse en
        tablas, para memoria en lo futuro. ¡Oh tú, sabio encantador, quienquiera
        que seas, a quien ha de tocar el ser coronista desta peregrina historia!
        Ruégote que no te olvides de mi buen Rocinante, compañero eterno mío en
        todos mis caminos y carreras.
      </Text>  
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const ExamplePDFViewer = () => (
  <PDFDownloadLink document={<Mydoc />}>
    {({ blob, url, loading, error }) => (
      <div>{url && <a href={url} target="blank">telecharger</a>}</div>
    )}
  </PDFDownloadLink>
);

const Patients = () => {
  return (
    <div className="Patients row p-3">
      <section id="deatilsPatient" className="col-3">
        <ListPatient />
      </section>
      <section id="listPatient" className="col-4">
        <DetailsPatient />
      </section>
    </div>
  );
};

export default Patients;
