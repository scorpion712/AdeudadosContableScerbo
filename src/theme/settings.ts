export const settings: Settings = {
    colorPreset: 'primary', // this should match with colors created in colors file and the getPrimary function in utils
    contrast: 'high', // or high
    direction: 'ltr', // or rtl 
    layout: 'vertical', // or horizontal
    navColor: 'evident', // or discrete or blend-in
    paletteMode: 'light', // or dark
    responsiveFontSizes: true,
    stretch: false,
}

interface Settings {
    colorPreset: string;
    contrast: 'normal' | 'high';
    direction: 'ltr' | 'rtl';
    layout: 'vertical' | 'horizontal';
    navColor: 'evident' | 'discrete' | 'blend-in';
    paletteMode: 'light' | 'dark';
    responsiveFontSizes: boolean;
    stretch: boolean;
}