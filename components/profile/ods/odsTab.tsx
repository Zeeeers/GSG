// Dependencies

import { Checkbox, HStack, Img, Stack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';

// Components
const OdsTab: React.FC = () => {
    return (
        <Stack spacing="30px" mt="20px">
            <VStack alignItems="flex-start" spacing="10px">
                <Text fontSize="24px" fontWeight="bold" textTransform="uppercase" lineHeight={6}>
                    Selecciona tus intereses por categoría
                </Text>
                <Text fontSize={'md'} fontWeight={'normal'} lineHeight={6}>
                    Te haremos recomendaciones a tu correo de acuerdo a los intereses que selecciones en las siguientes
                    categorías
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
    );
};

// Export
export default OdsTab;
