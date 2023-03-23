//@ts-nocheck
import { Button, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneNumberInput from 'common/phoneNumber';
import { IPhoneData, phoneSchema } from 'forms/experience';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from 'services/api/lib/user';
import { COUNTRIES } from 'services/countries';
import { parsePhoneNumber } from 'libphonenumber-js';

interface PhoneExperienceProps {
    setPage: (index: number) => void;
}

const PhoneExperience = ({ setPage }: PhoneExperienceProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: user } = useUser();

    const countryOptions = COUNTRIES.map(({ name, iso2 }) => ({
        label: name,
        value: iso2,
    }));
    const [value, setValue] = useState('');

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
                legal_representative_phone: value,
            },
        });

        if (ok) {
            setPage(2);
            setIsLoading(false);
        }
    };

    return (
        <VStack
            as={motion.div}
            initial={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
            w="full"
            align="start"
            spacing="48px"
        >
            <Text fontSize="3xl" fontWeight="bold">
                Teléfono de contacto
            </Text>
            <FormControl id="name" isInvalid={!!errors.legal_representative_phone}>
                <PhoneNumberInput
                    options={countryOptions}
                    placeholder="9 0000 0000"
                    country={
                        COUNTRIES?.find(
                            (country) =>
                                country?.iso2 ===
                                parsePhoneNumber(user?.organization.legal_representative_phone)?.country,
                        )?.iso2 ?? 'CL'
                    }
                    type="text"
                    // @ts-ignore
                    onChange={(value) => setValue(value)}
                    value={parsePhoneNumber(user?.organization.legal_representative_phone)?.nationalNumber ?? value}
                />
            </FormControl>

            <Button type="button" onClick={handleName} w="full" variant="solid" h="40px" isLoading={isLoading}>
                Continuar
            </Button>
        </VStack>
    );
};

export default PhoneExperience;
