// Dependencies
import { useState } from 'react';
import { IconButton, Input, InputGroup, InputRightElement, forwardRef, InputProps, Icon } from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Component
const InputPassword = forwardRef<InputProps, 'input'>((props, ref) => {
    // States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <InputGroup {...props}>
            <Input {...props} ref={ref} type={isPasswordVisible ? 'text' : 'password'} />

            <InputRightElement>
                <IconButton
                    aria-label={'Mostrar u ocultar contraseña'}
                    variant="outline"
                    border="none"
                    boxShadow="none"
                    color={'gray.500'}
                    _hover={{
                        color: 'gray.800',
                    }}
                    _focus={{ boxShadow: 'none' }}
                    _active={{ bg: 'transparent', boxShadow: 'none' }}
                    icon={isPasswordVisible ? <Icon as={FaEye} /> : <Icon as={FaEyeSlash} />}
                    onClick={() => setIsPasswordVisible((m) => !m)}
                />
            </InputRightElement>
        </InputGroup>
    );
});

// Export
export default InputPassword;
