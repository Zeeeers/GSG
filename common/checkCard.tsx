// Dependencies
import { forwardRef } from '@chakra-ui/system';
import { CheckboxProps, useCheckbox, UseCheckboxProps } from '@chakra-ui/checkbox';
import { Box } from '@chakra-ui/layout';

// Types
type ICheckCardProps = UseCheckboxProps | CheckboxProps;

// Component
const CheckCard = forwardRef<ICheckCardProps, 'input'>((props, ref) => {
    // States
    const { getInputProps, getCheckboxProps } = useCheckbox(props);

    return (
        <Box as="label" w={props.width}>
            <input {...getInputProps()} />
            <Box ref={ref} {...props} {...getCheckboxProps()} />
        </Box>
    );
});

// export
export default CheckCard;
