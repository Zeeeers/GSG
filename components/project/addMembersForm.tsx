import { Button, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMember, memberSchema } from 'forms/project';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';

const AddMembersForm = () => {
    const addMember = useCreateGsgProjectStore((s) => s.setMembers);
    const member = useCreateGsgProjectStore((s) => s.member);
    const {
        register,
        reset,

        handleSubmit,
    } = useForm<IMember>({
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
        <Stack as="form" w="full" onSubmit={handleSubmit(handleMember)}>
            <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input {...register('name')} />
            </FormControl>
            <FormControl>
                <FormLabel>Posición dentro de la empresa</FormLabel>
                <Input {...register('position')} />
            </FormControl>
            <FormControl>
                <FormLabel>Descripción del perfil</FormLabel>
                <Textarea {...register('description')} />
            </FormControl>

            <Button type="submit" variant="solid">
                Agregar perfil
            </Button>
        </Stack>
    );
};

export default AddMembersForm;
