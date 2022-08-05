// Dependencies
//@ts-nocheck
import { Checkbox, HStack, Img, Stack, Text, VStack, Wrap, WrapItem, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useInterest, useInterestList } from 'services/api/lib/interest';
import { update, useUser } from 'services/api/lib/user';
import CapitalStageModal from './capitalStageModal';
import ExpectedRentabilityModal from './expectedRentabilityModal';
import FinanceGoalModal from './FinanceGoalModal';
import OdsModal from './odsModal';
import StageModal from './stageModal';
import ThirdModal from './thirdModal';
import TimeLapseModal from './timeLapseModal';

// Components
const OdsTab: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
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
    const { data: getInterest } = useInterest();
    const { data: user, mutate } = useUser();

    const toast = useToast();

    const handleUpdateNews = async () => {
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('../../../services/api/lib/user');

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

    useEffect(() => {
        if (user) {
            //@ts-ignore
            setIsActive(user?.newsletter);
        }
    }, [user]);

    return (
        <>
            <Stack spacing="30px" mt="20px">
                <VStack alignItems="flex-start" spacing="10px">
                    <Text fontSize="24px" fontWeight="bold" textTransform="uppercase" lineHeight={6}>
                        Selecciona tus intereses por categoría
                    </Text>
                    <Text fontSize={'md'} fontWeight={'normal'} lineHeight={6}>
                        Te haremos recomendaciones a tu correo de acuerdo a los intereses que selecciones en las
                        siguientes categorías
                    </Text>
                </VStack>

                <VStack align="flex-start" spacing="30px">
                    <HStack>
                        <Checkbox isChecked={isActive} onChange={handleUpdateNews} />
                        <Text>Deseo rercibir correos semanalmente con proyectos relacionados a mis intereses</Text>
                    </HStack>
                    <Wrap spacingX="30px" spacingY="20px">
                        <WrapItem>
                            <VStack
                                onClick={openOds}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.500' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.600"
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
                                _hover={{ bg: 'gray.500' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.600"
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
                                _hover={{ bg: 'gray.500' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.600"
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
                                _hover={{ bg: 'gray.500' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.600"
                                rounded="8px"
                            >
                                <Img src="/images/icons/survey-stages.svg" />
                                <Text>Etapa levantamiento</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem>
                            <VStack
                                onClick={openExpectedRentabilityModal}
                                cursor="pointer"
                                transitionDuration={'250ms'}
                                _hover={{ bg: 'gray.500' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.600"
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
                                _hover={{ bg: 'gray.500' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.600"
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
                                _hover={{ bg: 'gray.500' }}
                                justify="center"
                                w="200px"
                                h="100px"
                                spacing="13px"
                                bg="gray.600"
                                rounded="8px"
                            >
                                <Img src="/images/icons/investment-terms.svg" />
                                <Text>Plazos de inversión</Text>
                            </VStack>
                        </WrapItem>
                    </Wrap>
                </VStack>
            </Stack>

            <OdsModal isOpen={isOpenOds} onClose={closeOds} interest={interest?.data} myInterest={getInterest?.data} />
            <ThirdModal
                isOpen={isOpenThird}
                onClose={closeThird}
                interest={interest?.data}
                myInterest={getInterest?.data}
            />
            <StageModal
                isOpen={isOpenStage}
                onClose={closeStage}
                interest={interest?.data}
                myInterest={getInterest?.data}
            />
            <CapitalStageModal
                isOpen={isOpenCapitalStage}
                onClose={closeCapitalStage}
                interest={interest?.data}
                myInterest={getInterest?.data}
            />
            <ExpectedRentabilityModal
                isOpen={isOpenExpectedRentabilityModal}
                onClose={closeExpectedRentabilityModal}
                interest={interest?.data}
                myInterest={getInterest?.data}
            />
            <FinanceGoalModal isOpen={isOpenFinanceGoal} onClose={closeFinanceGoal} interest={interest?.data} />
            <TimeLapseModal isOpen={isOpenTimeLapse} onClose={closeTimeLapse} interest={interest?.data} />
        </>
    );
};

// Export
export default OdsTab;
