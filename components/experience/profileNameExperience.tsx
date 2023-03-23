import { Button, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { INameData, nameSchema } from 'forms/experience';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from 'services/api/lib/user';

interface ProfileNameExperienceProps {
    setPage: (index: number) => void;
}

const ProfileNameExperience = ({ setPage }: ProfileNameExperienceProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: user, mutate } = useUser();

    const {
        register,
        formState: { errors },
        setFocus,
        handleSubmit,
    } = useForm<INameData>({
        resolver: zodResolver(nameSchema),
    });

    const handleName = async ({ name }: INameData) => {
        setIsLoading(true);

        const userApi = import('services/api/lib/user');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await userApi;
        const AuthManager = (await manager).default;

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            //@ts-ignore
            data: {
                name,
            },
        });

        if (ok) {
            mutate();
            setPage(1);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setFocus('name');
    }, [setFocus]);

    return (
        <VStack
            as={motion.form}
            initial={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
            w="full"
            align="start"
            spacing="48px"
            onSubmit={handleSubmit(handleName)}
        >
            <Text fontSize="3xl" fontWeight="bold">
                CONFIRMA TU NOMBRE
            </Text>
            <FormControl id="name" isInvalid={!!errors.name}>
                <Input
                    autoFocus={true}
                    defaultValue={user?.name}
                    placeholder="Mi nombre"
                    variant="flushed"
                    _placeholder={{ color: 'gray.500' }}
                    fontSize="2xl"
                    color="white"
                    borderColor="gray.700"
                    {...register('name')}
                />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" w="full" variant="solid" h="40px" isLoading={isLoading}>
                Continuar
            </Button>
        </VStack>
    );
};

export default ProfileNameExperience;
