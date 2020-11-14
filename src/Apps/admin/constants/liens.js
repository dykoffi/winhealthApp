//Architecture et liste des fonctionnailités disponibles dans le Navbar
import { Info } from '../../global/context'
// const app = "DPI"
const permissions = Info.permissions
const navMenu = [
    {
        title: 'Accueil',
        icon: 'action-home',
        path: '/admin'
    },
    {
        title: 'Utilisateur',
        icon: 'social-group',
        path: '/admin/users'
    },
    {
        title: 'Statistiques',
        icon: 'action-assessment',
        path: "/gap/statistiques"
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