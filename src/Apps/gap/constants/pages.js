// TODO : Architecture et liste des pages utiisée dans l'application
import Admission from '../pages/admission/_index'
import Caisse from '../pages/caisse/_index'
import Assurance from '../pages/assurance/_index'
import Accueil from '../pages/Accueil'

//chargement des store de chaque application
import admissionStore from '../api/admission/store'
import caisseStore from '../api/caisse/store'
import assuranceStore from '../api/assurance/store'



export const Pages = [
    //admission patients
   {
        title: "Admission",
        path: "/gap/admission",
        Component: Admission,
        store : admissionStore
    }, 
    {
        title: "Caisse",
        path: "/gap/caisse",
        Component: Caisse,
        store : caisseStore
    }, 
    {
        title: "Assurance",
        path: "/gap/assurance",
        Component: Assurance,
        store : assuranceStore
    }, 
    {
        title: "Acceuil",
        path: "/gap",
        Component: Accueil
    },
    
]