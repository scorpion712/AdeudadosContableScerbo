import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, Theme } from '@mui/material/styles';

import { ReactNode } from 'react';
import { useMobileNav } from '../../../hooks';
import { TopNav } from './TopNav';
import { SideNav } from './side-nav/SideNav';
import { MobileNav } from './side-nav/mobile';

const SIDE_NAV_WIDTH = 280;

const VerticalLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH,
    },
}));

const VerticalLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
});

interface VerticalLayoutProps {
    children: ReactNode | ReactNode[];
}

export const VerticalLayout = (props: VerticalLayoutProps) => {
    const { children } = props;
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mobileNav = useMobileNav();

    return (
        <>
            <TopNav onMobileNavOpen={mobileNav.handleOpen} />
            {lgUp ?
                <SideNav />
                :
                <MobileNav
                    onClose={mobileNav.handleClose}
                    open={mobileNav.open}
                />
            }
            <VerticalLayoutRoot>
                <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
            </VerticalLayoutRoot>
        </>
    );
};