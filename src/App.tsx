import { SnackbarProvider } from 'notistack'
import { SnackBarUtilitiesConfigurator } from './utils'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { AuthProvider } from './context/auth';
import { createTheme } from './theme';
import { settings } from './theme/settings';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  const element = useRoutes(routes);

  const theme = createTheme(settings);

  return (
    <SnackbarProvider>
      <SnackBarUtilitiesConfigurator />
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {element}
        </ThemeProvider>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App