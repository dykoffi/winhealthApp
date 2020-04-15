import React from 'react'

export const themes = {
    light:  "bg-light",
    purple: "purple",
    green: "green",
    blue: "blue",
    orange: "orange",
    red: "red",
    dark: "bg-dark"
};

export const ThemeContext = React.createContext(themes.red);