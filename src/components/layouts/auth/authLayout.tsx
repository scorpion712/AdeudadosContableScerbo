import { ReactNode } from 'react';
import { Box, Grid2, useMediaQuery, useTheme } from '@mui/material';
import { primary } from '../../../theme/colors';

export const Layout = (props: { children: ReactNode | ReactNode[] }) => {
    const { children } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    
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
                    padding: 4
                }}>
                    <img src="../logo_contable_scerbo.png" alt="img not found"
                        style={{
                            width: "100%",
                            height: isMobile ? "150px" : "400px",   
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