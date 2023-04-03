// Dependencies
//@ts-nocheck
import {
    Button,
    Checkbox,
    HStack,
    Icon,
    Img,
    Stack,
    Text,
    useDisclosure,
    useToast,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { useInterest, useInterestList } from 'services/api/lib/interest';
import { useUser } from 'services/api/lib/user';
import { Frequency } from 'services/api/types/User';
import CapitalStageModal from './capitalStageModal';
import ExpectedRentabilityModal from './expectedRentabilityModal';
import FinanceGoalModal from './FinanceGoalModal';
import OdsModal from './odsModal';
import OnboardingModal from './onboardingModal';
import StageModal from './stageModal';
import ThirdModal from './thirdModal';
import TimeLapseModal from './timeLapseModal';

// Components
const OdsTab: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [isOpenNews, setIsOpenNews] = useState(false);
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
    const { data: getInterest, mutate } = useInterest();
    const { data: user, mutate: userReload } = useUser();

    const toast = useToast();
    const router = useRouter();

    const handleUpdateNews = async (frecuency) => {
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('../../../services/api/lib/user');

        const AuthManager = (await auth).default;
        const { update } = await userApi;

        const { ok, data } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            //@ts-ignore
            data: {
                frequency_newsletter: frecuency,
                newsletter: frecuency !== null ? true : false,
            },
        });

        if (ok) {
            userReload().then(() =>
                toast({
                    //@ts-ignore
                    title:
                        frecuency !== null
                            ? 'Recibiras correos' + ' ' + formatFrecuency(frecuency)
                            : 'No recibirás correos',
                    status: frecuency !== null ? 'success' : 'warning',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                }),
            );

            setIsOpenNews(false);
        }
    };

    const handleUpdateOnboarding = async (value) => {
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('../../../services/api/lib/user');

        const AuthManager = (await auth).default;
        const { update } = await userApi;

        const { ok, data } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            //@ts-ignore
            data: {
                onboarding: !value,
            },
        });
    };

    const frecuencyArray = [
        {
            label: 'Quincenal',
            value: 'biweekly',
        },
        {
            label: 'Mensual',
            value: 'monthly',
        },
        {
            label: 'No deseo recibir correos',
            value: null,
        },
    ];

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

    return (
        <>
            <Stack spacing="30px" mt="20px">
                <VStack alignItems="flex-start" spacing="10px">
                    <Text fontSize="24px" fontWeight="bold" textTransform="uppercase" lineHeight="130%">
                        Mis intereses
                    </Text>
                    <Text fontSize={'md'} fontWeight={'normal'} lineHeight={6}>
                        Selecciona tus intereses en cada una de las siguientes categorías, te haremos recomendaciones a
                        tu correo con proyectos que hagan match de acuerdo ellos.
                    </Text>
                </VStack>

                <VStack align="flex-start" spacing="30px">
                    <VStack align="start" justify="start" spacing="8px">
                        <VStack pos="relative">
                            <HStack
                                px="16px"
                                py="8px"
                                w="fit-content"
                                bg="gray.700"
                                rounded="4px"
                                h="fit-content"
                                cursor="pointer"
                                onClick={() => setIsOpenNews(!isOpenNews)}
                            >
                                <Icon
                                    as={user?.user.newsletter ? BsCheck : MdClose}
                                    w="25px"
                                    h="25px"
                                    color={user?.user.newsletter ? 'teal.500' : 'red.500'}
                                />
                                <Text fontSize="14px" fontFamily="inter" lineHeight="20.8px">
                                    {user?.user.newsletter
                                        ? `Deseo recibir correos ${formatFrecuency(
                                              user?.user.frequency_newsletter ?? null,
                                          )}`
                                        : 'No deseo recibir correos'}
                                </Text>

                                <Icon as={IoIosArrowDown} color="white" />
                            </HStack>

                            <AnimatePresence>
                                {isOpenNews && (
                                    <VStack
                                        as={motion.div}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        pos="absolute"
                                        bottom={-32}
                                        align="start"
                                        justify="start"
                                        w="full"
                                        bg="gray.900"
                                        rounded="4px"
                                    >
                                        {frecuencyArray.map((frecuency: Frequency) => (
                                            <Stack
                                                key={frecuency.value}
                                                onClick={() => handleUpdateNews(frecuency.value)}
                                                w="full"
                                                px="16px"
                                                py="8px"
                                                _hover={{ bg: 'gray.800', cursor: 'pointer' }}
                                            >
                                                <Text fontSize="14px" fontWeight="medium" fontFamily="inter">
                                                    {frecuency.label}
                                                </Text>
                                            </Stack>
                                        ))}
                                    </VStack>
                                )}
                            </AnimatePresence>
                        </VStack>

                        {!user?.user.newsletter && (
                            <Stack py="6px" px="10px" w="full" bg="red.100" rounded="4px">
                                <Text color="red.500" fontSize="14px" lineHeight="19.6px" fontFamily="inter">
                                    Actualmente no estás recibiendo el correo match con proyectos que coincidan con tus
                                    intereses
                                </Text>
                            </Stack>
                        )}
                    </VStack>

                    <VStack align="flex-start" spacing="8px">
                        <Wrap spacingX="30px" spacingY="20px">
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

                        {!getInterest?.data.interests.has_preferences && (
                            <Stack py="6px" px="10px" w="full" bg="red.100" rounded="4px">
                                <Text color="red.500" fontSize="14px" lineHeight="19.6px" fontFamily="inter">
                                    Actualmente no tienes seleccionado ningún interés
                                </Text>
                            </Stack>
                        )}
                    </VStack>

                    <Stack w="full" align="flex-end">
                        <Button
                            w={{ base: 'full', sm: '176px' }}
                            variant="outline"
                            h="40px"
                            onClick={() => {
                                router.push('/explorer');
                            }}
                        >
                            Ir al explorador
                        </Button>
                    </Stack>
                </VStack>
            </Stack>

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

// Export
export default OdsTab;
