import { Stack, TextField } from "@mui/material";
import { useFormikContext } from "formik"

import { RegistrationFormValues } from "../../../models";

export const RegistrationFormBody = () => {

    const { touched, errors, values, handleBlur, handleChange } = useFormikContext<RegistrationFormValues>(); 

    return (
        <Stack spacing={3} sx={{ mt: 4 }}>
            <TextField
                error={!!(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Correo electrónico"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
            />
            <TextField
                error={!!(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="Nombre"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.firstName}
            />
            <TextField
                error={!!(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Apellido"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.lastName}
            />
        </Stack>
    );
}