//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../global/context'
// const app = "GAP"
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
    {
        title: 'Statistiques',
        icon: 'action-assessment',
        path: "/gap/statistiques"
    },
    {
        title: 'Encaissement',
        icon: 'content-mail',
        path: "/gap/encaissement_mutuelles"
    },
    {
        title: 'Administration GAP',
        icon: 'hardware-security',
        path: "/gap/administration"
    },
    // {
    //     title: 'Paramètres',
    //     icon: 'action-settings',
    //     path: "/gap/settings"
    // },
    // {
    //     title: 'Info',
    //     icon: 'action-info-outline',
    //     path: "/gap/info"
    // }
]
const functions = permissions.functions.map(f => f.name)
export const navMenuUser = navMenu.filter(menu => functions.includes(menu.title))
export default navMenu
//export default navMenu