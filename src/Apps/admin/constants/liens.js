//Architecture et liste des fonctionnailités disponibles dans le Navbar

export const navMenu = [
    {
        title: 'Administration',
        icon: 'action-dashboard',
        desc: "Toutes les taches de l'administrateur",
        links: [
            { id: 1, label: 'Accueil', path: '/admin' },
            { id: 1, label: 'Utilisateurs', path: '/admin/users' },
            { id: 2, label: 'Services', path: '/admin/services' },
            { id: 3, label: 'Profils', path: '/admin/profils' },
            { id: 4, label: 'Logs', path: '/admin/logs' },
        ]
    }
]