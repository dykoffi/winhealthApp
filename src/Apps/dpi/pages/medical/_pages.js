import Consultations from './Consultations'
import Antecedants from './Antecedants'
import Constantes from './Constantes'
import listAttente from './listAttente'

const Pages = [
    { id:"listAttente", Component: listAttente },
    { id:"constantePatient", Component: Constantes },
    { id:"antecedantPatient", Component: Antecedants },
    { id:"consultationPatient", Component: Consultations },
]
export default Pages