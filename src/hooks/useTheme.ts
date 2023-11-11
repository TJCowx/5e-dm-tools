// THEME: https://m2.material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=00ACC1&secondary.color=C11700

import { createTheme, PaletteMode, useMediaQuery } from '@mui/material';
import { cyan, grey } from '@mui/material/colors';
import { useEffect, useMemo, useState } from 'react';

const getPalette = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...cyan,
      ...(mode === 'dark' && {
        main: cyan[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: '#282c34',
        paper: '#2c313c',
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: '#fff',
          }),
    },
  },
});

export default function useTheme() {
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<PaletteMode>(
    preferDarkMode ? 'dark' : 'light'
  );

  useEffect(() => {
    setMode(preferDarkMode ? 'dark' : 'light');
  }, [preferDarkMode]);

  const theme = useMemo(() => createTheme(getPalette(mode)), [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
