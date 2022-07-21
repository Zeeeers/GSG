// Dependencies
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useRegisterStore } from 'stores/register';
import { Heading, useMediaQuery } from '@chakra-ui/react';
import LogoBar from 'layouts/guest/logoBar';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import RegisterStepOneForm from 'components/register/registerStepOneForm';
import RegisterStepTwoForm from 'components/register/registerStepTwoForm';

// Dynamic
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));
//const RegisterSuccess = dynamic(() => import('components/register/registerSuccess'));

// Page
const RegisterPage: NextPage = () => {
    // States
    const registerStatus = useRegisterStore((state) => state.status);
    const [isDesktop] = useMediaQuery('(min-width: 62em)');
    const router = useRouter();
    const step = useRegisterStore((state) => state.step);

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
                        {step === 'ONE' ? <RegisterStepOneForm /> : <RegisterStepTwoForm />}
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
        </>
    );
};

// Export
export default RegisterPage;
