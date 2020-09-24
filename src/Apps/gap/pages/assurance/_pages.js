import listeAssurances from './listeAssurances'
import Bordereaux from './bordereaux'
import FacturesRecues from './facturesRecues'
import FacturesValides from './facturesValides'
const Pages = [
    { id: "listeAssurances", Component: listeAssurances },
    { id: "bordereaux", Component: Bordereaux },
    { id: "facturesRecues", Component: FacturesRecues },
    { id: "facturesValides", Component: FacturesValides },
]
export default Pages