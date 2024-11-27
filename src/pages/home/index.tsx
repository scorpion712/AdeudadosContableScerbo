import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { HomePageContent, Seo } from '../../components'; 

const Page = () => {
  return (
    <>
      <Seo title="Home Dashboard" />
      <Box 
        component="main"
      >
        <Container maxWidth="xl">
          <HomePageContent />
        </Container>
      </Box>
    </>
  );
};

export default Page;
