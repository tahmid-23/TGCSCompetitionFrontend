import {
  AppBar,
  IconButton,
  Link,
  PaletteMode,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
import styles from './Header.module.css';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectLogin } from '../../features/login';
import { DarkMode, LightMode } from '@mui/icons-material';

interface HeaderProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
}

const Header = ({ mode, setMode }: HeaderProps) => {
  const theme = useTheme();
  const loginState = useAppSelector(selectLogin);

  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar className={styles.toolbar}>
        <Typography className={styles.title} variant="h4">
          TGCS Competition Viewer
        </Typography>
        <IconButton
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        >
          {mode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
        {loginState.hasAccess && (
          <div>
            <Link component={RouterLink} to="/">
              <Typography color={theme.palette.primary.contrastText}>
                Home
              </Typography>
            </Link>
          </div>
        )}
        {loginState.admin && (
          <div>
            <Link component={RouterLink} to="/admin">
              <Typography color={theme.palette.primary.contrastText}>
                Admin
              </Typography>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
