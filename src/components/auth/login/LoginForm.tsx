import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Stack, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Button, Typography } from '@mui/material'
import { useFormikContext } from 'formik';
import { useState } from 'react'; 

import { LoginFormValues } from '../../../models';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { handleChange, handleBlur, values, errors, touched } = useFormikContext();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Stack spacing={2}>
            <TextField
                autoFocus
                error={(touched as LoginFormValues).email && (errors as LoginFormValues).email ? true : false}
                fullWidth
                helperText={(touched as LoginFormValues).email && (errors as LoginFormValues).email}
                label="EMAIL"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={(values as LoginFormValues).email}
            />
            <FormControl sx={{ m: 1 }} variant="filled" fullWidth>
                <InputLabel htmlFor="filled-adornment-password">CONTRASEÑA</InputLabel>
                <FilledInput
                    id="filled-adornment-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={(values as LoginFormValues).password}
                    error={(touched as LoginFormValues).password && (errors as LoginFormValues).password ? true : false}
                />
                <Typography variant="caption" color="error" sx={{ mt: 1, ml: { xs: 0, md: 2 } }}>
                    {(errors as LoginFormValues).password}
                </Typography>
            </FormControl>
            <Button
                fullWidth
                sx={{
                    mt: 3,
                }}
                size="large"
                type="submit"
                variant="contained"
                disabled={Object.keys(errors).length > 0}
            >
                Continuar
            </Button>
        </Stack>
    )
}
