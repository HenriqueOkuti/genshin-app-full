import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();
export default ThemeContext;

export function ThemeProvider({ children }) {
  const [themeData, setThemeData] = useLocalStorage('theme', {});
  return <ThemeContext.Provider value={{ themeData, setThemeData }}>{children}</ThemeContext.Provider>;
}
