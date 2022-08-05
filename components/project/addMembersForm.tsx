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
import CropperModal from 'common/cropperModal';
import UploadButton from 'common/uploadButton';
import { IMember, memberSchema } from 'forms/project';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';

type MemberProp = {
    reload: () => void;
};

const AddMembersForm = ({ reload }) => {
    //const addMember = useCreateGsgProjectStore((s) => s.setMembers);

    const member = useCreateGsgProjectStore((s) => s.member);
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [baseImg, setBaseImg] = useState<string>();
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
            main_image: member.main_imagen ?? '',
            name: member.name ?? '',
            position: member.position ?? '',
            linkedin: member.linkedin ?? '',
        },
        resolver: zodResolver(memberSchema),
    });

    const toast = useToast();

    const handleMember = async (data: IMember) => {
        setCreateMember(true);
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
        } else {
            setCreateMember(false);
            toast({
                title: 'Error al crear el equipo',
                description: 'Ha ocurrido un error al intentar crear el equipo, porfavor, intenelo nuevamente.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }

        reset();
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

                            <FormErrorMessage fontWeight={'semibold'}>{errors.main_image?.message}</FormErrorMessage>
                        </VStack>
                    </VStack>
                </FormControl>
                <FormControl id="name" isInvalid={!!errors.name}>
                    <FormLabel>Nombre</FormLabel>
                    <Input {...register('name')} />
                    <FormErrorMessage fontWeight={'semibold'}>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="position" isInvalid={!!errors.position}>
                    <FormLabel>Posición dentro de la empresa</FormLabel>
                    <Input {...register('position')} />
                    <FormErrorMessage fontWeight={'semibold'}>{errors.position?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="linkedin" isInvalid={!!errors.linkedin}>
                    <FormLabel>Linkedin</FormLabel>
                    <Input {...register('linkedin')} />
                    <FormErrorMessage fontWeight={'semibold'}>{errors.linkedin?.message}</FormErrorMessage>
                </FormControl>

                <Button isLoading={createMember} loadingText="Creando equipo" type="submit" variant="solid">
                    Guardar cambios
                </Button>
            </Stack>
            {isCropperOpen && (
                <CropperModal
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
