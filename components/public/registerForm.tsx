// Dependencies
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    VStack,
    Input,
    InputLeftAddon,
    InputGroup,
    Heading,
    Checkbox,
    Box,
    Button,
    FormHelperText,
    useDisclosure,
    useToast,
    Flex,
} from '@chakra-ui/react';
import { IRegisterSkalaForm, registerSkalaSchema } from 'forms/registerSkala';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { useRegisterSkalaStore } from 'stores/registerSkala';
import InputPassword from 'common/inputPassword';
import UploadButton from 'common/uploadButton';
import { Text } from '@chakra-ui/layout';

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
    const setRegisterData = useRegisterSkalaStore((state) => state.updateFormValues);
    const setRegisterStatus = useRegisterSkalaStore((state) => state.updateStatus);
    const step = useRegisterSkalaStore((state) => state.step);
    const setStep = useRegisterSkalaStore((state) => state.setStep);
    const stepOneError = useRegisterSkalaStore((state) => state.stepOneError);
    const setStepOneError = useRegisterSkalaStore((state) => state.setStepOneError);
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
    } = useForm<IRegisterSkalaForm>({
        resolver: zodResolver(registerSkalaSchema),
        defaultValues: { idNumber: '' },
    });
    const toast = useToast();
    const secondStepScrollRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleRegister = async (values: IRegisterSkalaForm) => {
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
                image: values.logo,
                name: values.organizationName,
                legal_name: values.legalName,
                social_number: values.idNumber,
                address: values.organizationAddress,
                legal_representative_name: values.legalRepName,
                legal_representative_address: values.legalRepAddress,
                legal_representative_phone: values.legalRepPhone,
                legal_representative_email: values.legalRepEmail,
            },
            isPyme: true,
        });

        if (ok) {
            setRegisterData(values);
            setRegisterStatus('SUCCESS');
            setStep(1);
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

    useEffect(() => {
        if (
            errors.userName ||
            errors.userEmail ||
            errors.logo ||
            errors.organizationName ||
            errors.password ||
            errors.passwordConfirm ||
            errors.termsCheck
        ) {
            setStepOneError(true);
        }
    }, [errors, setStepOneError]);

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit(handleRegister)}>
                <Box ref={secondStepScrollRef} />

                <Box display={step === 1 ? 'block' : 'none'}>
                    <VStack mb={8} spacing={8}>
                        <FormControl id="logo" isInvalid={!!errors.logo}>
                            <FormLabel>Logo de la organización</FormLabel>
                            <VStack justifyContent="center" mt={4} spacing={8}>
                                <Avatar
                                    tHeight={100}
                                    tWidth={100}
                                    alt={watch().organizationName}
                                    size="2xl"
                                    src={watch().logo}
                                    icon={<></>}
                                    shadow="lg"
                                    bgColor={'primary.300'}
                                    textColor={'white.base'}
                                    name={watch().organizationName === '' ? 'Skala' : watch().organizationName}
                                />
                                <Input type="hidden" {...register('logo')} />
                                <VStack align="start" spacing={4}>
                                    <UploadButton
                                        variant="solid"
                                        colorScheme="basic"
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
                            <FormLabel>
                                Nombre de la organización o del proyecto
                                <Text as="span" textColor="danger.500" ml={1}>
                                    *
                                </Text>
                            </FormLabel>

                            <Input size="md" {...register('organizationName')} />

                            <FormErrorMessage fontWeight={'semibold'}>
                                {errors.organizationName?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <Heading as="h2" size="xl" mt={8} mb={4} fontWeight="bold">
                        Tus datos personales
                    </Heading>

                    <VStack align="start" spacing={8} mb={4}>
                        <FormControl id="userName" isInvalid={!!errors.userName}>
                            <FormLabel>
                                Nombre
                                <Text as="span" textColor="danger.500" ml={1}>
                                    *
                                </Text>
                            </FormLabel>

                            <Input size="md" {...register('userName')} />

                            <FormErrorMessage fontWeight={'semibold'}>{errors.userName?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="userEmail" isInvalid={!!errors.userEmail}>
                            <FormLabel>
                                Correo eletrónico
                                <Text as="span" textColor="danger.500" ml={1}>
                                    *
                                </Text>
                            </FormLabel>

                            <Input size="md" {...register('userEmail')} />

                            <FormErrorMessage fontWeight={'semibold'}>{errors.userEmail?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="password" isInvalid={!!errors.password}>
                            <FormLabel>
                                Crea tu contraseña
                                <Text as="span" textColor="danger.500" ml={1}>
                                    *
                                </Text>
                            </FormLabel>

                            <InputPassword size="md" {...register('password')} />

                            {!errors.password && (
                                <FormHelperText fontWeight="semibold">
                                    Tu contraseña debe tener al menos 8 caracteres.
                                </FormHelperText>
                            )}

                            <FormErrorMessage fontWeight={'semibold'}>{errors.password?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="passwordConfirm" isInvalid={!!errors.passwordConfirm}>
                            <FormLabel>
                                Confirmar contraseña
                                <Text as="span" textColor="danger.500" ml={1}>
                                    *
                                </Text>
                            </FormLabel>

                            <InputPassword size="md" {...register('passwordConfirm')} />

                            <FormErrorMessage fontWeight={'semibold'}>
                                {errors.passwordConfirm?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="termsCheck" isInvalid={!!errors.termsCheck}>
                            <Checkbox {...register('termsCheck')} mt={4} d="flex" alignItems="center">
                                {'He leído y entiendo los '}
                                <Button variant="link" fontSize="md" mb={'0.15rem'} onClick={onTermsOpen}>
                                    términos y condiciones del servicio.
                                </Button>
                            </Checkbox>

                            <FormErrorMessage fontWeight={'semibold'}>{errors.termsCheck?.message}</FormErrorMessage>
                        </FormControl>

                        <Flex justifyContent="flex-start" w="full">
                            <Button
                                variant="solid"
                                isDisabled={!watch().termsCheck}
                                onClick={() => {
                                    setStep(2);
                                    secondStepScrollRef.current!.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Siguiente
                            </Button>
                        </Flex>
                    </VStack>
                </Box>

                <Box display={step === 2 ? 'block' : 'none'}>
                    <Heading as="h2" size="xl" mb={4} fontWeight="bold">
                        Datos legales de tu organización
                    </Heading>
                    <VStack align="start" spacing={8} mb={6}>
                        <FormControl id="legalName" isInvalid={!!errors.legalName}>
                            <FormLabel>Nombre legal</FormLabel>

                            <Input size="md" {...register('legalName')} />

                            <FormErrorMessage fontWeight={'semibold'}>{errors.legalName?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="organizationAddress" isInvalid={!!errors.organizationAddress}>
                            <FormLabel>Dirección</FormLabel>

                            <Input size="md" {...register('organizationAddress')} />

                            <FormErrorMessage fontWeight={'semibold'}>
                                {errors.organizationAddress?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <Heading as="h2" mb={4} size="xl" fontWeight="bold">
                        Representante legal
                    </Heading>
                    <VStack align="start" spacing={8} mb={6}>
                        <FormControl id="legalRepName" isInvalid={!!errors.legalRepName}>
                            <FormLabel>Nombre</FormLabel>

                            <Input size="md" {...register('legalRepName')} />

                            <FormErrorMessage fontWeight={'semibold'}>{errors.legalRepName?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="legalRepPhone" isInvalid={!!errors.legalRepPhone}>
                            <FormLabel>Teléfono</FormLabel>

                            <InputGroup size="md">
                                <InputLeftAddon borderColor="gray.200">+56</InputLeftAddon>

                                <Input type="phone" {...register('legalRepPhone')} roundedLeft="0px" />
                            </InputGroup>

                            <FormErrorMessage fontWeight={'semibold'}>{errors.legalRepPhone?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="legalRepEmail" isInvalid={!!errors.legalRepEmail}>
                            <FormLabel>Correo eletrónico</FormLabel>

                            <Input size="md" {...register('legalRepEmail')} />

                            <FormErrorMessage fontWeight={'semibold'}>{errors.legalRepEmail?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="legalRepAddress" isInvalid={!!errors.legalRepAddress}>
                            <FormLabel>Dirección</FormLabel>

                            <Input size="md" {...register('legalRepAddress')} />

                            <FormErrorMessage fontWeight={'semibold'}>
                                {errors.legalRepAddress?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <VStack mb={4} w="full">
                        {stepOneError && (
                            <Flex
                                justifyContent="flex-start"
                                w="full"
                                fontWeight="semibold"
                                fontSize="md"
                                textColor="danger.400"
                                mb={4}
                            >
                                Hay un error en el paso anterior, ve a corregirlo
                            </Flex>
                        )}

                        <Flex justifyContent="space-between" mt={6} w="full">
                            <Button
                                type="submit"
                                variant="solid"
                                loadingText={'Creando cuenta'}
                                isLoading={isCreatingAccount}
                            >
                                Crear cuenta
                            </Button>
                        </Flex>
                    </VStack>
                </Box>
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
