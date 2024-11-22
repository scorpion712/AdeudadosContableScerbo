import { Form, Formik } from 'formik'
import { Button, LinearProgress } from '@mui/material';
import * as Yup from 'yup';
import { Box } from '@mui/system';

import { ForgotPasswordFormValues, ForgotPasswordRequest, ForgotPasswordResponse } from '../../../models';
import ForgotPasswordFormbody from './ForgotPasswordFormBody';
import { useRouter, useService } from '../../../hooks';
import { userService } from '../../../services';
import { SnackBarUtilities } from '../../../utils';
import { paths } from '../../../routes/paths';

const formInitialValues = {
    email: "",
} as ForgotPasswordFormValues;

const formValidationSchema = Yup.object({
    email: Yup.string().email('Ingrese un email válido').max(255).required('El email es requerido'),
});


function ForgotPasswordForm() {

    const { loading, callEndpoint } = useService<ForgotPasswordResponse>();

    const router = useRouter();

    const handleFormSubmit = async (values: ForgotPasswordFormValues) => {
        const response = await callEndpoint(await userService.resetUserPassword({ email: values.email } as ForgotPasswordRequest));
        if (response.data.success) {
            SnackBarUtilities.info("Te enviamos un correo electrónico. Por favor, revisá tu casilla de e-mail para continuar.");
            router.push(paths.index, {});
        }
    }

    return (
        <>
            {
                loading
                    ? <Box>
                        <LinearProgress sx={{ mt: 5 }} />
                    </Box>
                    :
                    <Formik initialValues={formInitialValues}
                        validationSchema={formValidationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        <Form>
                            <ForgotPasswordFormbody />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                type="submit"
                                sx={{ mt: 3 }}
                            >
                                Restablecer contraseña
                            </Button>
                        </Form>
                    </Formik>
            }
        </>
    )
}

export default ForgotPasswordForm
