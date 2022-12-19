//@ts-nocheck
import { Box, useRadio } from '@chakra-ui/react';

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box w="full" as="label">
            <input {...input} />
            <Box
                {...checkbox}
                w="full"
                width="full"
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
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default RadioCard;
