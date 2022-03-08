// Dependencies
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    Box,
    Icon,
    IconButtonProps,
    Tooltip,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import RegisterForm from 'components/public/registerForm';
import { useRegisterSkalaStore } from 'stores/registerSkala';
import { useEffect } from 'react';

// Dynamic
const IconButton = dynamic<IconButtonProps>(() => import('@chakra-ui/react').then((c) => c.IconButton));
const RegisterSuccess = dynamic(() => import('components/public/registerSuccess'));

// Types
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// Component
const RegisterModal: React.FC<Props> = ({ isOpen, onClose }) => {
    // States
    const setStep = useRegisterSkalaStore((state) => state.setStep);
    const step = useRegisterSkalaStore((state) => state.step);
    const stepOneError = useRegisterSkalaStore((state) => state.stepOneError);
    const setStepOneError = useRegisterSkalaStore((state) => state.setStepOneError);
    const registerStatus = useRegisterSkalaStore((state) => state.status);
    const setRegisterOnClose = useRegisterSkalaStore((state) => state.setRegisterOnClose);

    setRegisterOnClose(onClose);

    useEffect(() => {
        return () => setStep(1);
    }, [setStep]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                <ModalOverlay />
                <ModalContent my={0} pr={1} rounded="2xl">
                    <ModalHeader fontSize="2xl">
                        <Tooltip
                            isOpen={stepOneError}
                            placement="bottom-start"
                            hasArrow
                            shouldWrapChildren
                            label={
                                <Box d="flex" alignItems="center" justifyContent="flex-start">
                                    <Icon as={FaExclamationTriangle} mr={2} textColor="warning.500" />
                                    Corrige un error en el paso anterior
                                </Box>
                            }
                            offset={[10, 14]}
                            arrowPadding={8}
                        >
                            <Box d="inline-block">
                                {step === 2 && (
                                    <IconButton
                                        aria-label="Volver"
                                        icon={<Icon as={FaArrowLeft} />}
                                        variant="outline"
                                        onClick={() => {
                                            setStep(1);
                                            setStepOneError(false);
                                        }}
                                        rounded="full"
                                        mr={2}
                                    />
                                )}
                            </Box>
                        </Tooltip>
                        {registerStatus === 'FORM' ? 'Regístrate en Skala' : 'Cuenta creada con éxito'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody maxHeight="87vh" overflowY="auto" overflowX="hidden" className="custom-scroll-bar">
                        {registerStatus === 'FORM' ? <RegisterForm /> : <RegisterSuccess />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

// Export
export default RegisterModal;
