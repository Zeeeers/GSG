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
    Button,
    useDisclosure,
    useToast,
    Stack,
    FormHelperText,
} from '@chakra-ui/react';
import { IRegisterTwoForm, registerTwoSchema } from 'forms/register';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { useRegisterStore } from 'stores/register';
import UploadButton from 'common/uploadButton';
import router from 'next/router';

// Dynamic
const CropperModal = dynamic(() => import('common/cropperModal'));

// Component
const RegisterStepTwoForm: React.FC = () => {
    // States
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [baseImg, setBaseImg] = useState<string>();
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        setValue,
    } = useForm<IRegisterTwoForm>({
        resolver: zodResolver(registerTwoSchema),
    });
    const toast = useToast();
    const setStep = useRegisterStore((s) => s.setStep);
    const valuesForm = useRegisterStore((state) => state.formValues);

    // Handlers
    const handleRegister = async (values: IRegisterTwoForm) => {
        setIsCreatingAccount(true);
        const { create } = await import('services/api/lib/organization');

        const { ok } = await create({
            user: {
                name: valuesForm?.userName,
                email: valuesForm?.userEmail,
                password: valuesForm?.password,
                password_confirmation: valuesForm?.passwordConfirm,
            },
            organization: {
                image: values.logo,
                legal_representative_email: valuesForm?.userEmail,
                legal_representative_phone: valuesForm?.legalRepPhone,
                name: values.organizationName,
                social_number: values.idNumber,
            },
        });

        if (ok) {
            toast({
                title: 'Usuario creado con éxito',
                description: 'Felicidades, tu usuario se ha creado con éxito, ya puedes levantar tu capital',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            router.push('/successRegister');
            setIsCreatingAccount(false);
        } else {
            toast({
                title: 'No se ha podido crear el usuario',
                description: 'Ha ocurrido un error al intentar crear el usuario, porfavor, intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            setIsCreatingAccount(false);
        }
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
                <VStack my={8} spacing={8} w="full">
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

                                <UploadButton
                                    variant="outline"
                                    colorScheme="white"
                                    w="fit-content"
                                    cursor="pointer"
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

                                <Input
                                    visibility="hidden"
                                    type="hidden"
                                    {...register('logo')}
                                    w="fit-content"
                                    cursor="pointer"
                                />

                                <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                                    {errors.logo?.message}
                                </FormErrorMessage>
                            </VStack>
                        </VStack>
                    </FormControl>

                    <FormControl id="organizationName" isInvalid={!!errors.organizationName}>
                        <FormLabel>
                            Nombre de la organización <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <Input size="md" {...register('organizationName')} />

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.organizationName?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="idNumber" isInvalid={!!errors.idNumber}>
                        <FormLabel>
                            Número o identificador nacional <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <FormHelperText mt="-3px" color="gray.300">
                            Ingrese rut sin puntos y con guión
                        </FormHelperText>

                        <Input
                            mt="10px"
                            size="md"
                            {...register('idNumber')}
                            placeholder="00000000-0"
                            _placeholder={{ color: 'gray.400' }}
                        />

                        <FormErrorMessage textColor="red.400" fontWeight={'semibold'}>
                            {errors.idNumber?.message}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>

                <Button
                    type="submit"
                    variant="solid"
                    loadingText={'Creando cuenta'}
                    isLoading={isCreatingAccount}
                    mb={8}
                    h="44px"
                    w="full"
                >
                    Siguiente
                </Button>
            </Stack>

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
        </>
    );
};

// Export
export default RegisterStepTwoForm;
