//@ts-nocheck
import CapitalStageModal from 'components/profile/ods/capitalStageModal';
import ExpectedRentabilityModal from 'components/profile/ods/expectedRentabilityModal';
import FinanceGoalModal from 'components/profile/ods/FinanceGoalModal';
import OdsModal from 'components/profile/ods/odsModal';
import OnboardingModal from 'components/profile/ods/onboardingModal';
import StageModal from 'components/profile/ods/stageModal';
import ThirdModal from 'components/profile/ods/thirdModal';
import TimeLapseModal from 'components/profile/ods/timeLapseModal';
import { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    HStack,
    Img,
    Stack,
    Text,
    useDisclosure,
    useToast,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useInterest, useInterestList } from 'services/api/lib/interest';
import { useUser } from 'services/api/lib/user';
import { sendInterest } from 'services/api/lib/user/user.calls';
import { motion } from 'framer-motion';

interface Props {
    setPage: (index: number) => void;
}

const InterestExperience = ({ setPage }: Props) => {
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
    const { isOpen: isOpenOnboarding, onOpen: openOnboarding, onClose: closeOnboarding } = useDisclosure();

    const { data: interest } = useInterestList();
    const { data: getInterest } = useInterest();
    const { data: user, mutate } = useUser();

    const toast = useToast();
    const router = useRouter();

    const handleUpdateNews = async () => {
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('../../services/api/lib/user');

        const AuthManager = (await auth).default;
        const { update } = await userApi;

        const { ok, data } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            //@ts-ignore
            data: {
                newsletter: !isActive,
            },
        });

        if (ok) {
            mutate().then(() =>
                toast({
                    //@ts-ignore
                    title: data?.user.newsletter
                        ? 'La recepción de correos de acuerdo a los intereses ha sido activado con éxito'
                        : 'La recepción de correos de acuerdo a los intereses ha sido desactivada con éxito',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                }),
            );
        } else {
            toast({
                title: 'Ha ocurrido un error la intentar activar el acuerdo de recepcion de correos.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            setIsActive(false);
        }
    };

    const handleUpdateOnboarding = async (value) => {
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('../../services/api/lib/user');

        const AuthManager = (await auth).default;
        const { update } = await userApi;

        const { ok, data } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            //@ts-ignore
            data: {
                onboarding: !value,
            },
        });

        const { ok: sendOK, data: send } = await sendInterest({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            id: user?.id,
        });
    };

    const handleOnboarding = async () => {
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('../../services/api/lib/user');

        const AuthManager = (await auth).default;

        const { ok: sendOK, data: send } = await sendInterest({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            id: user?.id,
        });
    };

    useEffect(() => {
        if (user) {
            //@ts-ignore
            setIsActive(user?.newsletter);
            setIsOnboarding(user?.onboarding);
        }
    }, [user]);

    return (
        <>
            <Stack
                as={motion.div}
                initial={{ x: -200, opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
                spacing="30px"
                mt="30px"
                w="full"
            >
                <VStack alignItems="flex-start" spacing="10px" w="full">
                    <Text fontSize="30px" fontWeight="bold" textTransform="uppercase" lineHeight="130%">
                        Selecciona tus intereses
                    </Text>
                    <Text fontSize="16px" fontWeight={'normal'} fontFamily="inter" lineHeight={6}>
                        Te haremos recomendaciones a tu correo de acuerdo a los intereses que selecciones en las
                        siguientes categorías
                    </Text>
                </VStack>

                <VStack align="flex-start" spacing="30px" w="full">
                    <HStack>
                        <Checkbox isChecked={isActive} onChange={handleUpdateNews} />
                        <Text fontFamily="inter">
                            Deseo rercibir correos semanalmente con proyectos relacionados a mis intereses
                        </Text>
                    </HStack>
                    <Wrap spacingX="30px" spacingY="20px" fontFamily="inter">
                        <WrapItem>
                            <VStack
                                onClick={openOds}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.600' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.700"
                                rounded="8px"
                            >
                                <Img src="/images/icons/ods.svg" />
                                <Text>ODS</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem>
                            <VStack
                                onClick={openThird}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.600' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.700"
                                rounded="8px"
                            >
                                <Img src="/images/icons/certification.svg" />
                                <Text>Certificación</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem>
                            <VStack
                                onClick={openStage}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.600' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.700"
                                rounded="8px"
                            >
                                <Img src="/images/icons/proyect-stages.svg" />
                                <Text>Etapa del proyecto</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem>
                            <VStack
                                onClick={openCapitalStage}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.600' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.700"
                                rounded="8px"
                            >
                                <Img src="/images/icons/survey-stages.svg" />
                                <Text>Tipo de financiamiento</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem>
                            <VStack
                                onClick={openExpectedRentabilityModal}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.600' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.700"
                                rounded="8px"
                            >
                                <Img src="/images/icons/expected-return.svg" />
                                <Text>Rentabilidad esperada</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem>
                            <VStack
                                onClick={openFinanceGoal}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.600' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.700"
                                rounded="8px"
                            >
                                <Img src="/images/icons/amount-contribution.svg" />
                                <Text>Monto de aporte</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem>
                            <VStack
                                onClick={openTimeLapse}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.600' }}
                                justify="center"
                                w="200px"
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
                    <Stack direction="row" w="full" align="flex-end" justify="space-between">
                        <Button variant="ghost" h="40px" color="gray.50" fontSize="16px" onClick={() => setPage(0)}>
                            Volver
                        </Button>
                        <Button variant="solid" h="40px" onClick={() => openOnboarding()}>
                            Continuar
                        </Button>
                    </Stack>
                </VStack>
            </Stack>

            <OnboardingModal
                isOpen={isOpenOnboarding}
                onClose={closeOnboarding}
                handleUpdateOnboarding={handleUpdateOnboarding}
                onboarding={true}
                handleOnboarding={handleOnboarding}
            />

            <OdsModal
                isOpen={isOpenOds}
                onClose={closeOds}
                interest={interest?.data}
                myInterest={getInterest?.data?.interests}
                reload={mutate}
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
