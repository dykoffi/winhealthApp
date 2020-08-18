import React from "react";
import logo from "../../../static/images/logoms2.jpg";
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
import { Info } from "../../global/context";
import { NumberToLetter } from "../../global/functions";

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
      padding: 10
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



const Facture = ({ bordereau, cie }) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 0, display: "flex", flexDirection: "column", }}>
        <DocHead />
        <View style={{ flex: "10", display: "flex", fontSize: 12, }}>
          <Text style={{ ...styles.title, backgroundColor: "white", textAlign: "center", marginBottom: 10, marginTop: 10, fontSize: 17 }}>
            Bordereau de factures N° {bordereau[0].numerobordereau}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ ...styles.content, justifyContent: 'flex-start' }}>
              <View style={{ ...styles.l, fontSize: 9 }}><Text style={{ fontFamily: 'Roboto-Bold' }}>{bordereau[0].gestionnairebordereau}</Text><Text> / {bordereau[0].organismebordereau}</Text></View>
              <View style={{ ...styles.l, fontSize: 8 }}><Text style={{ fontFamily: 'Roboto-Bold' }}>{bordereau.length} facture(s)</Text></View>
            </View>
            <View style={styles.content}>
              <View style={{ ...styles.l, fontSize: 9 }}><Text>Date : {bordereau[0].datecreationbordereau}</Text></View>
              <View style={{ ...styles.l, fontSize: 9 }}><Text>Heure : {bordereau[0].heurecreationbordereau}</Text></View>
              <View style={{ ...styles.l, fontSize: 8 }}><Text style={{ fontFamily: 'Roboto-Bold' }}>{bordereau[0].typesejourbordereau}</Text></View>
            </View>
          </View>
          <View style={{ ...styles.content, fontSize: 9 }}>
            <Text>
              Veuillez trouver en annexe les factures mentionnées ci-dessous dont le règlement devra nous parvenir, avec votre amabilité.
              Rappelez s'il vous plaît la référence du relevé au règlement.
                </Text>
          </View>
          <View style={{ display: "flex", flex: 1, flexDirection: "column", }}>
            <View style={{ ...styles.content, flex: 1, display: 'flex', flexDirection: 'column', }}>
              <View style={{ ...styles.l, justifyContent: 'space-between', flexFlow: 'row wrap', alignItems: 'stretch' }}>
                <View style={styles.column}>
                  <Text style={styles.tr}>Date</Text>
                  {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.datefacture}</Text>)}
                </View>
                {cie ?
                  <View style={styles.column}>
                    <Text style={styles.tr}>Nom et prenom de l'agent</Text>
                    {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.assureprinc}</Text>)}
                  </View>
                  :
                  <View style={styles.column}>
                    <Text style={styles.tr}>Nom et prénom du patient</Text>
                    {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.nompatient} {bordereau.prenomspatient}</Text>)}
                  </View>
                }
                <View style={styles.column}>
                  <Text style={styles.tr}>N° Facture</Text>
                  {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.numerofacture}</Text>)}
                </View>
                <View style={styles.column}>
                  <Text style={styles.tr}>N° BON</Text>
                  {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.numeropec}</Text>)}
                </View>
                {cie ?
                  <View style={styles.column}>
                    <Text style={styles.tr}>Nom et prénom du patient</Text>
                    {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.nompatient} {bordereau.prenomspatient}</Text>)}
                  </View>
                  :
                  <View style={styles.column}>
                    <Text style={styles.tr}>Nom et prenom du medecin</Text>
                    {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.medecinsejour}</Text>)}
                  </View>
                }
                <View style={styles.column}>
                  <Text style={styles.tr}>Matricule</Text>
                  {bordereau.map(bordereau => <Text style={{ ...styles.line }}>{bordereau.matriculeassure}</Text>)}
                  <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', marginTop: 5 }}>TOTAL</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.tr}>Montant facturé</Text>
                  {bordereau.map(bordereau => <Text style={{ ...styles.line, }}>{bordereau.montanttotalfacture}</Text>)}
                  <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', marginTop: 5 }}>{bordereau.map(bordereau => bordereau.montanttotalfacture).reduce((acc, curv) => acc + curv)}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.tr}>Part Patient</Text>
                  {bordereau.map(bordereau => <Text style={{ ...styles.line, }}>{bordereau.partpatientfacture}</Text>)}
                  <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', marginTop: 5 }}>{bordereau.map(bordereau => bordereau.partpatientfacture).reduce((acc, curv) => acc + curv)}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.tr}>Net à payer</Text>
                  {bordereau.map(bordereau => <Text style={{ ...styles.line, }}>{bordereau.partassurancefacture}</Text>)}
                  <Text style={{ ...styles.line, fontFamily: 'Roboto-Bold', marginTop: 5 }}>{bordereau.map(bordereau => bordereau.partassurancefacture).reduce((acc, curv) => acc + curv)}</Text>
                </View>
              </View>
              <View>
              <Text style={{ fontSize: 8 }}>Certifié exact, la présente facture s'élévant à la somme de {NumberToLetter(bordereau[0].montanttotalfacture)} francs CFA</Text>
              </View>
            </View>
          </View>
        </View>
        <DocFoot bordereau={bordereau} />
      </Page>
    </Document>
  );
};
const DocFoot = ({ bordereau }) => (
  <View style={{ flex: "auto", display: "flex", flexDirection: "row", alignItems: "center", padding: 10 }}>
    <View style={{ flex: 1, justifyContent: 'flex-start', fontSize: 8, marginTop: 7, color: "grey", lineHeight: 1.5, }}>
      <Text>Fait à Abidjan le {bordereau[0].datecreationbordereau}</Text>
      <Text>par {bordereau[0].auteurbordereau}</Text>
    </View>
  </View>
);

const DownloadLink = ({
  bordereau,
  showPDF,
  cie
}) => {
  return (
    <div className="row">

      <BlobProvider document={<Facture bordereau={bordereau} cie={cie} />}>
        {({ blob, url, loading, error }) =>
          loading ? (
            <small>...</small>
          ) : (
              <div className="pr-3">
                <Button
                  variant="contained"
                  className="mb-2 white-text mx-2 col"
                  startIcon={<PrintIcon />}
                  onClick={() => showPDF(url)}
                  style={{
                    textTransform: "none",
                    fontSize: "13px",
                    backgroundColor: Info.theme.primary
                  }}
                >Imprimer le bordereau {cie && "(CIE)"}</Button>
              </div>
            )
        }
      </BlobProvider>
    </div >
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
