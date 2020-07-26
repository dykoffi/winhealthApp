//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../global/context'
const app = "GAP"
const permissions = Info.permissions
const navMenu = [
    {
        title: 'Accueil',
        icon: 'action-home',
        path: '/gap'
    },
    {
        title: 'Admission',
        icon: 'av-recent-actors',
        path: '/gap/admission'
    },
    {
        title: 'Caisse',
        icon: 'editor-attach-money',
        path: "/gap/caisse"
    },
    {
        title: 'Assurance',
        icon: 'action-account-child',
        path: "/gap/assurance"
    },
    // {
    //     title: 'Ventilation Assurance',
    //     icon: 'action-assignment-returned',
    //     path: "/gap/stats"
    // },
    {
        title: 'Statistiques',
        icon: 'action-assessment',
        path: "/gap/statistiques"
    },
    // {
    //     title: 'Parametres',
    //     icon: 'action-settings',
    //     path: "/gap/settings"
    // },
    // {
    //     title: 'Info',
    //     icon: 'action-info-outline',
    //     path: "/gap/settings"
    // }
]
const functions = permissions.functions.map(f => f.name)
export const navMenuUser = navMenu.filter(menu => functions.includes(menu.title))
export default navMenuUser