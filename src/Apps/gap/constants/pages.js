// TODO : Architecture et liste des pages utiisée dans l'application
import Admission from '../pages/admission/_index'
import Caisse from '../pages/caisse/_index'
import Assurance from '../pages/assurance/_index'
import Accueil from '../pages/Accueil'
import Statistiques from '../pages/statistiques/_index'

//chargement des store de chaque application
import admissionStore from '../api/admission/store'
import caisseStore from '../api/caisse/store'
import assuranceStore from '../api/assurance/store'
import statistiquesStore from '../api/statistiques/store'



export const Pages = [
    //admission patients
    {
        title: "Admission",
        path: "/gap/admission",
        Component: Admission,
        store: admissionStore
    },
    {
        title: "Caisse",
        path: "/gap/caisse",
        Component: Caisse,
        store: caisseStore
    },
    {
        title: "Assurance",
        path: "/gap/assurance",
        Component: Assurance,
        store: assuranceStore
    },
    {
        title: "Statistques",
        path: "/gap/statistiques",
        Component: Statistiques,
        store: statistiquesStore
    },
    {
        title: "Acceuil",
        path: "/gap",
        Component: Accueil
    },

]