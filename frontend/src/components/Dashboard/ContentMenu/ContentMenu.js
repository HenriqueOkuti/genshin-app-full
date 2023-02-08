import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { MenuBackground } from './ContentMenuStyles';

export function ContentMenu({ update, setUpdate, children }) {
  const userTheme = useTheme();
  const [theme, setTheme] = useState(userTheme);

  useEffect(() => {
    setTheme(userTheme);
  }, [update]);

  return (
    <>
      <MenuBackground colors={theme.palette}>{children}</MenuBackground>
    </>
  );
}
