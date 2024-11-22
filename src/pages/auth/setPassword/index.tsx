import { Box, Container, Stack, Typography, FormHelperText } from "@mui/material";

import { Seo, SetPasswordForm } from "../../../components";

function SetUserPasswordPage() {
    return (
        <>
            <Seo title="Activar Usuario" />
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
                    <Stack spacing={3}>

                        <Stack spacing={3}>
                            <Typography variant="h4"
                                data-testid='password-lbl'>Contraseña</Typography>
                            <FormHelperText>
                                Ingresá tu nueva contraseña y confirmación para continuar
                            </FormHelperText>
                        </Stack>
                        <SetPasswordForm />
                    </Stack>
                </Container>
            </Box>
        </>)
}

export default SetUserPasswordPage;