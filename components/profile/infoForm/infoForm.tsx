// Dependencies
import { Avatar, Flex, HStack, Stack, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useUser } from 'services/api/lib/user';
import { useOrganization } from 'services/api/lib/organization';
import InfoSkeleton from './infoForm.skeleton';
import EditableTitle from 'common/editableTitle';
import SuccessNotification from 'common/notifications/success';
import ErrorNotification from 'common/notifications/error';
import UploadButton from 'common/uploadButton';
import { useState } from 'react';
import CropperModal from 'common/cropperModal';

// Components
const InfoForm: React.FC = () => {
    // States
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [baseImg, setBaseImg] = useState<string>();

    const { data: user, mutate } = useUser();
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

    const handleUpdateImage = async (value: string) => {
        const orgaApi = import('services/api/lib/organization');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update: orgaUpdate } = await orgaApi;
        const AuthManager = (await manager).default;

        const { ok } = await orgaUpdate({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,

            data: {
                //@ts-ignore
                organization: {
                    image: value,
                },
            },
        });

        if (ok) {
            mutate();
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
                    <VStack>
                        <Avatar
                            size={'lg'}
                            name={user.name ?? 'GSG'}
                            //@ts-ignore
                            src={user?.organization?.image ?? baseImg}
                            height={100}
                            width={100}
                            mr={2}
                            bgColor={organization?.image ? 'transparent' : 'primary.500'}
                            color={'white'}
                        />

                        <UploadButton
                            variant="outline"
                            colorScheme="white"
                            w="fit-content"
                            cursor="pointer"
                            ml={-2}
                            onChange={async (e) => {
                                const { validateTypes, getBase64 } = await import('services/images');

                                if (e.target?.files && validateTypes(e.target.files[0])) {
                                    const base = await getBase64(e.target.files![0]);
                                    setBaseImg(base);
                                    onCropperOpen();
                                }
                            }}
                        >
                            Subir logo
                        </UploadButton>
                    </VStack>

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

            {isCropperOpen && (
                <CropperModal
                    title={'Recortar logo'}
                    baseImg={baseImg!}
                    isOpen={isCropperOpen}
                    onClose={onCropperClose}
                    onCropSave={(img) => {
                        handleUpdateImage(img);
                    }}
                />
            )}
        </>
    ) : (
        <InfoSkeleton />
    );
};

// Export
export default InfoForm;
