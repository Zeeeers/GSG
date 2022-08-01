// Dependencies
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
    Heading,
    HStack,
    Input,
    Skeleton,
    SkeletonCircle,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
    useToken,
    VStack,
} from '@chakra-ui/react';
import { useOrganization } from 'services/api/lib/organization';
import { Organization } from 'services/api/types/Organization';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useUser } from 'services/api/lib/user';

import 'dayjs/locale/es';

// Dynamic
const EditableTitle = dynamic(() => import('common/editableTitle'), {
    loading: () => (
        <HStack>
            <SkeletonCircle h={24} w={24} />
            <Skeleton h={12} w={80} rounded="16px" />
        </HStack>
    ),
});
const CropperModal = dynamic(() => import('common/cropperModal'));
const SuccessNotification = dynamic(() => import('common/notifications/success'));
const ErrorNotification = dynamic(() => import('common/notifications/error'));

// Component
const OrganizationProfileHeader: React.FC = () => {
    // States
    const { data: user } = useUser();
    const [isConvertingImage, setIsConvertingImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState<string>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: organization, mutate } = useOrganization();
    const [gray100] = useToken('colors', ['gray.100']);
    const toast = useToast();
    dayjs.locale('es');
    dayjs.extend(localizedFormat);

    // Handlers
    const handleUpdateNameOrAvatar = async (value: string, kind: 'avatar' | 'name') => {
        if (kind === 'avatar') {
            setIsLoading(true);
        }

        const orgApi = import('services/api/lib/organization');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await orgApi;
        const AuthManager = (await manager).default;

        const { ok, data } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: kind === 'name' ? { name: value } : { image: value },
        });

        if (ok) {
            toast({
                position: 'top-right',
                duration: 2000,
                render: () => (
                    <SuccessNotification
                        title={'Actualización exitosa'}
                        description={'El nombre de la organización ha sido actualizado correctamente.'}
                    />
                ),
            });

            await mutate((m) => ({ ...m, ...data?.organization } as Organization));
        } else {
            toast({
                position: 'top-right',
                duration: 2000,
                render: () => (
                    <ErrorNotification
                        title={'Error'}
                        description={'Ha ocurrido un error al editar tu nombre, por favor, intentalo de nuevo.'}
                    />
                ),
            });
        }

        if (kind === 'avatar') {
            setAvatar(undefined);
            setIsLoading(false);
        }
    };

    return (
        <>
            <VStack as="header" alignItems="start" mb={8}>
                <Heading as="h1" fontSize={{ base: 'lg', lg: 'xl' }} fontWeight="semibold" mb={2}>
                    Perfil de la organización
                </Heading>

                {organization ? (
                    <HStack spacing={6}>
                        <Tooltip label="Click para editar logo" hasArrow isDisabled={user?.guest}>
                            <Avatar
                                src={isLoading || isConvertingImage ? '' : avatar ?? organization.image}
                                alt={organization.name}
                                tHeight={100}
                                tWidth={100}
                                size="xl"
                                cursor="pointer"
                                icon={<Spinner color={'primary.500'} />}
                                border={`1px solid ${gray100}`}
                            >
                                {!user?.guest && (
                                    <Input
                                        cursor="pointer"
                                        type="file"
                                        opacity={0}
                                        title=""
                                        w={'inherit'}
                                        h={'inherit'}
                                        position="absolute"
                                        left={0}
                                        onClick={(e) => {
                                            if (!user?.guest) {
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                        onChange={async (e) => {
                                            if (!user?.guest) {
                                                setIsConvertingImage(true);
                                                const { validateTypes, getBase64 } = await import('services/images');

                                                if (e.target?.files && validateTypes(e.target.files[0])) {
                                                    const base = await getBase64(e.target.files![0]);
                                                    setAvatar(base);
                                                    onOpen();
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </Avatar>
                        </Tooltip>

                        <VStack alignItems="start">
                            <EditableTitle
                                fontSize={{ base: '3xl', lg: '6xl' }}
                                defaultValue={organization.name}
                                onSubmit={(value: string) => handleUpdateNameOrAvatar(value, 'name')}
                                isDisabled={user?.guest}
                            />

                            <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'lg' }} color="gray.600">
                                <Text as="strong" color="black.base">
                                    Miembro desde:
                                </Text>{' '}
                                {dayjs(organization.created_at).format('LL')}
                            </Text>
                        </VStack>
                    </HStack>
                ) : (
                    <HStack>
                        <SkeletonCircle h={24} w={24} />
                        <Skeleton h={12} w={80} rounded="16px" />
                    </HStack>
                )}
            </VStack>

            {isOpen && (
                <CropperModal
                    baseImg={avatar!}
                    title="Editar logo"
                    isOpen={isOpen}
                    onClose={() => {
                        onClose();
                        setIsConvertingImage(false);
                        setAvatar(undefined);
                    }}
                    onCropSave={(img) => handleUpdateNameOrAvatar(img, 'avatar')}
                />
            )}
        </>
    );
};

// Export
export default OrganizationProfileHeader;
