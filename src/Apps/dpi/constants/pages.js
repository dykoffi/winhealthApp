// TODO : Architecture et liste des pages utiisée dans l'application
import Soins from '../pages/soins/_index'
import Caisse from '../pages/medical/_index'
import Accueil from '../pages/Accueil'

//chargement des store de chaque application
import soinsStore from '../api/soins/store'
import medicalStore from '../api/caisse/store'



export const Pages = [
    //admission patients
    {
        title: "Soins",
        path: "/dpi/soins",
        Component: Soins,
        store: soinsStore
    },
    {
        title: "Medical",
        path: "/dpi/medical",
        Component: Caisse,
        store: medicalStore

    },
    {
        title: "Acceuil",
        path: "/dpi",
        Component: Accueil
    },

]