export type Palette = {
    action: {
        active: string;
        disabled: string;
        disabledBackground: string;
        focus: string;
        hover: string;
        selected: string;
    };
    background: {
        default: string;
        paper: string;
    };
    divider: string;
    error: ColorWithAlphas;
    info: ColorWithAlphas;
    mode: 'light' | 'dark';
    neutral:  {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
};
    primary: ColorWithAlphas;
    success: ColorWithAlphas;
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
    warning: ColorWithAlphas;
};

export interface ColorWithAlphas {
    alpha4: string;
    alpha8: string;
    alpha12: string;
    alpha30: string;
    alpha50: string;
    lightest: string;
    light: string;
    main: string;
    dark: string;
    darkest: string;
    contrastText: string;
}