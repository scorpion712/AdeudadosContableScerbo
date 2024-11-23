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
                    alignItems: "center",
                    background: `radial-gradient(100% 60% at 50% 0%, ${primary.main} 50%, ${primary.lightest} 100%)`,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", 
                }}>
                    <img src="../logo_scerbo.png" alt="img not found" style={{
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