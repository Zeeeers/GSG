import { useState } from 'react';
import ProfileExperience from 'components/experience/profileExperience';
import { Stack, VStack, HStack } from '@chakra-ui/react';
import InterestExperience from 'components/experience/interestExperience';
import { PrivatePage } from '@clyc/next-route-manager';
import { AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';

const Experience = () => {
    const [indexPage, setIndexPage] = useState(0);
    const pages = [
        <ProfileExperience key="perfil-experienceKey" setPage={setIndexPage} />,
        <InterestExperience key="interest-experienceKey" setPage={setIndexPage} />,
    ];

    return (
        <>
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/login" />
            <NextSeo title={'Bienvenidos a GSG'} />
            <Stack
                w="full"
                h={{ base: indexPage === 0 ? '100vh' : 'full', md: '100vh' }}
                align="center"
                justify="center"
            >
                <Stack
                    w={{ base: 'fit-content', md: '800px' }}
                    direction={{ base: 'column', md: 'row' }}
                    alignItems="center"
                    spacing={0}
                    background="gray.800"
                    px={{ base: '25px', md: '70px' }}
                    py="40px"
                    rounded="16px"
                >
                    <VStack h="full" w="full" align={{ base: 'center', md: 'flex-end' }}>
                        <HStack w="full" spacing="5px" pb="20px">
                            <Stack
                                background={indexPage === 0 ? 'teal.500' : 'white'}
                                w="10px"
                                h="10px"
                                rounded="full"
                            ></Stack>
                            <Stack
                                background={indexPage === 0 ? 'white' : 'teal.500'}
                                w="10px"
                                h="10px"
                                rounded="full"
                            ></Stack>
                        </HStack>
                        <AnimatePresence exitBeforeEnter>{pages[indexPage]}</AnimatePresence>
                    </VStack>
                </Stack>
            </Stack>
        </>
    );
};

export default Experience;
