// Dependencies
import { Button, ButtonProps, forwardRef, Input, InputProps } from '@chakra-ui/react';

// Component
const UploadButton = forwardRef<InputProps, 'input'>(({ onClick, onChange, children, ...rest }, ref) => {
    return (
        <Button {...(rest as ButtonProps)}>
            {children}
            <Input
                ref={ref}
                type="file"
                opacity={0}
                cursor="pointer"
                w={'inherit'}
                h={'inherit'}
                position="absolute"
                left={0}
                onClick={(e) => {
                    onClick && onClick(e);
                    (e.target as HTMLInputElement).value = '';
                }}
                onChange={onChange}
            />
        </Button>
    );
});

// Export
export default UploadButton;
