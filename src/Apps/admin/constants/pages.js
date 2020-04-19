// TODO : Architecture et liste des pages utiisée dans l'application

//chargement des store de chaque application
import profilsStore from '../api/Profils/store'
import logsStore from '../api/Logs/store'

import Accueil from '../pages/Accueil'
import Users from '../pages/Users'
import Services from '../pages/Services'
import Profils from '../pages/Profils'
import Logs from '../pages/Logs'

export const Pages = [
    {
        title: "Accueil",
        desc: "dashboard general de l'admin",
        path: "/admin",
        Component: Accueil
    },
    {
        title: "User",
        desc: "dashboard general de l'admin",
        path: "/admin/users",
        Component: Users
    },
    {
        title: "Services",
        desc: "dashboard general de l'admin",
        path: "/admin/services",
        Component: Services
    },
    {
        title: "Profils",
        desc: "dashboard general de l'admin",
        path: "/admin/profils",
        Component: Profils,
        store : profilsStore
    },
    {
        title: "Logs",
        desc: "dashboard general de l'admin",
        path: "/admin/logs",
        Component: Logs,
        store : logsStore

    }
]