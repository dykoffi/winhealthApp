// TODO : Architecture et liste des pages utiisée dans l'application
import Admission from '../pages/utilisateur/_index'
import Accueil from '../pages/Accueil'
import Statistiques from '../pages/statistiques/_index'


//chargement des store de chaque application
import admissionStore from '../api/utilisateur/store'
import statistiquesStore from '../api/statistiques/store'

export const Pages = [
    //admission patients
    {
        title: "Admission",
        path: "/admin/users",
        Component: Admission,
        store: admissionStore
    },
    {
        title: "Statistques",
        path: "/admin/statistiques",
        Component: Statistiques,
        store: statistiquesStore
    },
    {
        title: "Acceuil",
        path: "/admin",
        Component: Accueil
    },

]