//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../../global/context'
const functionP = "Assurance"
const permissions = Info.permissions
const subfunctions = permissions.functions.filter(f => f.name === functionP).flatMap(f => f.subfunctions).map(f => f.target)
const Onglets = [
    { target: "listeAssurances", title: "Listes des assurances", icon: 'action-assignment' },
    { target: "facturesRecues", title: "Factures reçues", icon: 'file-file-download ' },
    { target: "facturesValides", title: "Factures valides", icon: 'action-done' },
    { target: "bordereaux", title: "Bordereaux", icon: 'action-account-balance' },
]
const OngletsUser = subfunctions.length !== 0 ? Onglets.filter(o => subfunctions.includes(o.target)) : Onglets
export default OngletsUser