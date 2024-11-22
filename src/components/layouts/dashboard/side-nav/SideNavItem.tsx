import { ReactNode, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import SvgIcon from '@mui/material/SvgIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useRouter } from '../../../../hooks';
import { To } from 'react-router-dom';


interface SideNavItemProps {
    active: boolean;
    children?: ReactNode | ReactNode[];
    depth?: number;
    disabled: boolean;
    external?: boolean;
    icon: ReactNode;
    label: string;
    open?: boolean;
    path?: string;
    title: string;
}

export const SideNavItem = (props: SideNavItemProps) => {
    const {
        active,
        children,
        depth = 0,
        disabled,
        icon,
        label,
        open: openProp,
        path,
        title,
    } = props;
    const [open, setOpen] = useState(!!openProp);

    const handleToggle = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    const router = useRouter();
    // Icons can be defined at top level only, deep levels have bullets instead of actual icons.

    let startIcon;

    if (depth === 0) {
        startIcon = icon;
    } else {
        startIcon = (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'center',
                    height: 20,
                    justifyContent: 'center',
                    width: 20,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'var(--nav-item-icon-color)',
                        borderRadius: '50%',
                        height: 4,
                        opacity: 0,
                        width: 4,
                        ...(active && {
                            backgroundColor: 'var(--nav-item-icon-active-color)',
                            height: 6,
                            opacity: 1,
                            width: 6,
                        }),
                    }}
                />
            </Box>
        );
    }

    const offset = depth === 0 ? 0 : (depth - 1) * 16;

    // Branch

    if (children) { 
        return (
            <li id={`side-nav-item-path_${path}`}>
                <ButtonBase
                    disabled={disabled}
                    onClick={handleToggle}
                    sx={{
                        alignItems: 'center',
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        pl: `${16 + offset}px`,
                        pr: '16px',
                        py: '6px',
                        textAlign: 'left',
                        width: '100%',
                        ...(active && {
                            ...(depth === 0 && {
                                backgroundColor: 'var(--nav-item-active-bg)',
                            }),
                        }),
                        '&:hover': {
                            backgroundColor: active ? 'var(--nav-item-hover-bg)' : 'var(--nav-item-disable-hover-bg)',
                        },
                    }}
                >
                    {startIcon && (
                        <Box
                            component="span"
                            sx={{
                                alignItems: 'center',
                                color: 'var(--nav-item-icon-color)',
                                display: 'inline-flex',
                                justifyContent: 'center',
                                mr: 2,
                                ...(active && {
                                    color: 'var(--nav-item-icon-active-color)',
                                }),
                                '&:hover': {
                                    color:  active ? 'var(--nav-item-icon-color)' : 'var(--nav-item-disable-hover-bg)',
                                } 
                            }}
                        >
                            {startIcon}
                        </Box>
                    )}
                    <Box
                        component="span"
                        sx={{
                            color: 'var(--nav-item-color)',
                            flexGrow: 1,
                            fontFamily: (theme) => theme.typography.fontFamily,
                            fontSize: depth > 0 ? 13 : 14,
                            fontWeight: depth > 0 ? 500 : 600,
                            lineHeight: '24px',
                            whiteSpace: 'nowrap',
                            ...(active && {
                                color: 'var(--nav-item-active-color)',
                            }),
                            ...(disabled && {
                                color: 'var(--nav-item-disabled-color)',
                            }),
                        }}
                    >
                        {title}
                    </Box>
                    <SvgIcon
                        sx={{
                            color: 'var(--nav-item-chevron-color)',
                            fontSize: 16,
                            ml: 2,
                        }}
                    >
                        {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                    </SvgIcon>
                </ButtonBase>
                <Collapse
                    in={open}
                    sx={{ mt: 0.5 }}
                >
                    {children}
                </Collapse>
            </li>
        );
    }


    // Leaf

    const handleItemClick = () => {
        router.push(path as To, {});
    }
 
    return (
        <li id={`side-nav-item-path_${path}`}>
            <ButtonBase
                disabled={disabled}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: `${16 + offset}px`,
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        ...(depth === 0 && {
                            backgroundColor: 'var(--nav-item-active-bg)',
                        }),
                    }),
                    '&:hover': {
                        backgroundColor:  active ? 'var(--nav-item-hover-bg)' : 'var(--nav-item-disable-hover-bg)',// Change the icon color on hover
                        '& span': {
                            color: active ? 'var(--nav-item-icon-active-color)' : 'var(--nav-item-hover-color)',
                        }, 
                    },
                }}
                onClick={handleItemClick}
            >
                {startIcon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center', 
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            color:  active ? 'var(--nav-item-icon-active-color)' : 'var(--nav-item-icon-color)',
                           
                        }}
                    >
                        {startIcon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: 'var(--nav-item-color)',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: depth > 0 ? 13 : 14,
                        fontWeight: depth > 0 ? 500 : 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'var(--nav-item-active-color)',
                        }),
                        ...(disabled && {
                            color: 'var(--nav-item-disabled-color)',
                        }),
                        
                    }}
                >
                    {title}
                </Box>
                {label && (
                    <Box
                        component="span"
                        sx={{ ml: 2 }}
                    >
                        {label}
                    </Box>
                )}
            </ButtonBase>
        </li>
    );
};
