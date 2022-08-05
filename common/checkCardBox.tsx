// Dependencies
//@ts-nocheck
import { forwardRef } from '@chakra-ui/system';
import { Box } from '@chakra-ui/layout';
import { RadioGroupProps, useRadio, UseRadioProps } from '@chakra-ui/react';

// Types
type ICheckCardProps = UseRadioProps | RadioGroupProps;

// Component
const CheckCardBox = forwardRef<ICheckCardProps, 'input'>((props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: 'teal.600',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    );
});

// export
export default CheckCardBox;
