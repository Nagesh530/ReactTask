import React from 'react';

type ThemeContextProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = React.createContext<ThemeContextProps>({
  darkMode: true,
  toggleDarkMode: () => {},
});

export const useThemeContext = () => React.useContext(ThemeContext);
