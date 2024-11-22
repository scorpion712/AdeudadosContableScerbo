/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { Item } from '../config'; 
import { MobileNavItem } from './MobileNavItem';

interface RenderItemProps { depth?: number; items: Item[]; pathname: string }

const renderItems = ({ depth = 0, items, pathname }: RenderItemProps) =>
    items.reduce(
        (acc, item) =>
            reduceChildRoutes({
                acc,
                depth,
                item,
                pathname,
            }),
        []
    );

const reduceChildRoutes = ({ acc, depth, item, pathname }: { acc: any; depth: number; item: Item; pathname: string }) => {
    const checkPath = !!(item.path && pathname);
    const partialMatch = checkPath ? pathname.includes(item.path) : false;
    const exactMatch = checkPath ? pathname === item.path : false;

    if (item.items) {
        acc.push(
            <MobileNavItem
                active={partialMatch}
                depth={depth}
                disabled={item.disabled}
                icon={item.icon}
                key={item.title}
                label={item.label}
                open={partialMatch}
                title={item.title}
            >
                <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                        listStyle: 'none',
                        m: 0,
                        p: 0,
                    }}
                >
                    {renderItems({
                        depth: depth + 1,
                        items: item.items,
                        pathname,
                    })}
                </Stack>
            </MobileNavItem>
        );
    } else {
        acc.push(
            <MobileNavItem
                active={exactMatch}
                depth={depth}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                label={item.label}
                path={item.path}
                title={item.title}
            />
        );
    }

    return acc;
};

export const MobileNavSection = (props: { items: Item[]; pathname: string; subheader: string }) => {
    const { items = [], pathname, subheader = '', ...other } = props;

    return (
        <Stack
            component="ul"
            spacing={0.5}
            sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
            }}
            {...other}
        >
            {subheader && (
                <Box
                    component="li"
                    sx={{
                        color: 'var(--nav-section-title-color)',
                        fontSize: 14,
                        fontWeight: 700,
                        lineHeight: 1.66,
                        mb: 1,
                        ml: 1,
                        textTransform: 'uppercase',
                    }}
                >
                    {subheader}
                </Box>
            )}
            {renderItems({ items, pathname })}
        </Stack>
    );
};
