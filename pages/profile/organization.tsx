// Dependencies
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import PrivatePage from '@clyc/next-route-manager/components/PrivatePage';
import { Container, HStack, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import Navbar from 'layouts/main/navbar';
import OrganizationProfileHeader from 'components/organizationProfile/orgProfileHeader';
import FormSkeleton from 'components/organizationProfile/infoForm/infoForm.skeleton';
import { useOrganization } from 'services/api/lib/organization';

// Dynamic
const OrgInfoForm = dynamic(() => import('components/organizationProfile/infoForm/infoForm'), {
    loading: () => <FormSkeleton />,
});

// Component
const OrganizationProfile: NextPage = () => {
    // States
    const { data: organization } = useOrganization();

    return (
        <>
            <NextSeo title="Perfil de la organización - MATCH" />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/login" />

            <Navbar />

            <HStack mt={{ lg: 12 }}>
                <Container maxW="7xl" p={4}>
                    <OrganizationProfileHeader />

                    <Tabs mt={4} isLazy>
                        <TabList borderBottom="1px">
                            <Tab px={10}>
                                <Icon as={FaInfoCircle} fontSize="lg" mr={4} />
                                Información
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>{organization ? <OrgInfoForm /> : <FormSkeleton />}</TabPanel>
                        </TabPanels>
                    </Tabs>
                </Container>
            </HStack>
        </>
    );
};

// Export
export default OrganizationProfile;
