import { Box, Container, Divider, Grid2, Link, Stack, Typography } from "@mui/material";

import { RegistrationForm, Seo } from "../../../components";
import { paths } from "../../../routes/paths";
import { primary } from "../../../theme/colors";

const RegistrationPage = () => {

  return (
    <>
      <Seo title="Registro" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          p: 5
        }}
      >
        <Container maxWidth="lg">
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <Typography variant="h5" gutterBottom>
                Registro
              </Typography>
              <Typography variant="body2">Ingresá tu dirección de correo electrónico y datos personales para continuar</Typography>
              <RegistrationForm />
              <Divider />
              <Stack direction={"row"} mt={2} mb={{ xs: 2, md: 4 }} sx={{display: "flex", alignItems: "center"}} >
                <Typography variant="body1" color={primary.alpha50}>¿Ya estás registrado?</Typography>
                <Link variant="body1"
                  href={paths.auth.login}
                  sx={{ color: primary.main, fontWeight: "650" }}
                  fontSize={{ xs: '14px', md: "18px" }}
                  ml={1}>
                  Ingresá
                </Link>
              </Stack>
            </Grid2>
          </Grid2>
        </Container>
      </Box >
    </>
  );
};

export default RegistrationPage;