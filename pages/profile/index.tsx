// Dependencies
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { Container, HStack, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';
import PrivatePage from '@clyc/next-route-manager/components/PrivatePage';
import Navbar from 'layouts/main/navbar';
import ProfileHeader from 'components/profile/header';
import InfoSkeleton from 'components/profile/infoForm/infoForm.skeleton';
import PassSkeleton from 'components/profile/changePassword/changePassword.skeleton';

// Dynamic
const InfoForm = dynamic(() => import('components/profile/infoForm/infoForm'), { loading: () => <InfoSkeleton /> });
const PassForm = dynamic(() => import('components/profile/changePassword/changePassword'), {
    loading: () => <PassSkeleton />,
});

// Component
const UserProfile: NextPage = () => {
    return (
        <>
            <NextSeo title="Perfil de usuario - Skala Desafíos" />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/login" />

            <Navbar />

            <HStack mt={{ lg: 12 }}>
                <Container maxW="7xl" p={4}>
                    <ProfileHeader />

                    <Tabs mt={4} isLazy>
                        <TabList borderBottom="2px" overflowX="auto" overflowY="hidden" pb={0.9}>
                            <Tab px={10} whiteSpace="nowrap">
                                <Icon as={FaUser} fontSize="lg" mr={4} />
                                Información
                            </Tab>
                            <Tab px={10} whiteSpace="nowrap">
                                <Icon as={FaLock} fontSize="lg" mr={4} />
                                Cambiar contraseña
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <InfoForm />
                            </TabPanel>
                            <TabPanel>
                                <PassForm />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Container>
            </HStack>
        </>
    );
};

// Export
export default UserProfile;
