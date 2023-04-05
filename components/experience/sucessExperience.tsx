import { Box, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BsCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { useUser } from 'services/api/lib/user';

const SuccessExperience = () => {
    const router = useRouter();
    const { data: userResponse } = useUser();

    useEffect(() => {
        setTimeout(() => {
            router.push({
                pathname: '/explorer',
                query: { onboarding: 'filter-experience' },
            });
        }, 6000);
    }, [router]);

    return (
        <VStack
            as={motion.div}
            initial={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.5 } }}
            w="full"
            align="center"
            spacing="48px"
        >
            <Stack align="start" spacing="32px">
                <VStack spacing="24px" align="start">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="90px"
                        h="90px"
                        bg="gray.800"
                        rounded="full"
                    >
                        <Icon as={BsCheck} w="54px" h="54px" color="teal.500" />
                    </Box>
                    <Text fontSize="30px" fontWeight="bold">
                        CREANDO TU CUENTA
                    </Text>
                </VStack>

                <VStack spacing="16px" align="start">
                    <HStack
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: 'spring', duration: 1, delay: 1 } }}
                        spacing="8px"
                        align="center"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="24px"
                            h="24px"
                            bg="gray.800"
                            rounded="full"
                        >
                            <Icon as={BsCheck} w="20px" h="20px" color="teal.500" />
                        </Box>
                        <Text>Contraseña</Text>
                    </HStack>

                    <HStack
                        spacing="8px"
                        align="center"
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: 'spring', duration: 1, delay: 2 } }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="24px"
                            h="24px"
                            bg="gray.800"
                            rounded="full"
                        >
                            <Icon as={BsCheck} w="20px" h="20px" color="teal.500" />
                        </Box>
                        <Text>Nombre</Text>
                    </HStack>

                    <HStack
                        spacing="8px"
                        align="center"
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: 'spring', duration: 1, delay: 3 } }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="24px"
                            h="24px"
                            bg="gray.800"
                            rounded="full"
                        >
                            <Icon
                                as={userResponse?.user.organization.image ? BsCheck : MdClose}
                                color={userResponse?.user.organization.image ? 'teal.500' : 'red.500'}
                                w="20px"
                                h="20px"
                            />
                        </Box>
                        <Text>Imagen de perfil</Text>
                    </HStack>

                    <HStack
                        spacing="8px"
                        align="center"
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: 'spring', duration: 1, delay: 4 } }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="24px"
                            h="24px"
                            bg="gray.800"
                            rounded="full"
                        >
                            <Icon
                                as={userResponse?.user.organization.legal_representative_phone ? BsCheck : MdClose}
                                color={
                                    userResponse?.user.organization.legal_representative_phone ? 'teal.500' : 'red.500'
                                }
                                w="20px"
                                h="20px"
                            />
                        </Box>
                        <Text>Contacto</Text>
                    </HStack>

                    <HStack
                        spacing="8px"
                        align="center"
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: 'spring', duration: 1, delay: 5 } }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="24px"
                            h="24px"
                            bg="gray.800"
                            rounded="full"
                        >
                            <Icon as={BsCheck} w="20px" h="20px" color="teal.500" />
                        </Box>
                        <Text>Intereses</Text>
                    </HStack>
                </VStack>
            </Stack>
        </VStack>
    );
};

export default SuccessExperience;
