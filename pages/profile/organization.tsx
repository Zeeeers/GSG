// Dependencies
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import PrivatePage from '@clyc/next-route-manager/components/PrivatePage';
import { Container } from '@chakra-ui/react';
import Navbar from 'layouts/main/navbar';
import InfoForm from 'components/organizationProfile/infoForm/infoForm';

// Component
const OrganizationProfile: NextPage = () => {
    // States

    return (
        <>
            <NextSeo title="Perfil de la organización - MATCH" />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/login" />

            <Navbar />

            <Container
                maxW="4xl"
                px={{ base: '15px', md: '70px' }}
                py={{ base: '60px', md: '40px' }}
                rounded="xl"
                bg={'gray.800'}
                mt="120px"
            >
                <InfoForm />
            </Container>
        </>
    );
};

// Export
export default OrganizationProfile;
