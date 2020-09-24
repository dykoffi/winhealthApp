import { createContext } from "react";
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const user = cookies.get("user_winhealth", { path: "/" })
export const Info = {
    theme: {
        // primary: "#0a7ec2e5",
        // primaryLight: "#0a7fc2a6",
        primary: "#2e87a0f5",
        primaryLight: "#0a7fc2a6",
        secondary: "#97bf0f",
        secondaryDark: "#87ac0f"
    },
    user: user,
    permissions: user?.permissionsprofil ? JSON.parse(user.permissionsprofil) : null
}

const GlobalContext = createContext(Info);
export default GlobalContext
