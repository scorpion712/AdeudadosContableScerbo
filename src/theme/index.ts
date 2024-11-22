import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';

import { createOptions as createBaseOptions } from './base/create-options';
import { createOptions as createDarkOptions } from './dark/create-options';
import { createOptions as createLightOptions } from './light/create-options';

export const createTheme = (config: { direction: 'ltr' | 'rtl'; paletteMode: string; colorPreset: string; contrast: string; responsiveFontSizes: boolean; }) => {
  let theme = createMuiTheme(
    // Base options available for both dark and light palette modes
    createBaseOptions({
      direction: config.direction as 'ltr' | 'rtl',
    }),
    // Options based on selected palette mode, color preset and contrast
    config.paletteMode === 'dark'
      ? createDarkOptions({
        colorPreset: config.colorPreset,
        contrast: config.contrast,
      })
      : createLightOptions({
        colorPreset: config.colorPreset,
        contrast: config.contrast,
      })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
