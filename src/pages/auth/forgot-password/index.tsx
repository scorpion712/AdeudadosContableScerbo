import { Box, Container, Grid2, Typography } from "@mui/material";

import { Seo } from "../../../components"; 
import ForgotPasswordForm from "../../../components/auth/forgot-password/ForgotPasswordForm"; 

function ForgotPasswordPage() {
    return (
        <>
            <Seo title="Olvidaste tu contraseña" />
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
                            <Typography variant="h3" mt={4}>¿Olvidaste tu contraseña?</Typography>
                            <Typography variant="body2" mt={2}>Ingresá tu dirección de correo electrónico y te enviaremos un link para restablecer tu contraseña</Typography>
                            <ForgotPasswordForm />
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </>

    )
}

export default ForgotPasswordPage;
