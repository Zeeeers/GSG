import { Box, Button, Divider, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BsCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { useUser } from 'services/api/lib/user';

interface DiableNotificationExperienceProps {
    setPage: (index: number) => void;
    page: number;
    setStepStatus: (status: 'Process' | 'DisabledNotification' | 'Finished') => void;
}

const DiableNotificationExperience = ({ page, setStepStatus }: DiableNotificationExperienceProps) => {
    const router = useRouter();
    const { data: userResponse } = useUser();

    return (
        <VStack
            as={motion.div}
            initial={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
            w="full"
            align="start"
            spacing="32px"
        >
            <HStack
                spacing="15px"
                align={{ base: 'start', md: 'center' }}
                justify="start"
                display={{ base: 'none', md: 'flex' }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="45px"
                    h="45px"
                    rounded="full"
                    bg="gray.800"
                >
                    <Icon as={MdClose} color="red.500" w="30px" h="30px" />
                </Box>
                <Text
                    fontFamily="inter"
                    fontSize={{ base: '', md: '30px' }}
                    fontWeight="bold"
                    textTransform="uppercase"
                >
                    Correo match
                </Text>
            </HStack>

            {page === 3 ? (
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'start', md: 'center' }}
                    bg="gray.800"
                    py="10px"
                    px="16px"
                    rounded="8px"
                    spacing="10px"
                    w="fit-content"
                >
                    <HStack spacing="0px" fontSize="13px" fontFamily="inter" align="center" justify="center">
                        <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                        <Text fontSize="13px">Contraseña</Text>
                    </HStack>

                    <HStack spacing="0px" fontSize="13px" fontFamily="inter">
                        <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                        <Text fontSize="13px">Nombre</Text>
                    </HStack>

                    <HStack spacing="0px" fontSize="13px" fontFamily="inter" align="center" justify="center">
                        <Icon
                            as={userResponse?.user.organization.image ? BsCheck : MdClose}
                            color={userResponse?.user.organization.image ? 'teal.500' : 'red.500'}
                            w="24px"
                            h="24px"
                        />
                        <Text fontSize="13px">Imagen de perfil</Text>
                    </HStack>

                    <HStack spacing="0px" fontSize="13px" fontFamily="inter">
                        <Icon
                            as={userResponse?.user.organization.legal_representative_phone ? BsCheck : MdClose}
                            color={userResponse?.user.organization.legal_representative_phone ? 'teal.500' : 'red.500'}
                            w="24px"
                            h="24px"
                        />
                        <Text fontSize="13px">Contacto</Text>
                    </HStack>

                    <Divider display={{ base: 'none', md: 'block' }} orientation="vertical" h="20px" w="2px" />

                    <HStack spacing="0px" fontSize="13px" fontFamily="inter">
                        <Icon
                            as={userResponse?.user.newsletter ? BsCheck : MdClose}
                            color={userResponse?.user.newsletter ? 'teal.500' : 'red.500'}
                            w="24px"
                            h="24px"
                        />
                        <Text fontSize="13px">Correo Match</Text>
                    </HStack>

                    <HStack spacing="0px" fontSize="13px" fontFamily="inter">
                        <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                        <Text fontSize="13px">Intereses</Text>
                    </HStack>
                </Stack>
            ) : (
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'start', md: 'center' }}
                    bg="gray.800"
                    py="10px"
                    px="16px"
                    rounded="8px"
                    spacing="24px"
                    w="full"
                    maxW="640px"
                >
                    <HStack spacing="3px" fontSize="13px" fontFamily="inter">
                        <Icon
                            as={userResponse?.user.newsletter ? BsCheck : MdClose}
                            color={userResponse?.user.newsletter ? 'teal.500' : 'red.500'}
                            w="24px"
                            h="24px"
                        />
                        <Text fontSize="13px">Correo Match</Text>
                    </HStack>

                    <HStack spacing="3px" fontSize="13px" fontFamily="inter">
                        <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                        <Text fontSize="13px">Intereses</Text>
                    </HStack>
                </Stack>
            )}

            <VStack align="start" spacing="8px" textAlign="start" w="full" maxW="640px">
                <Text fontSize="24px" lineHeight={{ base: '28.8px', md: '31.2px' }} fontWeight="medium">
                    {page === 3
                        ? 'No recibirás el correo match con proyectos de tu interés,  ¿Seguro que quieres continuar?'
                        : '¿Estás seguro de querer continuar sin seleccionar intereses?'}
                </Text>
                <Text fontFamily="inter" fontSize="16px" lineHeight={{ base: '22.4px', md: '20.8px' }} color="gray.400">
                    {page === 3
                        ? 'Si continúas, te perderás la oportunidad de recibir correos que coincidan con proyectos relacionados a tus preferencias. Puedes cambiar esto luego en tu perfil.'
                        : 'Si no seleccionas algún interés, te perderás la oportunidad de recibir correos que coincidan con proyectos relacionados a tus preferencias. Puedes cambiar esto luego en tu perfil.'}
                </Text>
            </VStack>

            <Stack direction={{ base: 'column', md: 'row' }} w="full" maxW="465px" pt="8px" spacing="16px">
                <Button
                    w="full"
                    variant="solid"
                    h="40px"
                    onClick={() => {
                        setStepStatus('Process');
                    }}
                >
                    {page === 3 ? ' Quiero recibir correos' : 'Seleccionar mis intereses'}
                </Button>
                <Button
                    w="full"
                    variant="outline"
                    h="40px"
                    onClick={() =>
                        router.push({
                            pathname: '/explorer',
                            query: { onboarding: 'filter-experience' },
                        })
                    }
                >
                    Continuar al explorador
                </Button>
            </Stack>
        </VStack>
    );
};

export default DiableNotificationExperience;
