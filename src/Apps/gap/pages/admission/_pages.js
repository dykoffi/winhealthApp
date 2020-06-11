import Dossiers from './Dossiers'
import Patients from './Patients'
import AddPatient from './AddPatient'

const Pages = [
    { id:"listPatient", Component: Patients },
    { id:"addPatient", Component: AddPatient },
    { id:"dossiersPatient", Component: Dossiers }
]
export default Pages