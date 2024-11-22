import { Box, Container, FormHelperText, Stack, Typography } from '@mui/material';

import { Seo } from '../../../components';
import ActivateUserForm from '../../../components/auth/activation/ActivateUserForm';

function ActivateUserPage() {
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
                            <Typography variant="h4">Contraseña</Typography>
                            <FormHelperText>
                                Ingresá tu nueva contraseña y confirmación para continuar
                            </FormHelperText>
                        </Stack>
                        <ActivateUserForm />
                    </Stack>
                </Container>
            </Box>
        </>)
}

export default ActivateUserPage;
