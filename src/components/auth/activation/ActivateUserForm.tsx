import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import ActivateUserFormBody from './ActivateUserFormBody'
import { ActivateUserFormValues, ActivateUserRequest, ActivateUserResponse, CheckActivationTokenResponse } from '../../../models';
import { useRouter, useService } from '../../../hooks';
import { userService } from '../../../services';
import { paths } from '../../../routes/paths';

const formInitialValues = {
    password: '',
    confirmPassword: '',
} as ActivateUserFormValues;

const formValidationSchema = Yup.object({
    email: Yup.string().email('Ingrese un email válido').max(255).required('El email es requerido'),
});

function ActivateUserForm() {

    const { loading, callEndpoint } = useService<ActivateUserResponse>();
    const { loading: checkingActivationToken, callEndpoint: callCheckActivationToken } = useService<CheckActivationTokenResponse>();

    const router = useRouter();
    const { activationToken } = useParams();

    const [activationError, setActivationError] = useState(false);

    const checkActivationToken = async () => {
        const response = await callCheckActivationToken(await userService.checkActivationToken(activationToken ?? ""));
        if (response) {
            setActivationError(!response.data.success);
        }
    }

    useEffect(() => { 
        if (activationToken) {
            checkActivationToken()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activationToken]);

    const handleFormSubmit = async (values: ActivateUserFormValues) => {
        const response = await callEndpoint(await userService.activateUser({
            activationToken: activationToken, 
            password: values.password,
        } as ActivateUserRequest));
        if (response) {
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
                    : activationError ? <Typography variant="body1" color="error">Ha ocurrido un error verificando el token</Typography> :
                        <Formik initialValues={formInitialValues}
                            validationSchema={formValidationSchema}
                            onSubmit={handleFormSubmit}>
                            <Form>
                                <ActivateUserFormBody />
                                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                                    Ingresar
                                </Button>
                            </Form>
                        </Formik>
            }
        </>
    )
}

export default ActivateUserForm
