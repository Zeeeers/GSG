// Dependencies
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HStack, useMediaQuery, useDisclosure, Img, Container } from '@chakra-ui/react';
import { useUser } from '../../services/api/lib/user/user.calls';
import { Button } from '@chakra-ui/button';
import LoginModal from 'components/login/loginModal';
import LoginOrgaModal from 'components/organization/loginOrgaModal';
import { useOrganization } from 'services/api/lib/organization';
import OrgaMenu from './menu/orgaMenu';

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
    const { data: userResponse, mutate } = useUser();
    const { data: orga, mutate: reloadOrga } = useOrganization(true);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenOrgaLogin, onClose: onCloseOrgaLogin } = useDisclosure();

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

    const handleLogOutOrga = async () => {
        const auth = (await import('@clyc/next-route-manager/libs/AuthManager')).default;
        auth.removeToken(process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME!, {
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'TRUE',
        });
        router.push('/explorer');
        reloadOrga();
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
            <HStack
                w="full"
                bgColor={{ base: 'gray.800', md: 'gray.900' }}
                zIndex={50}
                position="fixed"
                as="nav"
                shadow="sm"
                top={0}
            >
                <Container
                    display="flex"
                    maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }}
                    justifyContent="space-between"
                    py={{ base: '15px', md: '20px' }}
                >
                    <Link href="/explorer" passHref>
                        <HStack spacing={{ base: 2, lg: 3 }} alignItems="center" cursor="pointer">
                            <Img
                                src="https://skala-chile.s3.us-east-2.amazonaws.com/production/match_logo_V.2.png"
                                w="130px"
                                h="35px"
                            />
                        </HStack>
                    </Link>

                    {userResponse?.user === undefined && orga === undefined ? (
                        isTablet ? (
                            <HStack spacing="15px">
                                <Button variant="outline" onClick={() => router.push('/register')}>
                                    ¿Eres empresa? levantar capital
                                </Button>
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
                    ) : userResponse?.user !== undefined ? (
                        <UserMenu onLogOut={handleLogOut} />
                    ) : (
                        <OrgaMenu onLogOut={handleLogOutOrga} />
                    )}
                </Container>
            </HStack>

            {isMenuAvailable && <MobileMenu onLogOut={handleLogOut} />}

            <LoginModal isOpen={isOpen} onClose={onClose} investorReload={mutate} orgaReload={reloadOrga} />
            <LoginOrgaModal isOpen={isOpenOrgaLogin} onClose={onCloseOrgaLogin} />
        </>
    );
};

// Export
export default Navbar;
