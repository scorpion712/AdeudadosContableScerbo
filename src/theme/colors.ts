import { alpha } from '@mui/system/colorManipulator';

interface Color {
  lightest: string;
  light: string;
  main: string;
  dark: string;
  darkest: string;
  contrastText: string;
}

const withAlphas = (color: Color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: '#F8F9FA',        // Lightest gray
  100: '#F0F4F8',       // Very light gray
  200: '#D9E2EC',       // Light gray
  300: '#B0C4E0',       // Mid gray
  400: '#8A9BBD',       // Dark gray
  500: '#6C757D',       // Neutral gray (Material UI)
  600: '#495057',       // Darker gray
  700: '#343A40',       // Dark shade
  800: '#212529',       // Darkest shade
  900: '#111827',       // Almost black
};

export const primary = withAlphas({
  lightest: '#A7C6E7', // A light shade derived from #1F78BC
  light: '#1F78BC',     // Light shade (your provided color)
  main: '#05294D',      // Main color (your provided color)
  dark: '#001B36',      // Darker shade derived from #05294D
  darkest: '#000D20',   // Darkest shade derived from #05294D
  contrastText: '#FFFFFF', // Text color for contrast
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
  contrastText: '#FFFFFF',
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF',
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF',
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF',
});
