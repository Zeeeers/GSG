// @ts-nocheck

import { Button, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BsCheck } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { GetInterestListResponse } from 'services/api/lib/interest/interest.types';
import { InvestorResponse } from 'services/api/lib/user/user.types';

interface ActiveMatchProps {
    userResponse: InvestorResponse;
    getInterest: GetInterestListResponse;
}

const ActiveMatch = ({ userResponse, getInterest }: ActiveMatchProps) => {
    const router = useRouter();
    return (
        <VStack
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.5,
                },
            }}
            exit={{ opacity: 0 }}
            align="start"
            w="full"
            spacing={{ base: '16px', md: '36px' }}
        >
            <VStack align="start" w="full" spacing="4px">
                <Text fontSize="24px" fontWeight="medium" fontFamily="inter" lineHeight="31.2px">
                    No tienes activo el correo Match
                </Text>
                <Text fontSize="14px" color="gray.400" lineHeight="19.6px" fontFamily="inter">
                    Actualmente no estás recibiendo el correo match con proyectos que coincidan con tus intereses. Si
                    deseas, puedes actualizarlo a continuación
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
                        <Icon
                            as={userResponse?.user.newsletter ? BsCheck : MdClose}
                            color={userResponse?.user.newsletter ? 'teal.500' : 'red.500'}
                            w="24px"
                            h="24px"
                        />
                        <Text>Correo Match</Text>
                    </HStack>

                    <HStack spacing="3px" fontSize="13px" fontFamily="inter">
                        {getInterest?.data?.interests?.has_preferences ? (
                            <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                        ) : (
                            <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                        )}
                        <Text>Intereses</Text>
                    </HStack>
                </Stack>

                <Button
                    onClick={() =>
                        router.push({
                            pathname: '/profile',
                            query: 'tab=1',
                        })
                    }
                    variant="solid"
                    h="40px"
                    w={{ base: 'full', md: 'fit-content' }}
                >
                    Actualizar match
                </Button>
            </Stack>
        </VStack>
    );
};

export default ActiveMatch;
