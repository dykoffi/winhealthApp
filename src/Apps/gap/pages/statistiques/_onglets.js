//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../../global/context'
const functionP = "Statistique"
const permissions = Info.permissions
const subfunctions = permissions.functions.filter(f => f.name === functionP).flatMap(f => f.subfunctions).map(f => f.target)
const Onglets = [
    // { target: "patients", title: "Patients", icon: 'action-assignment' },
    // { target: "sejours", title: "Sejours", icon: 'action-assignment-ind' },
    // { target: "factures", title: "Factures", icon: 'action-assignment-ind' },
    // { target: "assurances", title: "Assurances", icon: 'action-assignment-ind' },
    { target: "bordereaux", title: "Bordereaux", icon: 'action-assignment-ind' },
]
const OngletsUser = subfunctions.length !== 0 ? Onglets.filter(o => subfunctions.includes(o.target)) : Onglets
export default OngletsUser