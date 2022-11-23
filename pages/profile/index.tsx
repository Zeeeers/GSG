// Dependencies
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PrivatePage from '@clyc/next-route-manager/components/PrivatePage';
import Navbar from 'layouts/main/navbar';
import InfoSkeleton from 'components/profile/infoForm/infoForm.skeleton';
import PassSkeleton from 'components/profile/changePassword/changePassword.skeleton';
import OdsTab from 'components/profile/ods/odsTab';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Dynamic
const InfoForm = dynamic(() => import('components/profile/infoForm/infoForm'), { loading: () => <InfoSkeleton /> });
const PassForm = dynamic(() => import('components/profile/changePassword/changePassword'), {
    loading: () => <PassSkeleton />,
});

// Component
const UserProfile: NextPage = () => {
    const [indexPage, setIndexPage] = useState(0);
    const router = useRouter();

    const { tab } = router.query;

    useEffect(() => {
        if (tab) {
            setIndexPage(parseInt(tab.toString()));
        }
    }, [tab]);

    return (
        <>
            <NextSeo title="Perfil de usuario - GSG" />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/login" />

            <Navbar />

            <Container
                maxW="4xl"
                px={{ base: '15px', md: '70px' }}
                py={{ base: '60px', md: '40px' }}
                rounded="xl"
                shadow={'md'}
                bg={'gray.800'}
                mt="120px"
            >
                <Tabs
                    onChange={(index) => setIndexPage(index)}
                    index={indexPage}
                    p={0}
                    fontFamily="inter"
                    fontWeight="normal"
                    fontSize="md"
                    isLazy
                >
                    <TabList pl="20px" borderBottom="0" overflowX="auto" overflowY="hidden" pb="15px">
                        <Tab px="30px" whiteSpace="nowrap">
                            Perfil
                        </Tab>
                        <Tab px="30px" whiteSpace="nowrap">
                            Intereses
                        </Tab>

                        <Tab px="30px" whiteSpace="nowrap">
                            Contraseña
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <InfoForm />
                        </TabPanel>
                        <TabPanel>
                            <OdsTab />
                        </TabPanel>

                        <TabPanel>
                            <PassForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </>
    );
};

// Export
export default UserProfile;
