import { createContext } from "react";
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const Info = {
    theme: {
        primary: "#0a7ec2e5",
        secondary: "#97bf0f",
        secondaryDark: "#87ac0f"
    },
    user: cookies.get("user", { path: "/" })
}

const GlobalContext = createContext(Info);
export default GlobalContext