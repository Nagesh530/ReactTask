import  { useState } from 'react';
import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext } from "./ThemeContext";

type AppThemeProps = {
  children: ReactNode;
};

export default function AppTheme({ children }: AppThemeProps) {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
           
        },
       
    });
    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };
    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
