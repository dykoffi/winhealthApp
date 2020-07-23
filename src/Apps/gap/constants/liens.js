//Architecture et liste des fonctionnailités disponibles dans le Navbar
const props = {
    "nomapp": "GAP",
    "functions": [
        {
            "name": "Accueil",
            "subfunctions": []
        },
        {
            "name": "Admission",
            "subfunctions": []
        },
        {
            "name": "Caisse",
            "subfunctions": []
        },
        {
            "name": "Statistiques",
            "subfunctions": []
        },
        {
            "name": "Assurance",
            "subfunctions": [
                { target: "listeAssurances", title: "Listes des assurances", icon: 'action-assignment' },
                { target: "facturesRecues", title: "Factures recues", icon: 'file-file-download ' },
                { target: "facturesValides", title: "Factures valides", icon: 'action-done' },
                { target: "bordereaux", title: "Borderaux", icon: 'action-account-balance' },
            ]
        }
    ]
}

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
const functions = props.functions.map(f => f.name)

export const navMenuUser = navMenu.filter(menu => functions.includes(menu.title))
export default navMenu