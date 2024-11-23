import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Seo } from '../../components';
import { Typography } from '@mui/material';

const Page = () => {
  return (
    <>
      <Seo title="Home Dashboard" />
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
          <Typography gutterBottom variant="h4" component="h2">
            Bienvenido a Estudio Contable Paula Scerbo Adeudados
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Page;
