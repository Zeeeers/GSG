// Dependencies
//@ts-nocheck
import { useState } from 'react';
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
    FormHelperText,
    useDisclosure,
    useToast,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import { IRegisterForm, registerSchema } from 'forms/register';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { useRegisterStore } from 'stores/register';
import InputPassword from 'common/inputPassword';
import UploadButton from 'common/uploadButton';
import Link from 'next/link';

// Dynamic
const CropperModal = dynamic(() => import('common/cropperModal'));
const TermsModal = dynamic(() => import('common/termsModal'));
const ErrorNotification = dynamic(() => import('common/notifications/error'));

// Component
const RegisterStepOneForm: React.FC = () => {
    // States
    const { isOpen: isTermsOpen, onOpen: onTermsOpen, onClose: onTermsClose } = useDisclosure();
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [baseImg, setBaseImg] = useState<string>();
    const setRegisterData = useRegisterStore((state) => state.updateFormValues);
    const setRegisterStatus = useRegisterStore((state) => state.updateStatus);

    const setStep = useRegisterStore((state) => state.setStep);
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
    } = useForm<IRegisterForm>({
        resolver: zodResolver(registerSchema),
    });
    const toast = useToast();

    console.log(errors);

    // Handlers
    const handleRegister = (values: IRegisterForm) => {
        setStep('TWO');

        console.log('holaa');
        /* setIsCreatingAccount(true);
        const { create } = await import('services/api/lib/organization');

        const { ok } = await create({
            user: {
                name: values.userName,
                email: values.userEmail,
                password: values.password,
                password_confirmation: values.passwordConfirm,
            },
            organization: {
                kind: 'company_skala',
                image: values.logo,
                name: values.organizationName,
            },
        });

        if (ok) {
            setRegisterData(values);
            setRegisterStatus('SUCCESS');
        } else {
            toast({
                position: 'top-right',
                duration: 2500,
                onCloseComplete: () => {
                    setIsCreatingAccount(false);
                },
                render: () => (
                    <ErrorNotification
                        title={'Error al crear cuenta'}
                        description={'Ha ocurrido un error inesperado. Por favor, intentalo nuevamente.'}
                    />
                ),
            });
        }*/
    };

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit(handleRegister)}>
                <Heading as="h2" size="2xl" mt={8} mb={4} fontWeight="bold">
                    INFORMACIÓN DEL USUARIO
                </Heading>

                <VStack align="start" spacing={8}>
                    <FormControl id="userName" isInvalid={!!errors.userName}>
                        <FormLabel>Nombre</FormLabel>

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

                    <FormControl>
                        <FormLabel>Teléfono (opcional)</FormLabel>

                        <InputGroup>
                            <InputLeftAddon>+569</InputLeftAddon>
                            <Input />
                        </InputGroup>

                        <FormErrorMessage fontWeight={'semibold'}>{errors.userEmail?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="termsCheck" isInvalid={!!errors.termsCheck}>
                        <Checkbox {...register('termsCheck')}>
                            {'He leído y entiendo los '}
                            <Button variant="link" fontSize="md" mb={1} onClick={onTermsOpen}>
                                términos y condiciones del servicio.
                            </Button>
                        </Checkbox>

                        <FormErrorMessage fontWeight={'semibold'}>{errors.termsCheck?.message}</FormErrorMessage>
                    </FormControl>

                    <Button type="submit" variant="solid" mb={8} w="full">
                        Siguiente
                    </Button>

                    <Link href="/login" passHref>
                        <Button type="button" w="full" variant="ghost">
                            Ya tengo cuenta
                        </Button>
                    </Link>
                </VStack>
            </form>

            {isCropperOpen && (
                <CropperModal
                    title={'Recortar logo'}
                    baseImg={baseImg!}
                    isOpen={isCropperOpen}
                    onClose={onCropperClose}
                    onCropSave={(img) => {
                        setValue('logo', img);
                    }}
                />
            )}

            {isTermsOpen && <TermsModal isOpen={isTermsOpen} onClose={onTermsClose} />}
        </>
    );
};

// Export
export default RegisterStepOneForm;
