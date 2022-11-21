// Dependencies
import { Button, ButtonProps, forwardRef, Input, InputProps } from '@chakra-ui/react';

// Component
const UploadButton = forwardRef<InputProps, 'input'>(({ onClick, onChange, children, ...rest }, ref) => {
    return (
        <Button
            cursor="pointer"
            borderBottom="1px"
            borderColor="gray.50"
            rounded="none"
            variant="flushed"
            colorScheme="white"
            w="fit"
            px={0}
            py={0}
            color="gray.50"
            fontWeight="normal"
            fontFamily="inter"
            zIndex={30}
            {...(rest as ButtonProps)}
        >
            {children}
            <Input
                cursor="pointer"
                ref={ref}
                type="file"
                opacity={0}
                position="absolute"
                left={0}
                onClick={(e) => {
                    onClick && onClick(e);
                    (e.target as HTMLInputElement).value = '';
                }}
                width="inherit"
                height="inherit"
                zIndex={40}
                onChange={onChange}
            />
        </Button>
    );
});

// Export
export default UploadButton;
