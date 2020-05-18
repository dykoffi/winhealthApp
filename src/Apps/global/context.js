import { createContext } from "react";

export const Theme = {
    default : {
        primary : "#0a7ec2e5",
        secondary : "#97bf0f",
        secondaryDark : "#87ac0f"
    }
}

const ThemeContext = createContext(Theme.default);

export default ThemeContext