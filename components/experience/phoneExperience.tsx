import { Button, FormControl, FormErrorMessage, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneNumberInput from 'common/phoneNumber';
import { IPhoneData, phoneSchema } from 'forms/experience';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useUser } from 'services/api/lib/user';
import { COUNTRIES } from 'services/countries/countries';
import { AsYouType, isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

interface PhoneExperienceProps {
    setPage: (index: number) => void;
}

const PhoneExperience = ({ setPage }: PhoneExperienceProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: user } = useUser();

    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<IPhoneData>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            legal_representative_phone: {
                code: '+56',
                value: isValidPhoneNumber(user?.user?.organization?.legal_representative_phone ?? '')
                    ? parsePhoneNumber(user?.user?.organization?.legal_representative_phone ?? '')?.nationalNumber
                    : '',
            },
        },
    });

    const handlePhone = async ({ legal_representative_phone }: IPhoneData) => {
        setIsLoading(true);

        const userApi = import('services/api/lib/organization');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await userApi;
        const AuthManager = (await manager).default;

        let parsedNumber = new AsYouType().input(
            `${legal_representative_phone?.value ? legal_representative_phone?.code : ''}${
                legal_representative_phone?.value
            }`,
        );

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: {
                legal_representative_phone: parsedNumber,
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
            onSubmit={handleSubmit(handlePhone)}
        >
            <Text fontSize="3xl" fontWeight="bold">
                TELÉFONO DE CONTACTO
            </Text>
            <FormControl id="legal_representative_phone" isInvalid={!!errors.legal_representative_phone}>
                <Controller
                    name="legal_representative_phone"
                    control={control}
                    render={({ field: { onChange, value, ...filed } }) => (
                        <PhoneNumberInput
                            {...filed}
                            placeholder="9 0000 0000"
                            country={
                                isValidPhoneNumber(user?.user?.organization?.legal_representative_phone ?? '')
                                    ? COUNTRIES?.find(
                                          (country) =>
                                              country?.iso2 ===
                                              parsePhoneNumber(
                                                  user?.user?.organization?.legal_representative_phone ?? '0',
                                              )?.country,
                                      )?.iso2
                                    : 'CL'
                            }
                            onChange={onChange}
                            value={
                                isValidPhoneNumber(user?.user?.organization?.legal_representative_phone ?? '')
                                    ? parsePhoneNumber(user?.user?.organization?.legal_representative_phone ?? '0')
                                          ?.nationalNumber
                                    : value?.value
                            }
                        />
                    )}
                />

                <FormErrorMessage>{errors.legal_representative_phone?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" w="full" variant="solid" h="40px" isLoading={isLoading}>
                Continuar
            </Button>
        </VStack>
    );
};

export default PhoneExperience;
