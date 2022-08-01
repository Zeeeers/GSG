// Dependencies
//@ts-nocheck
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    Textarea,
    useToast,
    VStack,
    Tooltip,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrganization } from 'services/api/lib/organization';
import { IOrgProfileForm, orgProfileSchema } from 'forms/organizationForm';
import { Organization } from 'services/api/types/Organization';
import { useUser } from 'services/api/lib/user';

// Dynamic
const SuccessNotification = dynamic(() => import('common/notifications/success'));
const ErrorNotification = dynamic(() => import('common/notifications/error'));

// Component
const OrgInfoForm: React.FC = () => {
    // States
    const { data: user } = useUser();
    const [isSavingChanges, setIsSavingChanges] = useState(false);
    const { data: organization, mutate } = useOrganization();
    const {
        register,
        setValue,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm({ resolver: zodResolver(orgProfileSchema) });
    const watchDescription = watch('description', '');
    const toast = useToast();

    // Handlers
    const handleSaveChanges = async ({ description, facebook, website, instagram }: IOrgProfileForm) => {
        setIsSavingChanges(true);

        const orgApi = import('services/api/lib/organization');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await orgApi;
        const AuthManager = (await manager).default;

        const { ok, data } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: {
                description,
                rrss_facebook: facebook,
                rrss_instagram: instagram,
                rrss_web: website,
            },
        });

        if (ok) {
            toast({
                position: 'top-right',
                duration: 2000,
                render: () => (
                    <SuccessNotification
                        title={'Actualización exitosa'}
                        description={'La información de tu empresa ha sido actualizada correctamente.'}
                    />
                ),
            });
        } else {
            <ErrorNotification
                title={'Error'}
                description={'Ha ocurrido un error al actualizar los datos, por favor, intentalo de nuevo.'}
            />;
        }

        mutate((m) => ({ ...m, ...data?.organization } as Organization));

        setIsSavingChanges(false);
    };

    // Effects
    useEffect(() => {
        setValue('description', organization?.description);
        setValue('website', organization?.rrss_web);
        setValue('facebook', organization?.rrss_facebook);
        setValue('instagram', organization?.rrss_instagram);
    }, [organization, setValue]);

    return (
        <VStack
            as="form"
            align="start"
            mt={6}
            spacing={8}
            w={{ lg: 8 / 12 }}
            onSubmit={handleSubmit(handleSaveChanges)}
        >
            <FormControl id="description" isInvalid={!!errors.description}>
                <HStack justify="space-between" alignItems="center">
                    <FormLabel fontSize="lg" fontWeight="bold">
                        Descripción de la empresa
                    </FormLabel>

                    {!user?.guest && (
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color={watchDescription?.length < 250 ? 'danger.400' : 'primary.500'}
                        >
                            {watchDescription?.length ?? 0}/250
                        </Text>
                    )}
                </HStack>

                <Textarea
                    variant="outline"
                    {...register('description')}
                    mt={2}
                    resize="vertical"
                    minH={24}
                    isDisabled={user?.guest}
                    _disabled={{
                        color: 'black.base',
                        cursor: 'not-allowed',
                    }}
                />

                <FormErrorMessage fontWeight="semibold">{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="website" isInvalid={!!errors.website}>
                <FormLabel fontSize="lg" fontWeight="bold">
                    Sitio web (opcional)
                </FormLabel>

                <Input
                    size="md"
                    variant="outline"
                    {...register('website')}
                    mt={2}
                    placeholder="https://www.ejemplo.com"
                    isDisabled={user?.guest}
                    _disabled={{
                        color: 'black.base',
                        cursor: 'not-allowed',
                    }}
                />

                <FormErrorMessage fontWeight="semibold">{errors.website?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="facebook" isInvalid={!!errors.facebook}>
                <FormLabel fontSize="lg" fontWeight="bold">
                    Facebook (opcional)
                </FormLabel>

                <Input
                    size="md"
                    variant="outline"
                    {...register('facebook')}
                    mt={2}
                    placeholder="https://www.facebook.com/ejemplo"
                    isDisabled={user?.guest}
                    _disabled={{
                        color: 'black.base',
                        cursor: 'not-allowed',
                    }}
                />

                <FormErrorMessage fontWeight="semibold">{errors.facebook?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="instagram" isInvalid={!!errors.instagram}>
                <FormLabel fontSize="lg" fontWeight="bold">
                    Instagram (opcional)
                </FormLabel>

                <InputGroup size="md" mt={2}>
                    <InputLeftAddon bgColor="gray.100" fontWeight="bold" borderColor="gray.300">
                        @
                    </InputLeftAddon>

                    <Input
                        variant="outline"
                        {...register('instagram')}
                        isDisabled={user?.guest}
                        _disabled={{
                            color: 'black.base',
                            cursor: 'not-allowed',
                        }}
                    />
                </InputGroup>

                <FormErrorMessage fontWeight="semibold">{errors.instagram?.message}</FormErrorMessage>
            </FormControl>

            <Tooltip
                label={'Solo el administrador de la organización puede actualizar la información.'}
                isDisabled={!user?.guest}
                shouldWrapChildren
            >
                <Button
                    type="submit"
                    loadingText="Guardando cambios"
                    isLoading={isSavingChanges}
                    variant="solid"
                    mt={6}
                    isDisabled={user?.guest}
                >
                    Guardar cambios
                </Button>
            </Tooltip>
        </VStack>
    );
};

// Export
export default OrgInfoForm;
