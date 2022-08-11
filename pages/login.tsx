// Dependencies
//@ts-nocheck
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import {
    Button,
    Flex,
    Heading,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import LogoBar from 'layouts/guest/logoBar';
import LoginForm from 'components/login/loginForm';
import { useEffect } from 'react';
import LoginOrgaForm from 'components/organization/loginOrgaForm';
import { useRouter } from 'next/router';

// Page
const LoginPage: NextPage = ({ token }) => {
    const toast = useToast();

    const handleActivate = async () => {
        const { activateAccount } = await import('../services/api/lib/auth');
        const { ok } = await activateAccount({ token: token });

        if (ok) {
            toast({
                title: 'Su cuenta ha sido activada con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    const router = useRouter();

    useEffect(() => {
        if (token) {
            handleActivate();
        }
    }, [token]);

    return (
        <>
            <NextSeo title={'Iniciar sesión - GSG'} />

            {process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME && (
                <PublicPage cookieName={process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!} fallbackUrl="/admin/dashboard" />
            )}

            <LogoBar>
                <Stack w="full" alignItems="flex-start">
                    <Flex flexDir="column" mt={8} gap="10px">
                        <Heading as="h1" size="4xl" fontWeight="bold">
                            INICIAR SESIÓN
                        </Heading>

                        <Text fontSize="md">Ingresa a tu cuenta para continuar</Text>
                    </Flex>

                    <Tabs w="full" fontFamily="inter" fontWeight="normal" fontSize="md" isLazy>
                        <TabList alignItems="flex-start" borderBottom="0" overflowX="auto" overflowY="hidden" pb="10px">
                            <Tab
                                pr="15px"
                                pl={0}
                                pt="20px"
                                borderBottom="2px"
                                textAlign="start"
                                alignItems="flex-start"
                                whiteSpace="nowrap"
                            >
                                Empresa
                            </Tab>
                            <Tab ml="15px" px={0} pt="20px" borderBottom="2px" whiteSpace="nowrap">
                                Inversionista
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel px={0}>
                                <LoginOrgaForm />

                                <Flex flexDirection={'column'} alignItems={'center'} mt="10px">
                                    <Link href="/recovery/recoveryPassword" passHref>
                                        <Button
                                            variant="link"
                                            transitionProperty="all"
                                            transitionDuration={'slow'}
                                            colorScheme="primary"
                                            fontWeight={'normal'}
                                        >
                                            Olvidé mi contraseña
                                        </Button>
                                    </Link>
                                    <VStack spacing="10px" mt="20px">
                                        <Button
                                            onClick={() => router.push('/register')}
                                            variant="outline"
                                            transitionProperty="all"
                                            transitionDuration={'slow'}
                                            colorScheme="secondary"
                                            w="320px"
                                            fontWeight={'normal'}
                                        >
                                            Registrarme
                                        </Button>
                                    </VStack>
                                </Flex>
                            </TabPanel>
                            <TabPanel px={0}>
                                <LoginForm />

                                <Flex flexDirection={'column'} alignItems={'center'}>
                                    <Link href="/recovery/recoveryPassword" passHref>
                                        <Button
                                            variant="link"
                                            transitionProperty="all"
                                            transitionDuration={'slow'}
                                            colorScheme="primary"
                                            fontWeight="normal"
                                        >
                                            Olvidé mi contraseña
                                        </Button>
                                    </Link>
                                    <VStack spacing="7px" mt="36px">
                                        <Text fontSize={'md'} fontWeight={'normal'} fontFamily="inter">
                                            ¿Eres inversionista y no tienes cuenta?
                                        </Text>
                                        <Button variant="outline">Solicitar una invitación</Button>
                                    </VStack>
                                </Flex>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            </LogoBar>
        </>
    );
};

// Export
export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = context.query;

    if (token) {
        return {
            props: {
                token,
            }, // will be passed to the page component as props
        };
    } else {
        return {
            props: {},
        };
    }
};
