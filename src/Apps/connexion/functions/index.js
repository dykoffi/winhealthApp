import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const deconnexionUser = () => {
    if (cookies.get("user_winhealth") && cookies.get("currentPage")) {
        cookies.remove("user_winhealth", { path: '/' })
        cookies.remove('currentPage', { path: '/' })
        window.location = "/connexion"
    }
}