// TODO : Architecture et liste des pages utiisée dans l'application
import Admission from '../pages/admission/_index'
import Caisse from '../pages/caisse/_index'
import Assurance from '../pages/assurance/_index'
import Accueil from '../pages/Accueil'
import Statistiques from '../pages/statistiques/_index'
import Encaissement from '../pages/encaissement/_index'
import Administration from '../pages/administration/_index'

//chargement des store de chaque application
import admissionStore from '../api/admission/store'
import caisseStore from '../api/caisse/store'
import assuranceStore from '../api/assurance/store'
import statistiquesStore from '../api/statistiques/store'
import encaissementStore from '../api/encaissement/store'
import administrationStore from '../api/administration/store'



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
        title: "Encaissement",
        path: "/gap/encaissement_mutuelles",
        Component: Encaissement,
        store: encaissementStore
    },
    {
        title: "Administration",
        path: "/gap/administration",
        Component: Administration,
        store: administrationStore
    },
    {
        title: "Acceuil",
        path: "/gap",
        Component: Accueil
    },

]