// Dependencies
import dynamic from 'next/dynamic';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    VStack,
    Input,
    Heading,
    Checkbox,
    Button,
    useDisclosure,
    InputGroup,
    InputLeftAddon,
    Text,
    HStack,
} from '@chakra-ui/react';
import { IRegisterOneForm, registerOneShema } from 'forms/register';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterStore } from 'stores/register';
import InputPassword from 'common/inputPassword';

// Dynamic
const TermsModal = dynamic(() => import('common/termsModal'));

// Component
const RegisterStepOneForm: React.FC = () => {
    // States
    const { isOpen: isTermsOpen, onOpen: onTermsOpen, onClose: onTermsClose } = useDisclosure();
    const setRegisterValues = useRegisterStore((state) => state.updateFormValues);
    const setStep = useRegisterStore((state) => state.setStep);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IRegisterOneForm>({
        resolver: zodResolver(registerOneShema),
    });

    // Handlers
    const handleRegister = (values: IRegisterOneForm) => {
        setStep('TWO');
        setRegisterValues(values);
    };

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit(handleRegister)}>
                <Heading as="h2" size="2xl" mt={8} mb={4} fontWeight="bold">
                    INFORMACIÓN DEL USUARIO
                </Heading>

                <VStack align="start" spacing={8}>
                    <FormControl id="userName" isInvalid={!!errors.userName}>
                        <FormLabel>Nombre y apellido</FormLabel>

                        <Input size="md" {...register('userName')} />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.userName?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="userEmail" isInvalid={!!errors.userEmail}>
                        <FormLabel>Correo eletrónico</FormLabel>

                        <Input size="md" {...register('userEmail')} />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.userEmail?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="password" isInvalid={!!errors.password}>
                        <FormLabel>Crea tu contraseña</FormLabel>

                        <InputPassword size="md" {...register('password')} />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="passwordConfirm" isInvalid={!!errors.passwordConfirm}>
                        <FormLabel>Confirmar contraseña</FormLabel>

                        <InputPassword size="md" {...register('passwordConfirm')} />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.passwordConfirm?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="legalRepPhone" isInvalid={!!errors.legalRepPhone}>
                        <FormLabel>Teléfono (opcional)</FormLabel>

                        <InputGroup>
                            <InputLeftAddon>+569</InputLeftAddon>
                            <Input {...register('legalRepPhone')} />
                        </InputGroup>

                        <FormErrorMessage fontWeight={'semibold'}>{errors.legalRepPhone?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="termsCheck" isInvalid={!!errors.termsCheck}>
                        <Checkbox {...register('termsCheck')} fontSize="12px">
                            <HStack spacing="5px">
                                <Text fontSize="12px" fontFamily="inter">
                                    He leído y acepto los
                                </Text>
                                <Button variant="link" fontFamily="inter" fontSize="12px" mb={1} onClick={onTermsOpen}>
                                    términos y condiciones del servicio.
                                </Button>
                            </HStack>
                        </Checkbox>

                        <FormErrorMessage fontWeight={'semibold'}>{errors.termsCheck?.message}</FormErrorMessage>
                    </FormControl>

                    <Button type="submit" variant="solid" mb={8} h="44px" w="full">
                        Siguiente
                    </Button>
                </VStack>
            </form>

            {isTermsOpen && <TermsModal isOpen={isTermsOpen} onClose={onTermsClose} />}
        </>
    );
};

// Export
export default RegisterStepOneForm;
