import { HStack, Icon, Stack, Text, VStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useRouter } from 'next/router';
import { BsCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { InvestorResponse } from 'services/api/lib/user/user.types';

interface ProfileIncompleteProps {
    userResponse: InvestorResponse;
    openPhone: () => void;
}

const ProfileIncomplete = ({ userResponse, openPhone }: ProfileIncompleteProps) => {
    const router = useRouter();

    return (
        <VStack
            as={motion.div}
            initial={{ opacity: 0, x: 100 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.5,
                },
            }}
            exit={{ opacity: 0 }}
            align="start"
            spacing="16px"
        >
            <VStack align="start" w="full" spacing="4px">
                <Text fontSize="24px" fontWeight="medium" fontFamily="inter" lineHeight="31.2px">
                    Ayúdanos a completar tu perfil
                </Text>

                <Text fontSize="14px" color="gray.400" lineHeight="19.6px" fontFamily="inter">
                    Agrega tu número de contacto en tu perfil y potencia la comunicación con nuestra comunidad de
                    inversionistas. No es obligatorio, pero nos encantará contar contigo
                </Text>
            </VStack>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                w="full"
                justify="space-between"
                spacing={{ base: '16px', md: '8px' }}
            >
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'start', md: 'center' }}
                    bg="gray.700"
                    py="8px"
                    px="10px"
                    rounded="8px"
                    spacing={{ base: '16px', md: '24px' }}
                >
                    <HStack spacing="3px" fontSize="13px" fontFamily="inter">
                        <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                        <Text>Contraseña</Text>
                    </HStack>

                    <HStack spacing="3px" fontSize="13px" fontFamily="inter">
                        <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                        <Text>Nombre</Text>
                    </HStack>

                    <HStack spacing="3px" fontSize="13px" fontFamily="inter">
                        {userResponse?.user?.organization?.image ? (
                            <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                        ) : (
                            <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                        )}
                        <Text>Imagen de perfil</Text>
                    </HStack>

                    <HStack spacing="3px" fontSize="13px" fontFamily="inter">
                        {userResponse?.user?.organization?.legal_representative_phone &&
                        isValidPhoneNumber(userResponse?.user?.organization?.legal_representative_phone) ? (
                            <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                        ) : (
                            <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                        )}
                        <Text>Contacto</Text>
                    </HStack>
                </Stack>

                <Button
                    onClick={() => {
                        if (
                            userResponse?.user?.organization?.legal_representative_phone &&
                            isValidPhoneNumber(userResponse?.user?.organization?.legal_representative_phone)
                        ) {
                            openPhone();
                        } else {
                            router.push({
                                pathname: '/profile',
                                query: 'tab=0',
                            });
                        }
                    }}
                    variant="outline"
                    h="40px"
                    w={{ base: 'full', md: 'fit-content' }}
                >
                    Actualizar perfil
                </Button>
            </Stack>
        </VStack>
    );
};

export default ProfileIncomplete;
