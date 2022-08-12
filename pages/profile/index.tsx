// Dependencies
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { Container, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PrivatePage from '@clyc/next-route-manager/components/PrivatePage';
import Navbar from 'layouts/main/navbar';
import ProfileHeader from 'components/profile/header';
import InfoSkeleton from 'components/profile/infoForm/infoForm.skeleton';
import PassSkeleton from 'components/profile/changePassword/changePassword.skeleton';
import OdsTab from 'components/profile/ods/odsTab';

// Dynamic
const InfoForm = dynamic(() => import('components/profile/infoForm/infoForm'), { loading: () => <InfoSkeleton /> });
const PassForm = dynamic(() => import('components/profile/changePassword/changePassword'), {
    loading: () => <PassSkeleton />,
});

// Component
const UserProfile: NextPage = () => {
    return (
        <>
            <NextSeo title="Perfil de usuario - GSG" />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/login" />

            <Navbar />

            <HStack mt={{ lg: 10 }} px={{ base: '25px' }} py={{ base: '140px', md: '50px' }}>
                <Container
                    maxW="4xl"
                    px={{ base: '15px', md: '37px' }}
                    py={{ base: '60px', md: '40px' }}
                    rounded="xl"
                    shadow={'md'}
                    bg={'gray.700'}
                >
                    <ProfileHeader />

                    <Tabs mt="33px" fontFamily="inter" fontWeight="normal" fontSize="md" isLazy>
                        <TabList borderBottom="0" overflowX="auto" overflowY="hidden" pb="15px">
                            <Tab px="30px" whiteSpace="nowrap">
                                Intereses
                            </Tab>
                            <Tab px="30px" whiteSpace="nowrap">
                                Perfil
                            </Tab>
                            <Tab px="30px" whiteSpace="nowrap">
                                Contraseña
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <OdsTab />
                            </TabPanel>
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
