import { useTheme } from '@mui/material/styles';
import { useMemo } from "react";

import { neutral, primary } from "../../../../../theme/colors";

export
    const useCssVars = (color: string) => {
        const theme = useTheme();

        return useMemo(() => {
            switch (color) {
                case 'blend-in':
                    if (theme.palette.mode === 'dark') {
                        return {
                            '--nav-bg': theme.palette.background.default,
                            '--nav-color': neutral[100],
                            '--nav-border-color': neutral[700],
                            '--nav-logo-border': neutral[700],
                            '--nav-section-title-color': neutral[400],
                            '--nav-item-color': neutral[400],
                            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                            '--nav-item-active-color': theme.palette.text.primary,
                            '--nav-item-disabled-color': neutral[600],
                            '--nav-item-icon-color': neutral[500],
                            '--nav-item-icon-active-color': theme.palette.primary.main,
                            '--nav-item-icon-disabled-color': neutral[700],
                            '--nav-item-chevron-color': neutral[700],
                            '--nav-scrollbar-color': neutral[400],
                        };
                    } else {
                        return {
                            '--nav-bg': theme.palette.background.default,
                            '--nav-color': theme.palette.text.primary,
                            '--nav-border-color': neutral[100],
                            '--nav-logo-border': neutral[100],
                            '--nav-section-title-color': neutral[400],
                            '--nav-item-color': theme.palette.text.secondary,
                            '--nav-item-hover-bg': theme.palette.action.hover,
                            '--nav-item-active-bg': theme.palette.action.selected,
                            '--nav-item-active-color': theme.palette.text.primary,
                            '--nav-item-disabled-color': neutral[400],
                            '--nav-item-icon-color': neutral[400],
                            '--nav-item-icon-active-color': theme.palette.primary.main,
                            '--nav-item-icon-disabled-color': neutral[400],
                            '--nav-item-chevron-color': neutral[400],
                            '--nav-scrollbar-color': neutral[900],
                        };
                    }

                case 'discrete':
                    if (theme.palette.mode === 'dark') {
                        return {
                            '--nav-bg': neutral[900],
                            '--nav-color': neutral[100],
                            '--nav-border-color': neutral[700],
                            '--nav-logo-border': neutral[700],
                            '--nav-section-title-color': neutral[400],
                            '--nav-item-color': neutral[400],
                            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                            '--nav-item-active-color': theme.palette.text.primary,
                            '--nav-item-disabled-color': neutral[600],
                            '--nav-item-icon-color': neutral[500],
                            '--nav-item-icon-active-color': theme.palette.primary.main,
                            '--nav-item-icon-disabled-color': neutral[700],
                            '--nav-item-chevron-color': neutral[700],
                            '--nav-scrollbar-color': neutral[400],
                        };
                    } else {
                        return {
                            '--nav-bg': neutral[50],
                            '--nav-color': theme.palette.text.primary,
                            '--nav-border-color': theme.palette.divider,
                            '--nav-logo-border': neutral[200],
                            '--nav-section-title-color': neutral[500],
                            '--nav-item-color': neutral[500],
                            '--nav-item-hover-bg': theme.palette.action.hover,
                            '--nav-item-active-bg': theme.palette.action.selected,
                            '--nav-item-active-color': theme.palette.text.primary,
                            '--nav-item-disabled-color': neutral[400],
                            '--nav-item-icon-color': neutral[400],
                            '--nav-item-icon-active-color': theme.palette.primary.main,
                            '--nav-item-icon-disabled-color': neutral[400],
                            '--nav-item-chevron-color': neutral[400],
                            '--nav-scrollbar-color': neutral[900],
                        };
                    }

                case 'evident':
                    if (theme.palette.mode === 'dark') {
                        return {
                            '--nav-bg': neutral[800],
                            '--nav-color': theme.palette.common.white,
                            '--nav-border-color': 'transparent',
                            '--nav-logo-border': neutral[700],
                            '--nav-section-title-color': neutral[400],
                            '--nav-item-color': 'red',
                            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                            '--nav-item-active-color': theme.palette.common.white,
                            '--nav-item-active-hover-color': theme.palette.common.white,
                            '--nav-item-disabled-color': neutral[500],
                            '--nav-item-disable-hover-bg': 'red',
                            '--nav-item-icon-color': neutral[400],
                            '--nav-item-icon-active-color': theme.palette.primary.main,
                            '--nav-item-icon-disabled-color': neutral[500],
                            '--nav-item-chevron-color': neutral[600],
                            '--nav-scrollbar-color': neutral[400],
                        };
                    } else {
                        return {
                            '--nav-bg': primary.darkest,
                            '--nav-color': theme.palette.common.white,
                            '--nav-border-color': 'transparent',
                            '--nav-logo-border': primary.darkest,
                            '--nav-section-title-color': neutral[400],
                            '--nav-item-color': primary.contrastText,
                            '--nav-item-hover-color': primary.darkest,
                            '--nav-item-hover-bg': primary.lightest,
                            '--nav-item-active-bg': primary.light,
                            '--nav-item-active-color': primary.main,
                            '--nav-item-active-hover-color': primary.main,
                            '--nav-item-disabled-color': neutral[500],
                            '--nav-item-disable-hover-bg': primary.lightest,
                            '--nav-item-icon-color': primary.contrastText,
                            '--nav-item-icon-hover-color': primary.main,
                            '--nav-item-icon-active-color': primary.main,
                            '--nav-item-icon-disabled-color': neutral[500],
                            '--nav-item-chevron-color': neutral[600],
                            '--nav-scrollbar-color': neutral[400],
                        };
                    }

                default:
                    return {};
            }
        }, [theme, color]);
    };