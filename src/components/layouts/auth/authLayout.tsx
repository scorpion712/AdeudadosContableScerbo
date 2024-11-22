import { ReactNode } from 'react';
import { Box, Grid2 } from '@mui/material';
import { primary } from '../../../theme/colors';

export const Layout = (props: { children: ReactNode | ReactNode[] }) => {
    const { children } = props;

    return (
        <Grid2
            container
            sx={{ flex: "1 1 auto" }}
        >
            <Grid2 size={{ xs: 12, lg: 8 }}
                sx={{
                    alignItems: "stretch",
                    background: `radial-gradient(100% 60% at 50% 0%, ${primary.main} 50%, ${primary.lightest} 100%)`,
                    color: "white",
                    display: "flex",
                }}
            >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: { xs: 5, lg: 30 },
                }}>
                    <img src="https://www.sbi-technology.com/assets/images/sitio/logo.svg" alt="img not found" style={{
                        width: "100%",
                    }} />
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}
                sx={{
                    backgroundColor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                }}
            >
                {children}
            </Grid2>

        </Grid2>
    );
};