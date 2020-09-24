import Compte from './Compte'
import AttenteFacture from './AttenteFacture'
import PatientFacture from './PatientFacture'
import AvoirFacture from './AvoirFacture'

const Pages = [
    { id: "compte", Component: Compte },
    { id: "attenteFacture", Component: AttenteFacture },
    { id: "avoirFacture", Component: AvoirFacture },
    { id: "patientFacture", Component: PatientFacture },
]
export default Pages