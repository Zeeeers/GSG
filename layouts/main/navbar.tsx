// Dependencies
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, HStack, Skeleton, Text, useMediaQuery, Link as ChakraLink, useDisclosure } from '@chakra-ui/react';
import Image from '@clyc/optimized-image/components/chakraImage';
import { useUser } from '../../services/api/lib/user/user.calls';
import { Button } from '@chakra-ui/button';
import LoginModal from 'components/login/loginModal';
import LoginOrgaModal from 'components/organizationModals/loginOrgaModal';

// Types
const UserMenu = dynamic(() => import('./menu/desktop'));
const MobileButton = dynamic(() => import('./menu/mobile/button'));
const MobileMenu = dynamic(() => import('./menu/mobile/menu'));

// Component
const Navbar: React.FC = () => {
    // States
    const [isMenuAvailable, setIsMenuAvailable] = useState(false);
    const [isTablet] = useMediaQuery('(min-width: 48em)');
    const router = useRouter();
    const { data: user, isValidating: isValidatingUser } = useUser();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenOrgaLogin, onOpen: onOpenOrgaLogin, onClose: onCloseOrgaLogin } = useDisclosure();

    // Handlers
    const handleLogOut = async () => {
        const auth = (await import('@clyc/next-route-manager/libs/AuthManager')).default;
        auth.removeToken(process.env.NEXT_PUBLIC_COOKIE_NAME!, {
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'TRUE',
        });
        router.push('/explorer');
    };

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
                            <Button onClick={() => onOpenOrgaLogin()}>¿Eres empresa? levantar capital</Button>
                            <Button
                                onClick={onOpen}
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

            <LoginModal isOpen={isOpen} onClose={onClose} />
            <LoginOrgaModal isOpen={isOpenOrgaLogin} onClose={onCloseOrgaLogin} />
        </>
    );
};

// Export
export default Navbar;
