import { useState } from 'react';
import { IconButton, Input, forwardRef, InputProps, Icon, HStack } from '@chakra-ui/react';
import { FaMinusCircle } from 'react-icons/fa';

const InputDisabled = forwardRef<InputProps, 'input'>((props, ref) => {
    const [isDisabled, setIsDisabled] = useState(false);
    return (
        <HStack w="full" spacing="10px">
            <Input {...props} ref={ref} disabled={isDisabled} />
            <IconButton
                aria-label="Search database"
                icon={<Icon as={FaMinusCircle} color={isDisabled ? 'red.300' : 'gray.50'} w="full" h="full" p="8px" />}
                onClick={() => setIsDisabled(!isDisabled)}
                w="40px"
                h="40px"
                background={isDisabled ? 'gray.50' : 'gray.700'}
                _hover={{ background: 'gray.600' }}
            />
        </HStack>
    );
});

export default InputDisabled;
