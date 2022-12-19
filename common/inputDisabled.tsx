import { useEffect, useState } from 'react';
import { IconButton, Input, forwardRef, InputProps, Icon, HStack } from '@chakra-ui/react';
import { FaMinusCircle } from 'react-icons/fa';

interface PropsInput extends InputProps {
    getIsDisabled: (disabled: boolean, value: string | number | readonly string[] | undefined) => void;
    setDisabled: 'No deseo entregar esta información';
}

const InputDisabled = forwardRef<PropsInput, 'input'>((props, ref) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleButton = () => {
        setIsDisabled(!isDisabled);

        props?.getIsDisabled && props?.getIsDisabled(isDisabled, props.value);
    };

    useEffect(() => {
        if (props.setDisabled === 'No deseo entregar esta información') {
            setIsDisabled(true);
        }
    }, [props.setDisabled]);

    return (
        <HStack w="full" spacing="10px">
            <Input
                {...props}
                ref={ref}
                disabled={isDisabled}
                type={isDisabled ? 'text' : props.type}
                value={isDisabled ? 'No deseo entregar esta información' : props.value}
            />
            <IconButton
                aria-label="disabled input"
                icon={<Icon as={FaMinusCircle} color={isDisabled ? 'red.300' : 'gray.50'} w="full" h="full" p="8px" />}
                onClick={handleButton}
                w="40px"
                h="40px"
                background={isDisabled ? 'gray.50' : 'gray.700'}
                _hover={{ background: 'gray.600' }}
            />
        </HStack>
    );
});

export default InputDisabled;
