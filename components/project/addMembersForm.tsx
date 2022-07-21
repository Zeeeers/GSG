//@ts-nocheck
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { zodResolver } from '@hookform/resolvers/zod';
import UploadButton from 'common/uploadButton';
import { IMember, memberSchema } from 'forms/project';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';

const AddMembersForm = () => {
    const addMember = useCreateGsgProjectStore((s) => s.setMembers);
    const member = useCreateGsgProjectStore((s) => s.member);
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [baseImg, setBaseImg] = useState<string>();
    const { register, reset, watch, handleSubmit } = useForm<IMember>({
        defaultValues: {
            name: member.name ?? '',
            position: member.position ?? '',
            description: member.description ?? '',
        },
        resolver: zodResolver(memberSchema),
    });

    const handleMember = async (data: IMember) => {
        addMember(data);
        reset();
    };

    return (
        <Stack as="form" spacing="20px" w="full" onSubmit={handleSubmit(handleMember)}>
            <VStack align={'start'} spacing={0}>
                <Avatar
                    tHeight={34}
                    tWidth={34}
                    alt="GSG"
                    size="xl"
                    src={baseImg}
                    icon={<></>}
                    shadow="lg"
                    bgColor={'blue.700'}
                    textColor={'white'}
                    name={'N'}
                />
            </VStack>
            <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input {...register('name')} />
            </FormControl>
            <FormControl>
                <FormLabel>Posición dentro de la empresa</FormLabel>
                <Input {...register('position')} />
            </FormControl>
            <FormControl>
                <FormLabel>Linkedin</FormLabel>
                <Input {...register('description')} />
            </FormControl>

            <Button type="submit" variant="solid">
                Guardar cambios
            </Button>
        </Stack>
    );
};

export default AddMembersForm;
