//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../../global/context'
const functionP = "Caisse"
const permissions = Info.permissions
const subfunctions = permissions.functions.filter(f => f.name === functionP).flatMap(f => f.subfunctions).map(f => f.target)
const Onglets = [
    { target: "attenteFacture", title: "Factures en attente", icon: 'action-assignment' },
    { target: "patientFacture", title: "Factures par patient", icon: 'action-assignment-ind' },
    { target: "avoirFacture", title: "Factures d'avoir", icon: 'editor-wrap-text' },
    { target: "compte", title: "Compte", icon: 'action-account-balance' },
]
const OngletsUser = subfunctions.length !== 0 ? Onglets.filter(o => subfunctions.includes(o.target)) : Onglets
export default OngletsUser