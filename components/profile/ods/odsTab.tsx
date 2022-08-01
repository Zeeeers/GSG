// Dependencies
import { Checkbox, HStack, Img, Stack, Text, VStack, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';
import { useInterestList } from 'services/api/lib/interest';
import CapitalStageModal from './capitalStageModal';
import ExpectedRentabilityModal from './expectedRentabilityModal';
import FinanceGoalModal from './FinanceGoalModal';
import OdsModal from './odsModal';
import StageModal from './stageModal';
import ThirdModal from './thirdModal';
import TimeLapseModal from './timeLapseModal';

// Components
const OdsTab: React.FC = () => {
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
                        <Checkbox />
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

            {isOpenOds && <OdsModal isOpen={isOpenOds} onClose={closeOds} interest={interest?.data} />}
            {isOpenThird && <ThirdModal isOpen={isOpenThird} onClose={closeThird} interest={interest?.data} />}
            <StageModal isOpen={isOpenStage} onClose={closeStage} interest={interest?.data} />
            <CapitalStageModal isOpen={isOpenCapitalStage} onClose={closeCapitalStage} interest={interest?.data} />
            <ExpectedRentabilityModal
                isOpen={isOpenExpectedRentabilityModal}
                onClose={closeExpectedRentabilityModal}
                interest={interest?.data}
            />
            <FinanceGoalModal isOpen={isOpenFinanceGoal} onClose={closeFinanceGoal} interest={interest?.data} />
            <TimeLapseModal isOpen={isOpenTimeLapse} onClose={closeTimeLapse} interest={interest?.data} />
        </>
    );
};

// Export
export default OdsTab;
