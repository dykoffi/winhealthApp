// TODO : Architecture et liste des pages utiisée dans l'application

//chargement des store de chaque application
import Accueil from '../pages/admission/Accueil'
import Dossiers from '../pages/admission/Dossiers'
import Patients from '../pages/admission/Patients'
import Statistiques from '../pages/admission/Statistiques'


export const Pages = [
    //admission patients
    {
        title: "Accueil",
        desc: "",
        path: "/gap",
        Component: Accueil
    },
    {
        title: "Patients",
        desc: "",
        path: "/gap/admission/patients",
        Component: Patients
    },
    {
        title: "Dossiers",
        desc: "",
        path: "/gap/admission/dossiers",
        Component: Dossiers
    },
    {
        title: "Statistiques",
        desc: "",
        path: "/gap/admission/stats",
        Component: Statistiques
    }
]