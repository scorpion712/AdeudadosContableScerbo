import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

import { useLocation } from 'react-router-dom';
import { settings } from '../../../../theme/settings';
import { Scrollbar } from '../../../Scrollbar'; 
import { useSections } from './config';
import { SideNavSection } from './SideNavSection';
import { useCssVars } from './utils/useCssVars';
import { Divider, Typography } from '@mui/material';

const SIDE_NAV_WIDTH = 280;

export const SideNav = () => {
    const pathname = useLocation().pathname ?? "";
    const cssVars = useCssVars(settings.navColor);

    const sections = useSections();

    return (
        <Drawer
            anchor="left"
            open
            PaperProps={{
                sx: {
                    ...cssVars,
                    backgroundColor: 'var(--nav-bg)',
                    borderRightColor: 'var(--nav-border-color)',
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
                    color: 'var(--nav-color)',
                    width: SIDE_NAV_WIDTH,
                },
            }}
            variant="permanent"
        >
            <Scrollbar
                sx={{
                    height: '100%',
                    '& .simplebar-content': {
                        height: '100%',
                    },
                    '& .simplebar-scrollbar:before': {
                        background: 'var(--nav-scrollbar-color)',
                    },
                }}
            >
                <Stack sx={{ height: '100%' }}>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ p: 3 }}
                    >
                        {/* <Logo /> */}
                    </Stack>
                    <Stack
                        component="nav"
                        spacing={2}
                        sx={{
                            flexGrow: 1,
                            px: 2,
                        }}
                    >
                        {sections.map((section, index) => (
                            <SideNavSection
                                items={section.items}
                                key={index}
                                pathname={pathname}
                                subheader={section.subheader ?? ""}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Scrollbar>
            <Box sx={{ p: 3 }}>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="caption" align='center' gutterBottom mt={1}>
                        Estudio Contable Paula Scerbo
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};