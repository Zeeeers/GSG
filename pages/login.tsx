// Dependencies
import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { Button, Flex, Heading, Img, Stack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import LogoBar from 'layouts/guest/logoBar';
import LoginForm from 'components/login/loginForm';

// Dynamic
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));

// Page
const LoginPage: NextPage = () => {
    // States
    const [isDesktop] = useMediaQuery('(min-width: 62em)');

    return (
        <>
            <NextSeo title={'Iniciar sesión - Skala Desafíos'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/home" />

            <LogoBar>
                <Stack alignItems="start" w="full">
                    <Flex flexDir="column" mt={8}>
                        <Heading as="h1" size="4xl" fontWeight="bold" mb={1}>
                            INICIAR SESIÓN
                        </Heading>

                        <Text fontSize="md">Ingresa a tu cuenta para continuar</Text>
                    </Flex>

                    <LoginForm />

                    <VStack w="full">
                        <Link href="/recovery" passHref>
                            <Button
                                variant="link"
                                transitionProperty="all"
                                transitionDuration={'slow'}
                                colorScheme="gray"
                                my={4}
                            >
                                Olvidé mi contraseña
                            </Button>
                        </Link>
                        <Text>Aún no tengo cuenta</Text>
                        <Link href="/register" passHref>
                            <Button
                                variant="outline"
                                transitionProperty="all"
                                transitionDuration={'slow'}
                                colorScheme="gray"
                                w="full"
                                my={4}
                            >
                                Registrarme
                            </Button>
                        </Link>
                    </VStack>
                </Stack>
            </LogoBar>

            {isDesktop && (
                <SideBackground>
                    <Img src="/images/earth.jpg" objectFit="cover" objectPosition="center" h="full" w="full" />
                </SideBackground>
            )}
        </>
    );
};

// Export
export default LoginPage;
