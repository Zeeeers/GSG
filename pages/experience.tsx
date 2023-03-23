import { useState } from 'react';
import ProfileExperience from 'components/experience/profileExperience';
import { Stack, VStack, HStack, Text, Img, Container, Box, Icon } from '@chakra-ui/react';
import InterestExperience from 'components/experience/interestExperience';
import { PrivatePage } from '@clyc/next-route-manager';
import { AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import ProfileNameExperience from 'components/experience/profileNameExperience';
import { IoIosArrowBack } from 'react-icons/io';
import PhoneExperience from 'components/experience/phoneExperience';
import NotificationExperience from 'components/experience/notificationExperience';
import DiableNotificationExperience from 'components/experience/disableNotificationExperience';
import SuccessExperience from 'components/experience/sucessExperience';

const Experience = () => {
    const [indexPage, setIndexPage] = useState(0);

    const [stepStatus, setStepStatus] = useState<'Process' | 'DisabledNotification' | 'Finished'>('Process');

    const pages = [
        <ProfileNameExperience key="name-experienceKey" setPage={setIndexPage} />,
        <PhoneExperience key="phone-experienceKey" setPage={setIndexPage} />,
        <ProfileExperience key="perfil-experienceKey" setPage={setIndexPage} />,
        <NotificationExperience
            key="notification-experienceKey"
            setPage={setIndexPage}
            setStepStatus={setStepStatus}
        />,
        <InterestExperience key="interest-experienceKey" setPage={setIndexPage} setStepStatus={setStepStatus} />,
    ];

    return (
        <>
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/login" />
            <NextSeo title="Bienvenidos a MATCH" />

            <Container
                display="flex"
                maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }}
                justifyContent="center"
                py={{ base: '15px', md: '50px' }}
            >
                <Img
                    src="https://skala-chile.s3.us-east-2.amazonaws.com/production/match_logo_V.2.png"
                    w="133px"
                    h="35px"
                />
            </Container>

            {stepStatus === 'Process' ? (
                <Stack w="full" align="center" justify="center" mt="61px">
                    <Stack
                        w={{ base: 'fit-content', md: 'full' }}
                        maxW={indexPage <= 2 ? '350px' : indexPage === 3 ? '518px' : '660px'}
                        direction={{ base: 'column', md: 'row' }}
                        alignItems="center"
                        spacing={0}
                        background="transparent"
                        px={{ base: '16px', md: '0' }}
                        rounded="16px"
                    >
                        <VStack h="full" w="full" align={{ base: 'center', md: 'flex-end' }}>
                            <HStack align="center" w="full" spacing="2" pb="20px" fontSize="sm" fontFamily="inter">
                                {indexPage !== 0 && (
                                    <Box
                                        as="button"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        rounded="4px"
                                        w="31px"
                                        h="28px"
                                        bg="gray.800"
                                        _hover={{ bg: 'gray.700' }}
                                        cursor="pointer"
                                        p={0}
                                        onClick={() => setIndexPage(indexPage - 1)}
                                    >
                                        <Icon as={IoIosArrowBack} w="20px" h="20px" />
                                    </Box>
                                )}

                                <Text fontWeight="bold">Paso</Text>
                                <HStack align="start" spacing={0}>
                                    <Text fontWeight="bold">{indexPage + 1}</Text>
                                    <Text color="gray.500">/</Text>
                                    <Text color="gray.500">{pages.length}</Text>
                                </HStack>
                            </HStack>
                            <AnimatePresence exitBeforeEnter>{pages[indexPage]}</AnimatePresence>
                        </VStack>
                    </Stack>
                </Stack>
            ) : stepStatus === 'DisabledNotification' ? (
                <Stack w="full" align="center" justify="center" mt={{ base: '26px', md: '150px' }}>
                    <Stack
                        w={{ base: 'fit-content', md: 'full' }}
                        maxW="744px"
                        direction={{ base: 'column', md: 'row' }}
                        alignItems="center"
                        spacing={0}
                        background="transparent"
                        px={{ base: '16px', md: '0' }}
                        rounded="16px"
                    >
                        <VStack h="full" w="full" align={{ base: 'center', md: 'flex-end' }}>
                            <AnimatePresence exitBeforeEnter>
                                <DiableNotificationExperience setPage={setIndexPage} setStepStatus={setStepStatus} />
                            </AnimatePresence>
                        </VStack>
                    </Stack>
                </Stack>
            ) : (
                <Stack w="full" align="center" justify="center" mt="150px">
                    <Stack
                        w={{ base: 'fit-content', md: 'full' }}
                        maxW="744px"
                        direction={{ base: 'column', md: 'row' }}
                        alignItems="center"
                        spacing={0}
                        background="transparent"
                        px={{ base: '25px', md: '0' }}
                        rounded="16px"
                    >
                        <VStack h="full" w="full" align={{ base: 'center', md: 'flex-end' }}>
                            <AnimatePresence exitBeforeEnter>
                                <SuccessExperience />
                            </AnimatePresence>
                        </VStack>
                    </Stack>
                </Stack>
            )}
        </>
    );
};

export default Experience;
