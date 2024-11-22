import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { paths } from '../routes/paths'; 
import { Seo,RouterLink } from '../components';

const Page = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md')); 

  return (
    <>
      <Seo title="Error: Authorización Requerida" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6,
            }}
          >
            <Box
              alt="Not authorized"
              component="img"
              src="/assets/errors/error-401.png"
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Typography
            align="center"
            variant={mdUp ? 'h1' : 'h4'}
          >
            401: Authorización Requerida
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
           Has intentado acceder a una URL a la cual debes iniciar sesión para continuar.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Button
              component={RouterLink}
              href={paths.auth.login}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
