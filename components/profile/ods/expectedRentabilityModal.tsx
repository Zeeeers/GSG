import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useCheckboxGroup,
    VStack,
    WrapItem,
} from '@chakra-ui/react';
import CheckCard from 'common/checkCard';
import Rentability from 'components/projectDetail/formatText/rentability';
import React from 'react';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
}

const ExpectedRentabilityModal: React.FC<Props> = ({ isOpen, onClose, interest }) => {
    const { getCheckboxProps } = useCheckboxGroup({
        defaultValue: [],
        //onChange: (value) => setFilters([...filters, value]),
    });
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="5px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                RENTABILIDAD ESPERADA
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona una alternativa única para recibir correos con recomendaciones de proyectos
                                asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full">
                            {interest?.expected_rentability.map((item, index) => (
                                <CheckCard
                                    w="full"
                                    width="full"
                                    key={`${index}-stageFilter`}
                                    as={WrapItem}
                                    v
                                    value={item}
                                    cursor="pointer"
                                    px={'16px'}
                                    py={'8px'}
                                    rounded="8px"
                                    bg="gray.700"
                                    textColor="white"
                                    fontWeight="normal"
                                    fontFamily="inter"
                                    fontSize="md"
                                    _hover={{ bg: 'gray.600' }}
                                    _checked={{ bg: 'teal.500', textColor: 'white', _hover: { bg: 'teal.600' } }}
                                    {...getCheckboxProps({ value: item })}
                                >
                                    <Text>{Rentability(item)}</Text>
                                </CheckCard>
                            ))}
                        </VStack>

                        <Button w="full" h="40px" variant="solid">
                            Guardar cambios
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ExpectedRentabilityModal;
