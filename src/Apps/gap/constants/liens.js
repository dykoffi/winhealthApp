//Architecture et liste des fonctionnailités disponibles dans le Navbar
export const navMenu = [
    {
        title: 'Admission',
        icon: 'action-dashboard',
        desc: "Toutes les actions à faire sur le patient",
        links: [
            { id: 1, label: 'Accueil', path: '/gap' },
            { id: 1, label: 'Patients', path: '/gap/admission/patients' },
            { id: 2, label: 'Dossiers patients', path: '/gap/admission/dossiers' },
            { id: 3, label: 'Statistiques patients', path: '/gap/admission/stats' },
        ]
    },
    {
        title: 'Caisse',
        icon: 'editor-attach-money',
        desc: "Toutes les actions de caisse",
        links: [
            { id: 1, label: 'Accueil Caisse', path: '/gap/caisse/accueil' },
            { id: 2, label: 'Encaissement', path: '/gap/caisse/encaissement' },
            { id: 3, label: 'Ventilation', path: '/gap/caisse/ventilation' },
            { id: 4, label: 'Statistiques Compta', path: '/gap/caisse/stats' },
        ]
    },
    {
        title: 'Parametres',
        icon: 'action-settings',
        desc: "Toutes les reglages disponibles dans le GAP",
        links: [
            { id: 1, label: 'Accueil parametres', path: '/gap/settings/accueil' },
            { id: 2, label: 'Security', path: '/gap/settings/security' },
            { id: 3, label: 'Mes infos', path: '/gap/settings/infos' },
            { id: 4, label: 'Aide', path: '/gap/settings/aide' },
        ]
    }
]