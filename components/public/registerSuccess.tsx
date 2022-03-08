// Dependencies
import { useRegisterSkalaStore } from 'stores/registerSkala';
import { Button, Text } from '@chakra-ui/react';

// Component
const RegisterSuccess = () => {
    // States
    const registerData = useRegisterSkalaStore((state) => state.formValues);
    const clearFormValues = useRegisterSkalaStore((state) => state.clearFormValues);
    const setRegisterStatus = useRegisterSkalaStore((state) => state.updateStatus);
    const registerOnClose = useRegisterSkalaStore((state) => state.registerOnClose);

    return (
        <>
            <Text my={8}>
                Tu cuenta se ha creado exitosamente. Hemos enviado un correo a
                <Text as="strong">{` ${registerData?.userEmail}`}</Text>. Es obligatorio que actives tu cuenta para
                poder utilizar la plataforma. Asegúrate de revisar en tu bandeja de SPAM.
            </Text>

            <Button
                my={4}
                variant="solid"
                w={'fit-content'}
                onClick={() => {
                    clearFormValues();
                    setRegisterStatus('FORM');
                    registerOnClose();
                }}
            >
                Entendido
            </Button>
        </>
    );
};

export default RegisterSuccess;
