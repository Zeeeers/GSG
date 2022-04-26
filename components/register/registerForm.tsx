// Dependencies
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
const RegisterForm: React.FC = () => {
    // States
    const { isOpen: isTermsOpen, onOpen: onTermsOpen, onClose: onTermsClose } = useDisclosure();
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [baseImg, setBaseImg] = useState<string>();
    const setRegisterData = useRegisterStore((state) => state.updateFormValues);
    const setRegisterStatus = useRegisterStore((state) => state.updateStatus);
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

    // Handlers
    const handleRegister = async (values: IRegisterForm) => {
        setIsCreatingAccount(true);
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
        }
    };

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit(handleRegister)}>
                <VStack my={8} spacing={8}>
                    <FormControl id="logo" isInvalid={!!errors.logo}>
                        <FormLabel fontSize="24px">CREAR ORGANIZACIÓN</FormLabel>

                        <VStack alignItems="start" justifyContent="center" mt="25px">
                            <VStack spacing={3}>
                                <Avatar
                                    tHeight={100}
                                    tWidth={100}
                                    alt={watch().organizationName}
                                    size="2xl"
                                    src={watch().logo}
                                    icon={<></>}
                                    shadow="lg"
                                    bgColor={'gray.700'}
                                    border="2px"
                                    borderColor="white"
                                    borderStyle="dashed"
                                    textColor={'white'}
                                    name={watch().organizationName ? 'GSG' : watch().organizationName}
                                />

                                <Input type="hidden" {...register('logo')} />

                                <UploadButton
                                    variant="ghost"
                                    colorScheme="white"
                                    fontWeight="bold"
                                    ml={-2}
                                    onChange={async (e) => {
                                        const { validateTypes, getBase64 } = await import('services/images');

                                        if (e.target?.files && validateTypes(e.target.files[0])) {
                                            const base = await getBase64(e.target.files![0]);
                                            setBaseImg(base);
                                            onCropperOpen();
                                        }
                                    }}
                                >
                                    Subir logo
                                </UploadButton>

                                <FormErrorMessage fontWeight={'semibold'}>{errors.logo?.message}</FormErrorMessage>
                            </VStack>
                        </VStack>
                    </FormControl>

                    <FormControl id="organizationName" isInvalid={!!errors.organizationName}>
                        <FormLabel>Nombre de la organización</FormLabel>

                        <Input size="md" {...register('organizationName')} />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.organizationName?.message}</FormErrorMessage>
                    </FormControl>
                </VStack>

                <Heading as="h2" size="2xl" mt={8} mb={4} fontWeight="bold">
                    INFORMACIÓN DEL USUARIO
                </Heading>

                <VStack align="start" spacing={8} mb={16}>
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

                        {!errors.password && (
                            <FormHelperText fontWeight="semibold">
                                Tu contraseña debe tener al menos 8 caracteres.
                            </FormHelperText>
                        )}

                        <FormErrorMessage fontWeight={'semibold'}>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="passwordConfirm" isInvalid={!!errors.passwordConfirm}>
                        <FormLabel>Confirmar contraseña</FormLabel>

                        <InputPassword size="md" {...register('passwordConfirm')} />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.passwordConfirm?.message}</FormErrorMessage>
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

                    <Button
                        type="submit"
                        variant="solid"
                        loadingText={'Creando cuenta'}
                        isLoading={isCreatingAccount}
                        isDisabled={!watch().termsCheck}
                        mb={8}
                        w="full"
                    >
                        Crear cuenta
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
export default RegisterForm;
