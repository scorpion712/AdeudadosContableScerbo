import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SideNavItem } from './SideNavItem';
import { Item } from './config';


interface RenderItemProps { depth?: number; items: Item[]; pathname: string}

const renderItems = ({ depth = 0, items, pathname }: RenderItemProps) =>
  {
    const renderItemsResult = items.map((item)=>{
        return reduceChildRoutes({depth, item, pathname})
    });
    return renderItemsResult;
  };

const reduceChildRoutes = ({ depth, item, pathname }: {depth: number; item: Item, pathname: string }) => {
  const acc = [];
  const checkPath = !!(item.path && pathname);
  const partialMatch = checkPath ? pathname.includes(item.path) : false;
  const exactMatch = checkPath ? pathname === item.path : false;
  if (item.items) {
    acc.push(
      <SideNavItem
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
      </SideNavItem>
    );
  } else {
    acc.push(
      <SideNavItem
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

interface SideNavSectionProps {
  items: Item[];
  pathname: string;
  subheader: string;
  [x: string]: unknown;
}

export const SideNavSection = (props: SideNavSectionProps) => {
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
            fontSize: 12,
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
