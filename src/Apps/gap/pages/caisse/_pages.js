import Compte from './Compte'
import AttenteFacture from './AttenteFacture'
import PatientFacture from './PatientFacture'

const Pages = [
    { id:"compte", Component: Compte },
    { id:"attenteFacture", Component: AttenteFacture },
    { id:"patientFacture", Component: PatientFacture },
]
export default Pages