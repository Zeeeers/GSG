// Dependencies
//@ts-nocheck
import { NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Button, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import LogoBar from 'layouts/guest/logoBar';
import LoginForm from 'components/login/loginForm';

// Page
const LoginPage: NextPage = () => {
    return (
        <>
            <NextSeo title={'Iniciar sesión - GSG'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!} fallbackUrl="/admin/dasboard" />

            <LogoBar>
                <Stack w="417px" alignItems="flex-start">
                    <Flex flexDir="column" mt={8} gap="10px">
                        <Heading as="h1" size="4xl" fontWeight="bold">
                            INICIAR SESIÓN
                        </Heading>

                        <Text fontSize="md">Ingresa a tu cuenta para continuar</Text>
                    </Flex>

                    <LoginForm />

                    <VStack w="full">
                        <Link href="/recovery/recoveryPassword" passHref>
                            <Button
                                variant="link"
                                transitionProperty="all"
                                transitionDuration={'slow'}
                                colorScheme="white"
                                fontWeight="400"
                                textDecorationLine="underline"
                                my={4}
                            >
                                Olvidé mi contraseña
                            </Button>
                        </Link>
                        <Text pt="20px">Aún no tengo cuenta</Text>
                        <Link href="/register" passHref>
                            <Button
                                variant="outline"
                                transitionProperty="all"
                                transitionDuration={'slow'}
                                colorScheme="gray"
                                w="full"
                                h="40px"
                                my={4}
                            >
                                Registrarme
                            </Button>
                        </Link>
                    </VStack>
                </Stack>
            </LogoBar>
        </>
    );
};

// Export
export default LoginPage;
