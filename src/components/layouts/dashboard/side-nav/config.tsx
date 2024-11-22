import { ReactNode, useMemo } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { SvgIcon } from "@mui/material";

import { paths } from "../../../../routes/paths";

export const useSections = () => {

    return useMemo(() => {
        const sideNavItems = [
            {
                title: "Inicio",
                path: paths.index,
                icon: (
                    <SvgIcon fontSize="small" >
                        <HomeIcon />
                    </SvgIcon>
                ),
            } as Item,
        ];
        return [
            {
                items: sideNavItems,
            } as SectionItem,
        ];
    }, []);
};

export type SectionItem = {
    items: Item [];
    subheader: string;
}

export type Item = {
    disabled: boolean;
    icon: ReactNode;
    title: string;
    label: string;
    path: string;
    external: boolean;
    items: Item [];
}