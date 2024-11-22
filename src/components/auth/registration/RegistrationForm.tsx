import { Box, Button, LinearProgress, Stack } from "@mui/material"
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { useRouter, useService } from "../../../hooks";
import { RegisterUserRequest, RegistrationFormValues, RegisterUserResponse } from "../../../models";
import { userService } from "../../../services";
import { RegistrationFormBody } from "./RegistrationFormBody";
import { paths } from "../../../routes/paths";

const formInitialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
} as RegistrationFormValues;

const formValidationSchema = Yup.object({
    email: Yup.string().email('Ingrese un email válido').max(255).required('El email es requerido'),
    firstName: Yup.string().max(255).required('El nombre es requerido'),
    lastName: Yup.string().max(255).required('El apellido es requerido'),
    password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres").max(8, "La contraseña puede tener hasta 8 caracteres").required('La contraseña es requerida'),
});


export const RegistrationForm = () => {

    const { loading, callEndpoint } = useService<RegisterUserResponse>();
    const router = useRouter();

    const handleFormSubmit = async (values: RegistrationFormValues) => {
        const response = await callEndpoint(await userService.registerUser({
            email: values.email,
            name: values.firstName,
            lastName: values.lastName,
            password: values.password,
        } as RegisterUserRequest));
        if (response) {
            router.push(paths.auth.register.success, { state: { name: values.firstName, email: values.email } });
        }
    }

    return (
        <Stack spacing={3}>
            {
                loading ?
                    <Box>
                        <LinearProgress sx={{ mt: 5 }} />
                    </Box>
                    :
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={formValidationSchema}
                        onSubmit={handleFormSubmit}>
                        <Form>
                            <RegistrationFormBody />
                            <Button sx={{mt: 2}} type="submit" variant="contained" fullWidth>Registrarme</Button>
                        </Form>
                    </Formik>
            }
        </Stack>
    );
}