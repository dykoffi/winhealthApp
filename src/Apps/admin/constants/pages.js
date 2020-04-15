// TODO : Architecture et liste des pages utiisée dans l'application
import { lazy } from 'react'

//chargement des store de chaque application
import profilsStore from '../api/Profils/store'

//utilisation de l'import dynamique afin de charger les pages à la demande
const Accueil = lazy(() => import('../pages/Accueil'))
const Users = lazy(() => import('../pages/Users'))
const Services = lazy(() => import('../pages/Services'))
const Profils = lazy(() => import('../pages/Profils'))
const Logs = lazy(() => import('../pages/Logs'))




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
        Component: Logs
    }
]