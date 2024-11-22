import { Container, Typography, Box, Stack } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { Seo } from "../../../components"
import { useLocation } from "react-router";

function RegistrarionSuccessPage() {
    const location = useLocation();

    return (
        <>
            <Seo title="Registro Exitoso" />
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
                        <Typography variant="h4" alignSelf="center">¡Registro exitoso!</Typography>
                        <Box display="flex" justifyContent="center">
                            <CheckCircleOutlineIcon sx={{ height: "100px", width: "100px", color: "#75F180" }} />
                        </Box>
                        <Typography sx={{ mt: 3 }} variant="body2">
                            <span style={{ fontWeight: 'bold' }}>{location?.state?.name}</span>, estamos analizando la información recibida. Pronto recibirás un correo de confirmación en <span style={{ fontWeight: 'bold' }}>{location?.state?.email}</span> y podrás comenzar a utilizar tu usuario.
                        </Typography>
                        <Typography sx={{ mt: 3 }} variant="body2">
                            Por favor, revisa tu casilla de correo para continuar.
                        </Typography>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default RegistrarionSuccessPage
