// Dependencies
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    Box,
    HStack,
    Skeleton,
    Text,
    useMediaQuery,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    VStack,
    Link as ChakraLink,
    Flex,
} from '@chakra-ui/react';
import Image from '@clyc/optimized-image/components/chakraImage';
import { useUser } from '../../services/api/lib/user/user.calls';
import { Button } from '@chakra-ui/button';
import LoginForm from 'components/login/loginForm';

// Types
const UserMenu = dynamic(() => import('./menu/desktop'));
const MobileButton = dynamic(() => import('./menu/mobile/button'));
const MobileMenu = dynamic(() => import('./menu/mobile/menu'));

// Component
const Navbar: React.FC = () => {
    // States
    const router = useRouter();
    const { data: user, isValidating: isValidatingUser } = useUser();
    const [isMenuAvailable, setIsMenuAvailable] = useState(false);
    const [isTablet] = useMediaQuery('(min-width: 48em)');
    const [isOpen, onClose] = useState(false);

    // Handlers
    const handleLogOut = async () => {
        const auth = (await import('@clyc/next-route-manager/libs/AuthManager')).default;
        auth.removeToken(process.env.NEXT_PUBLIC_COOKIE_NAME!, {
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'TRUE',
        });
        router.push('/explorer');
    };

    console.log(user, isValidatingUser);

    // Effects
    useEffect(() => {
        router.prefetch('/login');

        if (!isTablet) {
            setIsMenuAvailable(true);
        }
    }, [isTablet, router]);

    return (
        <>
            <Box py={8} zIndex={0} />

            <HStack
                as="nav"
                shadow="sm"
                w={'full'}
                py={2}
                px={{ base: 4, lg: 8 }}
                justifyContent="space-between"
                bgColor="white.base"
                position="fixed"
                top={0}
                zIndex={40}
            >
                <Link href="/home" passHref>
                    <HStack spacing={{ base: 2, lg: 3 }} alignItems="center" cursor="pointer">
                        <Image
                            src={`https://skala-chile.s3.us-east-2.amazonaws.com/img/logos/logo-azul.svg`}
                            alt={'Skala Chile'}
                            h={{ base: 5, md: 6, lg: 7 }}
                            w={'auto'}
                            tHeight={50}
                            tWidth={120}
                            fitIn
                            cursor={'pointer'}
                            userSelect="none"
                        />

                        <Text
                            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                            fontWeight="bold"
                            color="primary.500"
                            pt={1}
                            cursor="pointer"
                            userSelect="none"
                        >
                            Inversiones
                        </Text>
                    </HStack>
                </Link>

                {user === undefined ? (
                    isValidatingUser === false ? (
                        <HStack spacing="24px">
                            <Button>¿Eres empresa? levantar capital</Button>
                            <Button
                                onClick={() => onClose(true)}
                                variant="solid"
                                _focus={{ outline: 'none' }}
                                aria-label="Buscar"
                                textColor="white"
                                py="10px"
                                px="16px"
                                w="106px"
                            >
                                Ingresar
                            </Button>
                        </HStack>
                    ) : (
                        <Skeleton w={24} h={4} bg="gray.500" />
                    )
                ) : isTablet ? (
                    <UserMenu onLogOut={handleLogOut} />
                ) : (
                    <MobileButton />
                )}
            </HStack>

            {isMenuAvailable && <MobileMenu onLogOut={handleLogOut} />}

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
                <ModalOverlay />
                <ModalContent rounded="2xl" pt={'30px'} px="10px">
                    <ModalHeader fontSize="4xl" d="flex" alignItems="center" pb={0}>
                        Ingresar
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={6} pt={0}>
                        <Text fontSize={'md'} fontWeight={'normal'} mt="7px">
                            Comienza a invertir en nuestros proyectos{' '}
                        </Text>
                        <LoginForm />

                        <Flex flexDirection={'column'} alignItems={'center'}>
                            <Link href="/recovery" passHref>
                                <Button
                                    variant="link"
                                    transitionProperty="all"
                                    transitionDuration={'slow'}
                                    colorScheme="primary"
                                >
                                    Olvidé mi contraseña
                                </Button>
                            </Link>
                            <VStack spacing="7px" mt="36px">
                                <Text fontSize={'md'} fontWeight={'semibold'}>
                                    ¿No tienes cuenta?
                                </Text>
                                <Button>Solicitar una invitación</Button>
                            </VStack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

// Export
export default Navbar;
