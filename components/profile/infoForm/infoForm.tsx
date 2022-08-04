// Dependencies
import { Avatar, Flex, HStack, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import { useUser } from 'services/api/lib/user';
import { useOrganization } from 'services/api/lib/organization';
import InfoSkeleton from './infoForm.skeleton';
import EditableTitle from 'common/editableTitle';
import SuccessNotification from 'common/notifications/success';
import ErrorNotification from 'common/notifications/error';

// Components
const InfoForm: React.FC = () => {
    // States
    const { data: user } = useUser();
    const { data: organization } = useOrganization();
    const toast = useToast();

    const handleUpdateName = async (value: string) => {
        const userApi = import('services/api/lib/user');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update } = await userApi;
        const AuthManager = (await manager).default;

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            //@ts-ignore
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

    return user ? (
        <>
            <Flex justifyContent={{ base: 'center', md: 'space-between' }} alignItems="center" mt="40px">
                <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" alignItems={'center'}>
                    <Avatar
                        size={'lg'}
                        name={organization?.name ?? 'GSG'}
                        src={organization?.image}
                        height={100}
                        width={100}
                        mr={2}
                        bgColor={organization?.image ? 'transparent' : 'primary.500'}
                        color={'white'}
                    />

                    <VStack alignItems={{ base: 'center', md: 'start' }} spacing={0}>
                        <HStack>
                            <EditableTitle
                                fontSize={{ base: 'xl', lg: '3xl' }}
                                alignItems={'center'}
                                alignContent="center"
                                justifyItems={'center'}
                                defaultValue={user.name}
                                onSubmit={handleUpdateName}
                            />
                        </HStack>

                        <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight={'normal'}>
                            {user?.email}
                        </Text>
                    </VStack>
                </Stack>
            </Flex>
        </>
    ) : (
        <InfoSkeleton />
    );
};

// Export
export default InfoForm;
