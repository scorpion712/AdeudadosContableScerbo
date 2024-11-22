import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RouterLink, Seo } from '../components';
import { paths } from '../routes/paths';
 

const Page = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Seo title="Error: No Encontrado" />
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
              alt="Not found"
              component="img"
              src="/assets/errors/error-404.png"
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
            404: La página que buscaba no se encuentra
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Has intentado acceder a una URL que no existe. Intenta usando la navegación de la web.
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
              href={paths.index}
            >
              Volver al inicio 
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
