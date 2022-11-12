// Dependencies
import { Button, ButtonProps, forwardRef, Input, InputProps } from '@chakra-ui/react';

// Component
const UploadButton = forwardRef<InputProps, 'input'>(({ onClick, onChange, children, ...rest }, ref) => {
    return (
        <Button
            borderBottom="1px"
            borderColor="gray.50"
            rounded="none"
            variant="flushed"
            colorScheme="white"
            w="fit-content"
            px={0}
            py={0}
            color="gray.50"
            fontWeight="normal"
            fontFamily="inter"
            zIndex={0}
            {...(rest as ButtonProps)}
        >
            {children}
            <Input
                ref={ref}
                type="file"
                opacity={0}
                cursor="pointer"
                position="absolute"
                left={0}
                onClick={(e) => {
                    onClick && onClick(e);
                    (e.target as HTMLInputElement).value = '';
                }}
                width="100px"
                zIndex={40}
                onChange={onChange}
            />
        </Button>
    );
});

// Export
export default UploadButton;
