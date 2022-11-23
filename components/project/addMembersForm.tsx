// @ts-nocheck
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
    Tooltip,
    useDisclosure,
    useToast,
    VStack,
    Avatar,
    Box,
    Heading,
    Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import CropperModalAvatar from 'common/cropperModalAvatar';
import UploadButton from 'common/uploadButton';
import UploadZone from 'common/uploadZone';
import { IMember, memberSchema } from 'forms/project';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';

type MemberProp = {
    reload: () => void;
    closeModal: void;
};

const AddMembersForm = ({ reload, closeModal }) => {
    //const addMember = useCreateGsgProjectStore((s) => s.setMembers);

    const member = useCreateGsgProjectStore((s) => s.member);
    const clearMember = useCreateGsgProjectStore((s) => s.clearMember);
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [baseImg, setBaseImg] = useState<string>(member?.main_image ?? undefined);
    const [createMember, setCreateMember] = useState(false);

    const {
        register,
        reset,
        watch,
        setValue,
        formState: { errors, isValid, isSubmitted },
        handleSubmit,
    } = useForm<IMember>({
        defaultValues: {
            main_image: baseImg ?? '',
            name: member?.name ?? '',
            position: member?.position ?? '',
            linkedin: member?.linkedin ?? '',
        },
        resolver: zodResolver(memberSchema),
    });

    const toast = useToast();

    const handleMember = async (data: IMember) => {
        setCreateMember(true);

        if (!member?.id) {
            const { create } = await import('../../services/api/lib/member');
            const { ok } = await create(data);

            if (ok) {
                setCreateMember(false);
                toast({
                    title: 'Equipo creado.',
                    description: 'Tu equipo ha sido creado exitosamente.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
                reload();
                setBaseImg('');
                reset();
            } else {
                setCreateMember(false);
                toast({
                    title: 'Error al crear el equipo',
                    description: 'Ha ocurrido un error al intentar crear el equipo, porfavor, intentelo nuevamente.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        } else {
            const { updateMember } = await import('../../services/api/lib/member');
            const { ok } = await updateMember(member.id, data);

            if (ok) {
                setCreateMember(false);
                toast({
                    title: 'El equipo actualizado.',
                    description: 'Tu equipo ha sido actualizado exitosamente.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
                closeModal();
                reload();
                setBaseImg('');
            } else {
                setCreateMember(false);
                toast({
                    title: 'Error al actualizar',
                    description:
                        'Ha ocurrido un error al intentar actualizar el equipo, porfavor, intentelo nuevamente.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        }
    };

    return (
        <>
            <Stack as="form" spacing="20px" w="full" onSubmit={handleSubmit(handleMember)}>
                <FormControl id="main_image" isInvalid={!!errors.main_image}>
                    <VStack alignItems="start" justifyContent="center" mt="25px">
                        <VStack pos="relative" spacing={3}>
                            <Avatar
                                h="100px"
                                w="100px"
                                alt={watch().name}
                                size="2xl"
                                src={watch().main_image ?? member?.main_imagen}
                                bgColor={'gray.600'}
                                borderColor="white"
                                textColor={'white'}
                                name={watch().name}
                            />

                            <Input cursor="pointer" type="hidden" {...register('main_image')} />

                            <UploadZone
                                onDrop={async (file) => {
                                    const { validateTypes, getBase64 } = await import('services/images');

                                    if (file && validateTypes(file[0])) {
                                        if (file.size > 2000000) {
                                            toast({
                                                title: 'La imagen es muy grande, porfavor, sube una imagen menor o igual a 2mb',
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true,
                                                position: 'top-right',
                                            });
                                        } else {
                                            const base = await getBase64(file![0]);
                                            setBaseImg(base);
                                            onCropperOpen();
                                        }
                                    }
                                }}
                                variant="unstyled"
                                borderBottom="2px"
                                color="gray.50"
                                fontFamily="inter"
                                fontWeight="normal"
                                fontSize="15px"
                                borderColor="gray.50"
                                rounded={0}
                            >
                                Subir imagen
                            </UploadZone>

                            <FormHelperText>Tamaño máximo 2MB</FormHelperText>

                            <Stack w="full" align="start">
                                <FormErrorMessage
                                    textColor="red.400"
                                    fontFamily="inter"
                                    fontSize="16px"
                                    fontWeight={'medium'}
                                >
                                    {errors.main_image?.message}
                                </FormErrorMessage>
                            </Stack>
                        </VStack>
                    </VStack>
                </FormControl>
                <FormControl id="name" isInvalid={!!errors.name}>
                    <FormLabel>
                        Nombre y apellido <span style={{ color: '#4FD1C5' }}>*</span>
                    </FormLabel>
                    <Input {...register('name')} />
                    <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                        {errors.name?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl id="position" isInvalid={!!errors.position}>
                    <FormLabel>
                        Posición dentro de la empresa <span style={{ color: '#4FD1C5' }}>*</span>
                    </FormLabel>
                    <Input {...register('position')} />
                    <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                        {errors.position?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl id="linkedin" isInvalid={!!errors.linkedin}>
                    <FormLabel>Linkedin (Opcional)</FormLabel>
                    <Input {...register('linkedin')} />
                    <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                        {errors.linkedin?.message}
                    </FormErrorMessage>
                </FormControl>
                <Tooltip
                    hasArrow
                    label="Hay campos sin completar"
                    shouldWrapChildren
                    bg="red.500"
                    isDisabled={isSubmitted ? isValid : true}
                >
                    <Button
                        disabled={isSubmitted ? !isValid : false}
                        isLoading={createMember}
                        loadingText="Creando equipo"
                        type="submit"
                        variant="solid"
                        w="full"
                    >
                        Guardar cambios
                    </Button>
                </Tooltip>
            </Stack>
            {isCropperOpen && (
                <CropperModalAvatar
                    title={'Recortar imagen'}
                    baseImg={baseImg!}
                    isOpen={isCropperOpen}
                    onClose={onCropperClose}
                    onCropSave={(img) => {
                        console.log(img);
                        setValue('main_image', img, { shouldValidate: true });
                    }}
                />
            )}
        </>
    );
};

export default AddMembersForm;
