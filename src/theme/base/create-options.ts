import { ThemeOptions, CssVarsThemeOptions } from '@mui/material';
import { createComponents } from './create-components';
import { createTypography } from './create-typography';

// Here we do not modify the "palette" and "shadows" because "light" and "dark" mode
// may have different values. 
export const createOptions = (config: { direction: 'ltr' | 'rtl' }): Omit<ThemeOptions, 'components'> & Pick<CssVarsThemeOptions, 'defaultColorScheme' | 'colorSchemes' | 'components'> & {
  cssVariables?: boolean | Pick<CssVarsThemeOptions, 'colorSchemeSelector' | 'disableCssColorScheme' | 'cssVarPrefix' | 'shouldSkipGeneratingVar'>;
} => {
  const { direction = 'ltr' } = config;

  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    components: createComponents(),
    direction,
    shape: {
      borderRadius: 8,
    },
    typography: createTypography(),
  };
};
