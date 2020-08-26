//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../../global/context'
const functionP = "Encaissement"
const permissions = Info.permissions
const subfunctions = permissions.functions.filter(f => f.name === functionP).flatMap(f => f.subfunctions).map(f => f.target)
const Onglets = [
    { target: "encaissement", title: "Encaissement Mutuelles", icon: 'action-assignment' },
]
const OngletsUser = subfunctions.length !== 0 ? Onglets.filter(o => subfunctions.includes(o.target)) : Onglets
export default Onglets