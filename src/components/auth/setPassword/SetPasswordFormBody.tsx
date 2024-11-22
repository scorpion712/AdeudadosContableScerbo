import { Stack, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

import { SetPasswordFormValues } from '../../../models';

function SetPasswordFormBody() {

    const {touched, errors, values, handleChange, handleBlur} = useFormikContext<SetPasswordFormValues>();

    return (
        <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
                error={!!(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Contraseña"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                data-testid='password-field'
            />
            <TextField
                error={!!(touched.confirmPassword && errors.confirmPassword)}
                fullWidth
                helperText={touched.confirmPassword && errors.confirmPassword}
                label="Confirmar contraseña"
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.confirmPassword}
            /> 
        </Stack>
    )
}

export default SetPasswordFormBody
