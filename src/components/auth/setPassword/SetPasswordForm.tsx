import { Box, LinearProgress, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useState, useEffect } from "react";
import { useLocation, Form } from "react-router-dom";

import { useService, useRouter } from "../../../hooks";
import { CheckActivationTokenResponse, SetPasswordFormValues, SetUserPasswordRequest, SetUserPasswordResponse } from "../../../models";
import { paths } from "../../../routes/paths";
import { userService } from "../../../services";
import SetPasswordFormBody from "./SetPasswordFormBody";

const formInitialValues = {
    password: '',
    confirmPassword: '',
} as SetPasswordFormValues;

const formValidationSchema = Yup.object({ 
    password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres").max(8, "La contraseña puede tener hasta 8 caracteres").required('La contraseña es requerida'),
    confirmPassword: Yup.string().max(255).required("Confirma tu contraseña").oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
});

export const SetPasswordForm = () => {

    const { loading, callEndpoint } = useService<SetUserPasswordResponse>();
    const { loading: checkingActivationToken, callEndpoint: callCheckActivationToken } = useService<CheckActivationTokenResponse>();

    const router = useRouter();
    const query = new URLSearchParams(useLocation().search);
    const activationToken = query.get('activationToken');

    const [activationError, setActivationError] = useState(false);

    const checkActivationToken = async () => {
        const response = await callCheckActivationToken(await userService.checkActivationToken(activationToken ?? ""));
        if (response) {
            setActivationError(!response.data);
        }
    }

    useEffect(() => {
        checkActivationToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormSubmit = async (values: SetPasswordFormValues) => {
        const response = await callEndpoint(await userService.setPassword({
            activationToken: activationToken,
            password: values.password,
        } as SetUserPasswordRequest));
        if (response.data.userId) {
            router.push(paths.auth.login, {});
        }
    }

    return (
        <>
            {
                loading || checkingActivationToken ?
                    <Box>
                        <LinearProgress sx={{ mt: 5 }} />
                    </Box>
                    : activationError
                        ? <Typography variant="body1" color="error">Ha ocurrido un error verificando el token</Typography>
                        :
                        <Formik initialValues={formInitialValues}
                            validationSchema={formValidationSchema}
                            onSubmit={handleFormSubmit}>
                            <Form>
                                <SetPasswordFormBody />
                                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained"  >
                                    Ingresar
                                </Button>
                            </Form>
                        </Formik>
            }
        </>
    )
}
