import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const deconnexionUser = () => {
    if (cookies.get("user") && cookies.get("currentPage")) {
        cookies.remove("user", { path: '/' })
        cookies.remove('currentPage', { path: '/' })
        window.location = "/connexion"
    }
}