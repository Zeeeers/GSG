import { useState, useEffect } from 'react';
import { Avatar, Button, HStack, Text, useDisclosure, useToast, VStack, Stack } from '@chakra-ui/react';
import UploadButton from 'common/uploadButton';
import EditableTitle from 'common/editableTitle';
import CropperModalAvatar from 'common/cropperModalAvatar';
import { useUser } from 'services/api/lib/user';
import { useOrganization } from 'services/api/lib/organization';
import Router from 'next/router';
import { motion } from 'framer-motion';

interface Props {
    setPage: (index: number) => void;
}

const ProfileExperience = ({ setPage }: Props) => {
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const [baseImg, setBaseImg] = useState<string>();
    const [nameProfile, setNameProfile] = useState<string>();

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

    useEffect(() => {
        setNameProfile(user?.name);
    }, [user?.name]);

    return (
        <VStack
            as={motion.div}
            initial={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
            w="full"
        >
            <Text fontSize="30px" textTransform="uppercase" fontWeight="bold" w="full">
                Elige tu foto de perfil
            </Text>
            <Stack
                align={{ base: ' center', md: 'flex-start' }}
                justify="center"
                pt="50px"
                w="full"
                direction={{ base: 'column', md: 'row' }}
            >
                <VStack mr="20px" w="200px">
                    <Avatar
                        size={'lg'}
                        name={user?.name ?? 'GSG'}
                        src={user?.organization?.image ?? ''}
                        height="96px"
                        width="96px"
                        mr={2}
                        bgColor={organization?.image ? 'transparent' : 'teal.400'}
                        color={'white'}
                    />

                    <UploadButton
                        w="fit-content"
                        ml={-2}
                        onChange={async (e) => {
                            const { validateTypes, getBase64 } = await import('services/images');

                            if (e.target?.files && validateTypes(e.target.files[0])) {
                                if (e.target.files[0].size >= 2000000) {
                                    toast({
                                        title: 'La imagen es muy grande, porfavor, sube una imagen menor o igual a 2MB',
                                        status: 'error',
                                        duration: 9000,
                                        isClosable: true,
                                        position: 'top-right',
                                    });
                                } else {
                                    const base = await getBase64(e.target.files![0]);
                                    setBaseImg(base);
                                    onCropperOpen();
                                }
                            }
                        }}
                    >
                        Subir imagen
                    </UploadButton>

                    <Text textColor="gray.500" fontSize="13px" fontFamily="inter">
                        Tamaño máximo 2MB
                    </Text>
                </VStack>

                <VStack alignItems={{ base: 'center', md: 'start' }} spacing={0} w="full">
                    <HStack>
                        <EditableTitle
                            fontSize={{ base: 'xl', lg: '24px' }}
                            fontWeight="semibold"
                            fontFamily="barlow"
                            defaultValue={user?.name}
                            value={nameProfile}
                            onSubmit={handleUpdateName}
                            onChange={(e) => setNameProfile(e)}
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

            <HStack w="full" justify="space-between" pt="20px">
                <Button
                    onClick={() => Router.push('/explorer')}
                    variant="ghost"
                    maxW="200px"
                    h="40px"
                    fontSize="16px"
                    color="gray.50"
                >
                    Saltar
                </Button>
                <Button onClick={() => setPage(1)} variant="solid" maxW="200px" h="40px">
                    Continuar
                </Button>
            </HStack>

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
        </VStack>
    );
};

export default ProfileExperience;
