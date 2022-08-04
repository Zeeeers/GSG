// Dependencies
//@ts-nocheck
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useRegisterStore } from 'stores/register';
import { Button, Heading, Link, Text } from '@chakra-ui/react';
import LogoBar from 'layouts/guest/logoBar';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import RegisterStepOneForm from 'components/register/registerStepOneForm';
import RegisterStepTwoForm from 'components/register/registerStepTwoForm';

// Page
const RegisterPage: NextPage = () => {
    // States
    const registerStatus = useRegisterStore((state) => state.status);
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

                        <Button onClick={() => router.push('/login')} variant="ghost" mt="20px">
                            Ya tengo cuenta
                        </Button>
                    </>
                ) : (
                    <>
                        <Heading as="h1" size="4xl" fontWeight="bold">
                            Cuenta creada con éxito
                        </Heading>
                    </>
                )}
            </LogoBar>
        </>
    );
};

// Export
export default RegisterPage;
