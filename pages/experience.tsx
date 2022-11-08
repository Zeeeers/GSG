import Navbar from 'layouts/main/navbar';
import { useState } from 'react';
import ProfileExperience from 'components/experience/profileExperience';
import { Stack, VStack, HStack } from '@chakra-ui/react';
import InterestExperience from 'components/experience/interestExperience';

const Experience = () => {
    const [indexPage, setIndexPage] = useState(0);
    const pages = [
        <ProfileExperience key="perfil-experienceKey" setPage={setIndexPage} />,
        <InterestExperience key="interest-experienceKey" setPage={setIndexPage} />,
    ];

    return (
        <>
            <Navbar />

            <Stack w="full" align="center">
                <Stack
                    w="800px"
                    direction={{ base: 'column', md: 'row' }}
                    alignItems="center"
                    spacing={0}
                    background="gray.800"
                    px="70px"
                    py="40px"
                    mt="150px"
                    rounded="16px"
                >
                    <VStack w="full" align="flex-end">
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

                        {pages[indexPage]}
                    </VStack>
                </Stack>
            </Stack>
        </>
    );
};

export default Experience;
