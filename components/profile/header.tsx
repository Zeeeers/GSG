// Dependencies
import dynamic from 'next/dynamic';
import { Heading, Skeleton, useToast, VStack } from '@chakra-ui/react';
import { useUser } from 'services/api/lib/user';
import SuccessNotification from 'common/notifications/success';
import ErrorNotification from 'common/notifications/error';

// Dynamic
const EditableTitle = dynamic(() => import('common/editableTitle'), {
    loading: () => <Skeleton h={12} w={80} rounded="16px" />,
});

// Component
const ProfileHeader: React.FC = () => {
    // States
    const { data: user } = useUser();
    const toast = useToast();

    // Handlers
    const handleUpdateName = async (value: string) => {
        const userApi = import('services/api/lib/user');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await userApi;
        const AuthManager = (await manager).default;

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: {
                name: value,
            },
        });

        if (ok) {
            toast({
                position: 'top-right',
                duration: 2000,
                render: () => (
                    <SuccessNotification
                        title={'Actualización exitosa'}
                        description={'Tu nombre ha sido actualizado correctamente.'}
                    />
                ),
            });
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
    };

    return (
        <VStack as="header" alignItems="start">
            <Heading as="h1" fontSize={{ base: 'lg', lg: 'xl' }} fontWeight="semibold">
                Perfil de usuario
            </Heading>

            {user ? (
                <EditableTitle
                    fontSize={{ base: '4xl', lg: '6xl' }}
                    defaultValue={user.name}
                    onSubmit={handleUpdateName}
                />
            ) : (
                <Skeleton h={12} w={80} rounded="16px" />
            )}
        </VStack>
    );
};

// Export
export default ProfileHeader;
