import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCssVars } from '../utils/useCssVars';
import { useLocation } from 'react-router-dom';
import { useSections } from '../config';
import { Scrollbar } from '../../../../Scrollbar';
import { RouterLink } from '../../../../RouterLink';
import { paths } from '../../../../../routes/paths';
import { Logo } from '../../../../Logo';
import { Divider } from '@mui/material';
import { MobileNavSection } from './MobileNavSection';

const MOBILE_NAV_WIDTH = 280;

interface MobileNavProps {
    color?: string;
    open: boolean;
    onClose: () => void;
}

export const MobileNav = (props: MobileNavProps) => {
    const { color = 'evident', open, onClose } = props;
    const pathname = useLocation().pathname ?? "";
    const cssVars = useCssVars(color);

    const sections = useSections();

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    ...cssVars,
                    backgroundColor: 'var(--nav-bg)',
                    color: 'var(--nav-color)',
                    width: MOBILE_NAV_WIDTH,
                },
            }}
            variant="temporary"
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
                        <Box
                            component={RouterLink}
                            href={paths.index}
                            sx={{
                                borderColor: 'var(--nav-logo-border)',
                                borderRadius: 1,
                                borderStyle: 'solid',
                                borderWidth: 1,
                                display: 'flex',
                                height: 40,
                                p: '4px',
                                width: 40,
                            }}
                        >
                            <Logo />
                        </Box>
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
                            <MobileNavSection
                                items={section.items}
                                key={index}
                                pathname={pathname}
                                subheader={section.subheader}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Scrollbar>
            <Box sx={{ p: 3 }}>
                <Divider />
                <Typography variant="caption">
                    Initial Template
                </Typography>
            </Box>
        </Drawer>
    );
};
