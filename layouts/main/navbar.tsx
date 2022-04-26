// Dependencies
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HStack, Text, useMediaQuery, useDisclosure, Img, Container } from '@chakra-ui/react';
import { useUser } from '../../services/api/lib/user/user.calls';
import { Button } from '@chakra-ui/button';
import LoginModal from 'components/login/loginModal';
import LoginOrgaModal from 'components/organization/loginOrgaModal';

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
    const { data: user, mutate } = useUser();

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
        mutate();
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
            <Container
                maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }}
                bgColor={{ base: 'gray.700', md: 'transparent' }}
                py={{ base: '15px', md: '20px' }}
            >
                <HStack as="nav" shadow="sm" w="full" justifyContent="space-between" top={0} zIndex={40}>
                    <Link href="/explorer" passHref>
                        <HStack spacing={{ base: 2, lg: 3 }} alignItems="center" cursor="pointer">
                            <Img src="/images/logo_match_blanco.png" />
                            <Text
                                fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                                fontWeight="bold"
                                pt={1}
                                cursor="pointer"
                                userSelect="none"
                            >
                                MATCH
                            </Text>
                        </HStack>
                    </Link>
                    {user === undefined ? (
                        isTablet ? (
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
                            <MobileButton />
                        )
                    ) : (
                        <UserMenu onLogOut={handleLogOut} />
                    )}
                </HStack>
            </Container>

            {isMenuAvailable && <MobileMenu onLogOut={handleLogOut} />}

            <LoginModal isOpen={isOpen} onClose={onClose} />
            <LoginOrgaModal isOpen={isOpenOrgaLogin} onClose={onCloseOrgaLogin} />
        </>
    );
};

// Export
export default Navbar;
