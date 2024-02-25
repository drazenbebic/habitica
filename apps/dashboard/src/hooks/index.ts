import { useEffect, useState } from 'react';

const useBrowserTheme = (): 'dark' | 'light' => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const handleThemeChange = () => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(prefersDarkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleThemeChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleThemeChange);
    };
  }, []);

  return theme;
};

export default useBrowserTheme;
