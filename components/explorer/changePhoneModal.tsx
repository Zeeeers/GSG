import {
    Button,
    FormControl,
    FormErrorMessage,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneNumberInput from 'common/phoneNumber';
import { IPhoneData, phoneSchema } from 'forms/experience';
import { motion } from 'framer-motion';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useUser } from 'services/api/lib/user';
import { COUNTRIES } from 'services/countries/countries';

interface ChangePhoneModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePhoneModal = ({ isOpen, onClose }: ChangePhoneModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: user, mutate } = useUser();

    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<IPhoneData>({
        resolver: zodResolver(phoneSchema),
    });

    const handlePhone = async ({ legal_representative_phone }: IPhoneData) => {
        setIsLoading(true);

        const userApi = import('services/api/lib/organization');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await userApi;
        const AuthManager = (await manager).default;

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: {
                legal_representative_phone: legal_representative_phone.value,
            },
        });

        if (ok) {
            setIsLoading(false);
            mutate();
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent rounded="2xl" p={0} bg="gray.900">
                <ModalCloseButton />
                <ModalBody w="full" p={0} mb={6} pt={0}>
                    <VStack
                        as={motion.form}
                        initial={{ x: -50, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
                        w="full"
                        align="start"
                        spacing="48px"
                        onSubmit={handleSubmit(handlePhone)}
                        padding="25px"
                    >
                        <VStack textAlign="center">
                            <Text fontSize="3xl" fontWeight="bold">
                                Teléfono de contacto
                            </Text>
                            <Text color="gray.300">
                                Recuerda que puedes modificar tus datos de contacto en tu perfil cuando quieras.
                            </Text>
                        </VStack>
                        <FormControl id="legal_representative_phone" isInvalid={!!errors.legal_representative_phone}>
                            <Controller
                                name="legal_representative_phone"
                                control={control}
                                render={({ field: { onChange, value, ...filed } }) => (
                                    <PhoneNumberInput
                                        {...filed}
                                        placeholder="9 0000 0000"
                                        country={
                                            isValidPhoneNumber(
                                                user?.user?.organization?.legal_representative_phone ?? '0',
                                            )
                                                ? COUNTRIES?.find(
                                                      (country) =>
                                                          country?.iso2 ===
                                                          parsePhoneNumber(
                                                              user?.user?.organization?.legal_representative_phone ??
                                                                  '0',
                                                          )?.country,
                                                  )?.iso2
                                                : 'CL'
                                        }
                                        onChange={onChange}
                                        value={
                                            isValidPhoneNumber(
                                                user?.user?.organization?.legal_representative_phone ?? '0',
                                            )
                                                ? parsePhoneNumber(
                                                      user?.user?.organization?.legal_representative_phone ?? '0',
                                                  )?.nationalNumber
                                                : value?.value
                                        }
                                    />
                                )}
                            />

                            <FormErrorMessage>{errors.legal_representative_phone?.message}</FormErrorMessage>
                        </FormControl>

                        <Button type="submit" w="full" variant="solid" h="40px" isLoading={isLoading}>
                            Guardar
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ChangePhoneModal;
