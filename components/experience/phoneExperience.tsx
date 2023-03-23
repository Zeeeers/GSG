import { Button, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IPhoneData, phoneSchema } from 'forms/experience';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from 'services/api/lib/user';

interface PhoneExperienceProps {
    setPage: (index: number) => void;
}

const PhoneExperience = ({ setPage }: PhoneExperienceProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: user } = useUser();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IPhoneData>({
        resolver: zodResolver(phoneSchema),
    });

    const handleName = async ({ legal_representative_phone }: IPhoneData) => {
        setIsLoading(true);

        const userApi = import('services/api/lib/organization');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await userApi;
        const AuthManager = (await manager).default;

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            //@ts-ignore
            data: {
                legal_representative_phone,
            },
        });

        if (ok) {
            setPage(2);
            setIsLoading(false);
        }
    };

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
                Teléfono de contacto
            </Text>
            <FormControl id="name" isInvalid={!!errors.legal_representative_phone}>
                <Input
                    type="number"
                    placeholder="9 0000 0000"
                    variant="flushed"
                    _placeholder={{ color: 'gray.500' }}
                    fontSize="2xl"
                    color="white"
                    borderColor="gray.700"
                    // @ts-ignore
                    defaultValue={user?.organization?.legal_representative_phone}
                    {...register('legal_representative_phone')}
                />
                <FormErrorMessage>{errors?.legal_representative_phone?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" w="full" variant="solid" h="40px" isLoading={isLoading}>
                Continuar
            </Button>
        </VStack>
    );
};

export default PhoneExperience;
