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
const RegisterStepTwoForm: React.FC = () => {
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
    const setStep = useRegisterStore((s) => s.setStep);

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
                <VStack my={8} spacing={8} w="550px">
                    <VStack alignItems="flex-start" justifyContent="flex-start" w="full">
                        <Button
                            variant="outline"
                            textColor="teal.300"
                            borderColor="teal.300"
                            fontWeight="bold"
                            _hover={{ background: 'teal.300', color: 'white' }}
                            borderRadius="full"
                            w="40px"
                            h="40px"
                            onClick={() => setStep('ONE')}
                        >
                            {'<-'}
                        </Button>
                    </VStack>
                    <FormControl id="logo" isInvalid={!!errors.logo}>
                        <FormLabel fontSize="24px">Información de tu organización</FormLabel>

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
                    <FormControl id="organizationName" isInvalid={!!errors.organizationName}>
                        <FormLabel>Número o identificador nacional</FormLabel>

                        <Input
                            size="md"
                            {...register('organizationName')}
                            placeholder="00000000-0"
                            _placeholder={{ color: 'gray.400' }}
                        />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.organizationName?.message}</FormErrorMessage>
                    </FormControl>
                </VStack>

                <Button
                    type="submit"
                    variant="solid"
                    loadingText={'Creando cuenta'}
                    isLoading={isCreatingAccount}
                    isDisabled={!watch().termsCheck}
                    mb={8}
                    w="full"
                >
                    Siguiente
                </Button>
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
export default RegisterStepTwoForm;
