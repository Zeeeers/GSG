// @ts-nocheck
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { zodResolver } from '@hookform/resolvers/zod';
import CropperModalBase64 from 'common/cropperModalBase64';
import UploadButton from 'common/uploadButton';
import { IMember, memberSchema } from 'forms/project';
import React, { useState } from 'react';
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
        formState: { errors },
        handleSubmit,
    } = useForm<IMember>({
        defaultValues: {
            main_image: member?.main_imagen ?? '',
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
                        <VStack spacing={3}>
                            <Avatar
                                tHeight={100}
                                tWidth={100}
                                alt={watch().name}
                                size="2xl"
                                src={baseImg}
                                icon={<></>}
                                shadow="lg"
                                bgColor={'gray.700'}
                                border="2px"
                                borderColor="white"
                                borderStyle="dashed"
                                textColor={'white'}
                                name={watch().name}
                            />

                            <Input type="hidden" {...register('main_image')} />

                            <UploadButton
                                variant="outline"
                                colorScheme="white"
                                ml={-2}
                                onChange={async (e) => {
                                    const { validateTypes, getBase64 } = await import('services/images');

                                    if (e.target?.files && validateTypes(e.target.files[0])) {
                                        if (e.target.files[0].size > 2000000) {
                                            toast({
                                                title: 'La imagen es muy grande, porfavor, sube una imagen menor o igual a 2mb',
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true,
                                                position: 'top-right',
                                            });
                                        } else {
                                            const base = await getBase64(e.target.files![0]);
                                            setBaseImg(base);
                                            onCropperOpen();
                                        }
                                    }
                                }}
                            >
                                Subir imagen de perfil
                            </UploadButton>

                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors.main_image?.message}
                            </FormErrorMessage>
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
                </FormControl>

                <Button isLoading={createMember} loadingText="Creando equipo" type="submit" variant="solid">
                    Guardar cambios
                </Button>
            </Stack>
            {isCropperOpen && (
                <CropperModalBase64
                    title={'Recortar logo'}
                    baseImg={baseImg!}
                    isOpen={isCropperOpen}
                    onClose={onCropperClose}
                    onCropSave={(img) => {
                        setValue('main_image', img);
                    }}
                />
            )}
        </>
    );
};

export default AddMembersForm;
