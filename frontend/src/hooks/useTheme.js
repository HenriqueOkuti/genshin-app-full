import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme.userTheme;
}

export function useSetTheme() {
  const setTheme = useContext(ThemeContext);
  return setTheme.setUserTheme;
}
