import { Stack, TextField } from "@mui/material";
import { useFormikContext } from "formik";

import { ForgotPasswordFormValues } from "../../../models";

function ForgotPasswordFormbody() {

    const { touched, values, errors, handleBlur, handleChange } = useFormikContext<ForgotPasswordFormValues>();

    return (
        <Stack spacing={3} sx={{ mt: 2 }}>
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
        </Stack>
    )
}

export default ForgotPasswordFormbody
