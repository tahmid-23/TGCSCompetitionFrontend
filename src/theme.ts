import { PaletteMode, ThemeOptions } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const lightThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#ba6bf2'
    },
    mode: 'light'
  }
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: deepPurple[500]
    },
    mode: 'dark'
  }
};

export function getThemeOptions(mode: PaletteMode): ThemeOptions {
  return mode === 'light' ? lightThemeOptions : darkThemeOptions;
}
