export function separate(chaine, indice, somme) {
	indice = indice === undefined ? 3 : indice
	somme = somme === undefined ? "" : somme
	if (chaine === undefined || chaine === null) return null
	try { chaine = chaine?.toString() } catch (error) { chaine = chaine }
	if (chaine.length <= indice) {
		return (chaine + somme)
	} else {
		somme = " " + chaine?.substring(chaine.length - indice, chaine.length) + somme
		chaine = chaine?.slice(0, chaine.length - indice)
		return separate(chaine, indice, somme)
	}
}
export const listpays = [
	"Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d Ivoire", "Croati", "Cuba", "Danemark", "Djibouti", "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée-Bissau", "Guyana", "Haïti", "Honduras", "Hongrie", "Îles Marshall", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg", "Macédoine", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice", "Mauritanie", " Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Calédoni", "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Polynésie français", "Portugal", "Qatar", "République centrafricaine", "République démocratique du Congo", "République dominicaine", "République du Congo", "République tchèque", "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Christophe-et-Niévès", "Saint-Marin", "Saint-Pierre-et-Miquelo", "Saint-Vincent-et-les Grenadines", "Sainte-Lucie", "Salomon", " Salvador", "Samoa", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Swaziland", "Syrie", "Tadjikistan", "Taïwa", "Tanzanie", "Tchad", "Thaïlande", "Timor oriental", "Togo", "Tomé-et-Principe", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu", "Venezuela", "Viêt Nam", "Wallis et Futun", "Yémen", "Zambie", "Zimbabwe"]

// JavaScript Document
/****************************************************************************
*________________________________________________________________________	*
*	About 		:	Convertit jusqu'à  999 999 999 999 999 (billion)		*
*					avec respect des accords								*
*_________________________________________________________________________	*			
*	Auteur  	:	GALA OUSSE Brice, Engineer programmer of management		*
*	Mail    	:	bricegala@yahoo.fr, bricegala@gmail.com					*
*	Tél	    	:	+237 99 37 95 83 / +237 79 99 82 80						*
*	Copyright 	:	avril  2007												*
*_________________________________________________________________________	*
*****************************************************************************
*/
function Unite(nombre) {
	var unite;
	switch (nombre) {
		case 0: unite = "zéro"; break;
		case 1: unite = "un"; break;
		case 2: unite = "deux"; break;
		case 3: unite = "trois"; break;
		case 4: unite = "quatre"; break;
		case 5: unite = "cinq"; break;
		case 6: unite = "six"; break;
		case 7: unite = "sept"; break;
		case 8: unite = "huit"; break;
		case 9: unite = "neuf"; break;
	}//fin switch
	return unite;
}//-----------------------------------------------------------------------

function Dizaine(nombre) {
	var dizaine;
	switch (nombre) {
		case 10: dizaine = "dix"; break;
		case 11: dizaine = "onze"; break;
		case 12: dizaine = "douze"; break;
		case 13: dizaine = "treize"; break;
		case 14: dizaine = "quatorze"; break;
		case 15: dizaine = "quinze"; break;
		case 16: dizaine = "seize"; break;
		case 17: dizaine = "dix-sept"; break;
		case 18: dizaine = "dix-huit"; break;
		case 19: dizaine = "dix-neuf"; break;
		case 20: dizaine = "vingt"; break;
		case 30: dizaine = "trente"; break;
		case 40: dizaine = "quarante"; break;
		case 50: dizaine = "cinquante"; break;
		case 60: dizaine = "soixante"; break;
		case 70: dizaine = "soixante-dix"; break;
		case 80: dizaine = "quatre-vingt"; break;
		case 90: dizaine = "quatre-vingt-dix"; break;
	}//fin switch
	return dizaine;
}//-----------------------------------------------------------------------

export function NumberToLetter(nombre) {
	var i, j, n, quotient, reste, nb;
	var ch
	var numberToLetter = '';
	//__________________________________

	if (nombre.toString().replace(/ /gi, "").length > 15) return "dépassement de capacité";
	if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

	nb = parseFloat(nombre.toString().replace(/ /gi, ""));
	if (Math.ceil(nb) != nb) return "Nombre avec virgule non géré.";

	n = nb.toString().length;
	switch (n) {
		case 1: numberToLetter = Unite(nb); break;
		case 2: if (nb > 19) {
			quotient = Math.floor(nb / 10);
			reste = nb % 10;
			if (nb < 71 || (nb > 79 && nb < 91)) {
				if (reste == 0) numberToLetter = Dizaine(quotient * 10);
				if (reste == 1) numberToLetter = Dizaine(quotient * 10) + "-et-" + Unite(reste);
				if (reste > 1) numberToLetter = Dizaine(quotient * 10) + "-" + Unite(reste);
			} else numberToLetter = Dizaine((quotient - 1) * 10) + "-" + Dizaine(10 + reste);
		} else numberToLetter = Dizaine(nb);
			break;
		case 3: quotient = Math.floor(nb / 100);
			reste = nb % 100;
			if (quotient == 1 && reste == 0) numberToLetter = "cent";
			if (quotient == 1 && reste != 0) numberToLetter = "cent" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = Unite(quotient) + " cents";
			if (quotient > 1 && reste != 0) numberToLetter = Unite(quotient) + " cent " + NumberToLetter(reste);
			break;
		case 4: quotient = Math.floor(nb / 1000);
			reste = nb - quotient * 1000;
			if (quotient == 1 && reste == 0) numberToLetter = "mille";
			if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " mille";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
			break;
		case 5: quotient = Math.floor(nb / 1000);
			reste = nb - quotient * 1000;
			if (quotient == 1 && reste == 0) numberToLetter = "mille";
			if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " mille";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
			break;
		case 6: quotient = Math.floor(nb / 1000);
			reste = nb - quotient * 1000;
			if (quotient == 1 && reste == 0) numberToLetter = "mille";
			if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " mille";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
			break;
		case 7: quotient = Math.floor(nb / 1000000);
			reste = nb % 1000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un million";
			if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " millions";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
			break;
		case 8: quotient = Math.floor(nb / 1000000);
			reste = nb % 1000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un million";
			if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " millions";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
			break;
		case 9: quotient = Math.floor(nb / 1000000);
			reste = nb % 1000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un million";
			if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " millions";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
			break;
		case 10: quotient = Math.floor(nb / 1000000000);
			reste = nb - quotient * 1000000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
			if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " milliards";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
			break;
		case 11: quotient = Math.floor(nb / 1000000000);
			reste = nb - quotient * 1000000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
			if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " milliards";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
			break;
		case 12: quotient = Math.floor(nb / 1000000000);
			reste = nb - quotient * 1000000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
			if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " milliards";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
			break;
		case 13: quotient = Math.floor(nb / 1000000000000);
			reste = nb - quotient * 1000000000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un billion";
			if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " billions";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
			break;
		case 14: quotient = Math.floor(nb / 1000000000000);
			reste = nb - quotient * 1000000000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un billion";
			if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " billions";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
			break;
		case 15: quotient = Math.floor(nb / 1000000000000);
			reste = nb - quotient * 1000000000000;
			if (quotient == 1 && reste == 0) numberToLetter = "un billion";
			if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + NumberToLetter(reste);
			if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " billions";
			if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
			break;
	}//fin switch
	/*respect de l'accord de quatre-vingt*/
	if (numberToLetter.substr(numberToLetter.length - "quatre-vingt".length, "quatre-vingt".length) == "quatre-vingt") numberToLetter = numberToLetter + "s";

	return numberToLetter;
}//-----------------------------------------------------------------------