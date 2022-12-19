// Dependencies
import { Avatar, Flex, HStack, Stack, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import CropperModalAvatar from 'common/cropperModalAvatar';
import EditableTitle from 'common/editableTitle';

import UploadZone from 'common/uploadZone';
import { useState } from 'react';
import { useOrganization } from 'services/api/lib/organization';
import { useUser } from 'services/api/lib/user';
import InfoSkeleton from './infoForm.skeleton';

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
                title: 'Actualización exitosa',
                description: 'Tu nombre ha sido actualizado correctamente.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            toast({
                title: 'Error',
                description: 'Ha ocurrido un error al editar subir tu imagen de perfil, por favor, intentalo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
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
                title: 'Actualización exitosa',
                description: 'Tu imagen de perfil ha sido actualizado correctamente.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            toast({
                title: 'Error',
                description: 'Ha ocurrido un error al editar subir tu imagen de perfil, por favor, intentalo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return user ? (
        <>
            <Flex justifyContent={{ base: 'center', md: 'space-between' }} alignItems="center" mt="40px">
                <VStack spacing="40px" align="flex-start">
                    <Text fontFamily="barlow" fontSize="30px" textTransform="uppercase" fontWeight="700">
                        Mi Perfil
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" alignItems={'flex-start'}>
                        <VStack>
                            <Avatar
                                size={'lg'}
                                name={user.name ?? 'GSG'}
                                src={user?.organization?.image ?? ''}
                                height="96px"
                                width="96px"
                                mr={2}
                                bgColor={organization?.image ? 'transparent' : 'teal.400'}
                                color={'white'}
                            />

                            <UploadZone
                                onDrop={async (file) => {
                                    const { validateTypes, getBase64 } = await import('services/images');

                                    if (file && validateTypes(file[0])) {
                                        if (file[0].size >= 2000000) {
                                            toast({
                                                title: 'La imagen es muy grande, porfavor, suba una imagen menor o igual a 2MB',
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true,
                                                position: 'top-right',
                                            });
                                        } else {
                                            const base = await getBase64(file![0]);
                                            setBaseImg(base);
                                            onCropperOpen();
                                        }
                                    }
                                }}
                                variant="unstyled"
                                borderBottom="2px"
                                color="gray.50"
                                fontFamily="inter"
                                fontWeight="normal"
                                fontSize="15px"
                                borderColor="gray.50"
                                rounded={0}
                            >
                                Subir imagen
                            </UploadZone>

                            <Text textColor="gray.500" fontSize="13px" fontFamily="inter">
                                Tamaño máximo 2MB
                            </Text>
                        </VStack>

                        <VStack alignItems={{ base: 'start', md: 'start' }} spacing={0}>
                            <HStack>
                                <EditableTitle
                                    fontSize={{ base: 'xl', lg: '24px' }}
                                    fontWeight="semibold"
                                    fontFamily="barlow"
                                    alignItems={'center'}
                                    alignContent="center"
                                    justifyItems={'center'}
                                    defaultValue={user.name}
                                    onSubmit={handleUpdateName}
                                />
                            </HStack>

                            <Text
                                fontSize={{ base: 'sm', md: '16px' }}
                                fontWeight={'normal'}
                                color="gray.400"
                                fontFamily="inter"
                            >
                                {user?.email}
                            </Text>
                        </VStack>
                    </Stack>
                </VStack>
            </Flex>

            {isCropperOpen && (
                <CropperModalAvatar
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
