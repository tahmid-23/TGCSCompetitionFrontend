import {
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import App from '../App/App';
import { useMemo, useState } from 'react';
import { getThemeOptions } from '../../theme';

const AppWrapper = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light'
  );
  const theme = useMemo(() => {
    return createTheme(getThemeOptions(mode));
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <App mode={mode} setMode={setMode} />
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default AppWrapper;
