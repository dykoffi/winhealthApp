//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../../global/context'
const functionP = "Admission"
const permissions = Info.permissions
const subfunctions = permissions.functions.filter(f => f.name === functionP).flatMap(f => f.subfunctions).map(f => f.target)
const Onglets = [
    { target: "listPatient", title: 'Liste des patients', icon: 'action-subject' },
    { target: "dossiersPatient", title: 'Dossiers Patients', icon: 'file-folder' }
]
const OngletsUser = subfunctions.length !== 0 ? Onglets.filter(o => subfunctions.includes(o.target)) : Onglets
export default OngletsUser