// Dependencies
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import InputPassword from 'common/inputPassword';
import { IRegisterOneForm, registerOneShema } from 'forms/register';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useRegisterStore } from 'stores/register';

// Dynamic
const TermsModal = dynamic(() => import('common/termsModal'));

// Component
const RegisterStepOneForm: React.FC = () => {
    // States
    const { isOpen: isTermsOpen, onOpen: onTermsOpen, onClose: onTermsClose } = useDisclosure();
    const setRegisterValues = useRegisterStore((state) => state.updateFormValues);
    const setStep = useRegisterStore((state) => state.setStep);
    const formValues = useRegisterStore((s) => s.formValues);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IRegisterOneForm>({
        resolver: zodResolver(registerOneShema),
        defaultValues: {
            userName: formValues?.userName ?? '',
            userEmail: formValues?.userEmail ?? '',
            password: formValues?.password ?? '',
            passwordConfirm: formValues?.passwordConfirm ?? '',
            legalRepPhone: formValues?.legalRepPhone ?? '',
            termsCheck: formValues?.termsCheck ?? false,
        },
    });

    // Handlers
    const handleRegister = (values: IRegisterOneForm) => {
        setStep('TWO');
        setRegisterValues(values);
    };

    return (
        <>
            <Stack
                w={{ base: '100%', md: '460px' }}
                p={{ md: '24px' }}
                as="form"
                autoComplete="off"
                onSubmit={handleSubmit(handleRegister)}
            >
                <Heading as="h2" size="2xl" mt={8} mb={4} fontWeight="bold">
                    INFORMACIÓN DEL USUARIO
                </Heading>

                <VStack align="start" spacing={8}>
                    <FormControl id="userName" isInvalid={!!errors.userName}>
                        <FormLabel>
                            Nombre y apellido <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <Input size="md" {...register('userName')} />

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.userName?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="userEmail" isInvalid={!!errors.userEmail}>
                        <FormLabel>
                            Correo eletrónico <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <Input size="md" {...register('userEmail')} />

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.userEmail?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="password" isInvalid={!!errors.password}>
                        <FormLabel>
                            Crea tu contraseña <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <InputPassword size="md" {...register('password')} />

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="passwordConfirm" isInvalid={!!errors.passwordConfirm}>
                        <FormLabel>
                            Confirmar contraseña <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <InputPassword size="md" {...register('passwordConfirm')} />

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.passwordConfirm?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="legalRepPhone" isInvalid={!!errors.legalRepPhone}>
                        <FormLabel>Teléfono (opcional)</FormLabel>

                        <InputGroup>
                            <InputLeftAddon>+569</InputLeftAddon>
                            <Input {...register('legalRepPhone')} />
                        </InputGroup>

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.legalRepPhone?.message}
                        </FormErrorMessage>
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

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.termsCheck?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button type="submit" variant="solid" mb={8} h="44px" w="full">
                        Siguiente
                    </Button>
                </VStack>
            </Stack>

            {isTermsOpen && <TermsModal isOpen={isTermsOpen} onClose={onTermsClose} />}
        </>
    );
};

// Export
export default RegisterStepOneForm;
