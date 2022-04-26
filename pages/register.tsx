// Dependencies
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useRegisterStore } from 'stores/register';
import { Heading, useMediaQuery, Img } from '@chakra-ui/react';
import LogoBar from 'layouts/guest/logoBar';
import RegisterForm from 'components/register/registerForm';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';

// Dynamic
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));
//const RegisterSuccess = dynamic(() => import('components/register/registerSuccess'));

// Page
const RegisterPage: NextPage = () => {
    // States
    const registerStatus = useRegisterStore((state) => state.status);
    const [isDesktop] = useMediaQuery('(min-width: 62em)');
    const router = useRouter();

    // Effect
    useEffect(() => {
        router.prefetch('/');
        router.prefetch('/login');
    }, [router]);

    return (
        <>
            <NextSeo title={'Registrarse en GSG'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/explorer" />

            <LogoBar>
                {registerStatus === 'FORM' ? (
                    <>
                        <Heading as="h1" size="4xl" fontWeight="bold">
                            REGISTRO
                        </Heading>

                        <RegisterForm />
                    </>
                ) : (
                    <>
                        <Heading as="h1" size="4xl" fontWeight="bold">
                            Cuenta creada con éxito
                        </Heading>

                        {/*<RegisterSuccess />*/}
                    </>
                )}
            </LogoBar>

            {isDesktop && (
                <SideBackground>
                    <Img src="/images/nasa.jpg" objectFit="cover" objectPosition="center" h="full" w="full" />
                </SideBackground>
            )}
        </>
    );
};

// Export
export default RegisterPage;
