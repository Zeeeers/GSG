import { HStack } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody, VStack, Text, Button, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';

interface CurrentGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CurrentGoalModal = ({ isOpen, onClose }: CurrentGoalModalProps) => {
    const [currentGoal, setCurrentGoal] = useState<'visibility' | 'fundraising' | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const createDraft = async () => {
        const { create } = await import('../../services/api/lib/gsg');
        setLoading(true);

        try {
            const { ok, data } = await create({
                project: { status: 'sketch' },
            });

            if (ok) {
                router
                    .push({ pathname: `/creator/${currentGoal}`, query: { id: data?.data?.gsg_project?.id } })
                    .then(() => setLoading(false));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" p={0} bg="gray.700">
                <ModalBody w="full" px="32px" py="48px">
                    <VStack w="full" align="start" spacing="24px">
                        <VStack textAlign="start">
                            <Text fontSize="3xl" fontWeight="bold" lineHeight="120%" textTransform="uppercase">
                                ¿Cuál es el motivo que tienes al postular este proyecto?
                            </Text>
                            <Text color="gray.50" lineHeight="140%">
                                De acuerdo a tu elección se habilitarán campos distintos que tendrás que completar para
                                subir tu proyecto en Match. Así mismo, se le hará saber a inversionistas si tu proyecto
                                busca levantar inversión o no.
                            </Text>
                        </VStack>

                        <VStack align="start" w="full" spacing="16px">
                            <HStack
                                cursor="pointer"
                                align="center"
                                justify="space-between"
                                w="full"
                                bg={currentGoal === 'visibility' ? 'gray.500' : 'gray.600'}
                                px="24px"
                                py="13.5px"
                                h="fit-content"
                                rounded="8px"
                                transitionDuration="0.2s"
                                _hover={{ bg: 'gray.500' }}
                                onClick={() => setCurrentGoal('visibility')}
                            >
                                <Text fontWeight="normal" fontFamily="inter" fontSize="16px">
                                    Busco visibilizar mi proyecto de impacto
                                </Text>
                                {currentGoal === 'visibility' && (
                                    <Stack
                                        as={motion.div}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        bg="teal.500"
                                        align="center"
                                        justify="center"
                                        rounded="full"
                                        w="25px"
                                        h="25px"
                                    >
                                        <Icon as={BsCheck} w="22px" h="22px" />
                                    </Stack>
                                )}
                            </HStack>

                            <HStack
                                cursor="pointer"
                                align="center"
                                justify="space-between"
                                w="full"
                                bg={currentGoal === 'fundraising' ? 'gray.500' : 'gray.600'}
                                px="24px"
                                py="13.5px"
                                h="fit-content"
                                rounded="8px"
                                transitionDuration="0.2s"
                                _hover={{ bg: 'gray.500' }}
                                onClick={() => setCurrentGoal('fundraising')}
                            >
                                <Text fontWeight="normal" fontFamily="inter" fontSize="16px">
                                    Busco levantar inversión para mi proyecto de impacto
                                </Text>

                                {currentGoal === 'fundraising' && (
                                    <Stack
                                        as={motion.div}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        bg="teal.500"
                                        align="center"
                                        justify="center"
                                        rounded="full"
                                        w="25px"
                                        h="25px"
                                    >
                                        <Icon as={BsCheck} w="22px" h="22px" />
                                    </Stack>
                                )}
                            </HStack>
                        </VStack>

                        <Button
                            onClick={createDraft}
                            type="submit"
                            w="full"
                            variant="solid"
                            h="40px"
                            isLoading={loading}
                        >
                            Continuar
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CurrentGoalModal;
