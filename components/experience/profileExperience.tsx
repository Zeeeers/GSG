import { useState } from 'react';
import { Avatar, Button, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import CropperModalAvatar from 'common/cropperModalAvatar';
import { useOrganization } from 'services/api/lib/organization';

import { motion } from 'framer-motion';
import UploadZone from 'common/uploadZone';
import { useUser } from 'services/api/lib/user';

interface Props {
    setPage: (index: number) => void;
}

const ProfileExperience = ({ setPage }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [baseImg, setBaseImg] = useState<string>();
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();

    const { data: organization } = useOrganization();
    const { data: user, mutate } = useUser();

    const toast = useToast();

    const handleUpdateImage = async (img: string) => {
        setIsLoading(true);
        const orgaApi = import('services/api/lib/organization');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update: orgaUpdate } = await orgaApi;
        const AuthManager = (await manager).default;

        const { ok } = await orgaUpdate({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,

            data: {
                //@ts-ignore
                organization: {
                    image: img ?? null,
                },
            },
        });

        if (ok) {
            mutate();
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
            spacing="48px"
        >
            <Text fontSize="30px" textTransform="uppercase" fontWeight="bold" w="full">
                Elige tu foto de perfil
            </Text>
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

            <Button
                isLoading={isLoading}
                disabled={isLoading}
                variant="solid"
                w="full"
                h="40px"
                onClick={() => setPage(3)}
            >
                Continuar
            </Button>

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
