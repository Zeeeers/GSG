// @ts-nocheck
import CapitalStageModal from 'components/profile/ods/capitalStageModal';
import ExpectedRentabilityModal from 'components/profile/ods/expectedRentabilityModal';
import FinanceGoalModal from 'components/profile/ods/FinanceGoalModal';
import OdsModal from 'components/profile/ods/odsModal';
import StageModal from 'components/profile/ods/stageModal';
import ThirdModal from 'components/profile/ods/thirdModal';
import TimeLapseModal from 'components/profile/ods/timeLapseModal';
import { useState, useEffect } from 'react';
import { Button, HStack, Icon, Img, Stack, Text, useDisclosure, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { useInterest, useInterestList } from 'services/api/lib/interest';
import { useUser } from 'services/api/lib/user';
import { sendInterest } from 'services/api/lib/user/user.calls';
import { motion } from 'framer-motion';
import { BsCheck } from 'react-icons/bs';
import { Frequency } from 'services/api/types/User';

interface Props {
    setPage: (index: number) => void;
    setStepStatus: (status: 'Process' | 'DisabledNotification' | 'Finished') => void;
}

const InterestExperience = ({ setPage, setStepStatus }: Props) => {
    const [isActive, setIsActive] = useState(false);
    const [isOnboarding, setIsOnboarding] = useState(null);
    const { isOpen: isOpenOds, onOpen: openOds, onClose: closeOds } = useDisclosure();
    const { isOpen: isOpenThird, onOpen: openThird, onClose: closeThird } = useDisclosure();
    const { isOpen: isOpenStage, onOpen: openStage, onClose: closeStage } = useDisclosure();
    const { isOpen: isOpenCapitalStage, onOpen: openCapitalStage, onClose: closeCapitalStage } = useDisclosure();
    const { isOpen: isOpenFinanceGoal, onOpen: openFinanceGoal, onClose: closeFinanceGoal } = useDisclosure();
    const {
        isOpen: isOpenExpectedRentabilityModal,
        onOpen: openExpectedRentabilityModal,
        onClose: closeExpectedRentabilityModal,
    } = useDisclosure();
    const { isOpen: isOpenTimeLapse, onOpen: openTimeLapse, onClose: closeTimeLapse } = useDisclosure();

    const { data: interest } = useInterestList();
    const { data: getInterest, mutate: interestReload } = useInterest();
    const { data: userResponse, mutate } = useUser();

    const formatFrecuency = (frecuency: Frequency) => {
        if (!frecuency) {
            return null;
        }

        const frecuencyData = {
            biweekly: 'quincenalmente',
            monthly: 'mensualmente',
        };

        return frecuencyData[frecuency];
    };

    const handleOnboarding = async () => {
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const AuthManager = (await auth).default;

        if (
            !(
                getInterest?.data?.interests.capital_stage == null &&
                getInterest?.data.interests.expected_rentability == null &&
                getInterest?.data?.interests.finance_goal == null &&
                getInterest?.data?.interests.stage == null &&
                getInterest?.data?.interests.time_lapse == null &&
                getInterest?.data.interests.third_party == null &&
                getInterest?.data?.interests.qualities == null
            )
        ) {
            const { ok: sendOK, data: send } = await sendInterest({
                token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
                id: userResponse?.user?.id,
            });

            setStepStatus('Finished');
        } else {
            setStepStatus('DisabledNotification');
        }
    };

    useEffect(() => {
        if (userResponse) {
            //@ts-ignore
            setIsActive(userResponse?.user?.newsletter);
            setIsOnboarding(userResponse?.user?.onboarding);
        }
    }, [userResponse]);

    return (
        <>
            <Stack
                as={motion.div}
                initial={{ x: -200, opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
                spacing="30px"
                w="full"
                h="full"
                pb="200px"
            >
                <HStack px="16px" py="8px" w="fit-content" bg="gray.800" rounded="4px" h="33px">
                    <Icon as={BsCheck} w="25px" h="25px" color="teal.500" />
                    <Text fontSize="14px" fontWeight="medium" fontFamily="inter">
                        Deseo recibir correos {formatFrecuency(userResponse?.user.frequency_newsletter ?? null)}
                    </Text>
                </HStack>
                <VStack alignItems="flex-start" spacing="10px" w="full">
                    <Text fontSize="30px" fontWeight="bold" textTransform="uppercase" lineHeight="130%">
                        Elige tus intereses
                    </Text>
                    <Text fontSize="16px" fontWeight={'normal'} fontFamily="inter" lineHeight={6}>
                        Selecciona tus intereses en cada una de las siguientes categorías, te haremos recomendaciones a
                        tu correo con proyectos que hagan match de acuerdo ellos.
                    </Text>
                </VStack>

                <VStack h="full" align="flex-start" justify="space-between" spacing="30px" w="full">
                    <Stack maxH="400px" overflow={{ base: 'auto', md: 'hidden' }}>
                        <Wrap h="full" spacingX="30px" spacingY="20px" fontFamily="inter">
                            <WrapItem w={{ base: 'full', sm: 'fit-content' }}>
                                <VStack
                                    onClick={openOds}
                                    cursor="pointer"
                                    transitionDuration={'250ms'}
                                    _hover={{ bg: 'gray.600' }}
                                    justify="center"
                                    w={{ base: 'full', sm: '200px' }}
                                    h="100px"
                                    spacing="13px"
                                    bg="gray.700"
                                    rounded="8px"
                                >
                                    <Img src="/images/icons/ods.svg" />
                                    <Text>ODS</Text>
                                </VStack>
                            </WrapItem>
                            <WrapItem w={{ base: 'full', sm: 'fit-content' }}>
                                <VStack
                                    onClick={openThird}
                                    cursor="pointer"
                                    transitionDuration={'250ms'}
                                    _hover={{ bg: 'gray.600' }}
                                    justify="center"
                                    w={{ base: 'full', sm: '200px' }}
                                    h="100px"
                                    spacing="13px"
                                    bg="gray.700"
                                    rounded="8px"
                                >
                                    <Img src="/images/icons/certification.svg" />
                                    <Text>Certificación</Text>
                                </VStack>
                            </WrapItem>
                            <WrapItem w={{ base: 'full', sm: 'fit-content' }}>
                                <VStack
                                    onClick={openStage}
                                    cursor="pointer"
                                    transitionDuration={'250ms'}
                                    _hover={{ bg: 'gray.600' }}
                                    justify="center"
                                    w={{ base: 'full', sm: '200px' }}
                                    h="100px"
                                    spacing="13px"
                                    bg="gray.700"
                                    rounded="8px"
                                >
                                    <Img src="/images/icons/proyect-stages.svg" />
                                    <Text>Etapa del proyecto</Text>
                                </VStack>
                            </WrapItem>
                            <WrapItem w={{ base: 'full', sm: 'fit-content' }}>
                                <VStack
                                    onClick={openCapitalStage}
                                    cursor="pointer"
                                    transitionDuration={'250ms'}
                                    _hover={{ bg: 'gray.600' }}
                                    justify="center"
                                    w={{ base: 'full', sm: '200px' }}
                                    h="100px"
                                    spacing="13px"
                                    bg="gray.700"
                                    rounded="8px"
                                >
                                    <Img src="/images/icons/survey-stages.svg" />
                                    <Text>Tipo de financiamiento</Text>
                                </VStack>
                            </WrapItem>
                            <WrapItem w={{ base: 'full', sm: 'fit-content' }}>
                                <VStack
                                    onClick={openExpectedRentabilityModal}
                                    cursor="pointer"
                                    transitionDuration={'250ms'}
                                    _hover={{ bg: 'gray.600' }}
                                    justify="center"
                                    w={{ base: 'full', sm: '200px' }}
                                    h="100px"
                                    spacing="13px"
                                    bg="gray.700"
                                    rounded="8px"
                                >
                                    <Img src="/images/icons/expected-return.svg" />
                                    <Text>Rentabilidad esperada</Text>
                                </VStack>
                            </WrapItem>
                            <WrapItem w={{ base: 'full', sm: 'fit-content' }}>
                                <VStack
                                    onClick={openFinanceGoal}
                                    cursor="pointer"
                                    transitionDuration={'250ms'}
                                    _hover={{ bg: 'gray.600' }}
                                    justify="center"
                                    w={{ base: 'full', sm: '200px' }}
                                    h="100px"
                                    spacing="13px"
                                    bg="gray.700"
                                    rounded="8px"
                                >
                                    <Img src="/images/icons/amount-contribution.svg" />
                                    <Text>Monto de aporte</Text>
                                </VStack>
                            </WrapItem>
                            <WrapItem w={{ base: 'full', sm: 'fit-content' }}>
                                <VStack
                                    onClick={openTimeLapse}
                                    cursor="pointer"
                                    transitionDuration={'250ms'}
                                    _hover={{ bg: 'gray.600' }}
                                    justify="center"
                                    w={{ base: 'full', sm: '200px' }}
                                    h="100px"
                                    spacing="13px"
                                    bg="gray.700"
                                    rounded="8px"
                                >
                                    <Img src="/images/icons/investment-terms.svg" />
                                    <Text>Plazos de inversión</Text>
                                </VStack>
                            </WrapItem>
                        </Wrap>
                    </Stack>
                    <Button variant="solid" h="40px" onClick={handleOnboarding} w="full">
                        Finalizar
                    </Button>
                </VStack>
            </Stack>

            <OdsModal
                isOpen={isOpenOds}
                onClose={closeOds}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
                interestReload={interestReload}
            />
            <ThirdModal
                isOpen={isOpenThird}
                onClose={closeThird}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
            />
            <StageModal
                isOpen={isOpenStage}
                onClose={closeStage}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
            />
            <CapitalStageModal
                isOpen={isOpenCapitalStage}
                onClose={closeCapitalStage}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
            />
            <ExpectedRentabilityModal
                isOpen={isOpenExpectedRentabilityModal}
                onClose={closeExpectedRentabilityModal}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
            />
            <FinanceGoalModal
                isOpen={isOpenFinanceGoal}
                onClose={closeFinanceGoal}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
            />
            <TimeLapseModal
                isOpen={isOpenTimeLapse}
                onClose={closeTimeLapse}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
            />
        </>
    );
};

export default InterestExperience;
