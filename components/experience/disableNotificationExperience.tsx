import { Box, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BsCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

interface DiableNotificationExperienceProps {
    setPage: (index: number) => void;
    setStepStatus: (status: 'Process' | 'DisabledNotification' | 'Finished') => void;
}

const DiableNotificationExperience = ({ setPage, setStepStatus }: DiableNotificationExperienceProps) => {
    const router = useRouter();

    return (
        <VStack
            as={motion.div}
            initial={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
            w="full"
            align="center"
            spacing="24px"
        >
            <HStack spacing="15px" align="center">
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
                <Text fontSize="30px" fontFamily="inter">
                    Intereses
                </Text>
            </HStack>

            <HStack align="center" bg="gray.800" py="10px" px="16px" rounded="8px" spacing="24px">
                <HStack spacing="3px">
                    <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                    <Text>Contraseña</Text>
                </HStack>

                <HStack spacing="3px">
                    <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                    <Text>Nombre</Text>
                </HStack>

                <HStack spacing="3px">
                    <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                    <Text>Imagen de perfil</Text>
                </HStack>

                <HStack spacing="3px">
                    <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                    <Text>Contacto</Text>
                </HStack>
            </HStack>

            <VStack align="center" spacing="8px" textAlign="center">
                <Text fontSize="30px" fontWeight="medium">
                    Tu cuenta está completa pero no seleccionaste intereses
                </Text>
                <Text w="full" maxW="660px" fontFamily="inter" fontSize="16px">
                    Si quieres activar y recibir correos con proyectos relacionados a tus intereses en áreas de alto
                    impacto puedes hacerlo desde tu perfil
                </Text>
            </VStack>

            <HStack w="full" maxW="465px" pt="8px">
                <Button
                    w="full"
                    variant="solid"
                    h="40px"
                    onClick={() => {
                        setPage(4);
                        setStepStatus('Process');
                    }}
                >
                    Quiero recibir correos
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
                    Ir al explorador
                </Button>
            </HStack>
        </VStack>
    );
};

export default DiableNotificationExperience;
