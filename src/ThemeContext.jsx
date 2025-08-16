import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const currentMode = localStorage.getItem("mode")
        if (currentMode !== null) {
            setDarkMode(currentMode === 'true')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("mode", darkMode.toString())
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}