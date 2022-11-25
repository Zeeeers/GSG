// Dependencies
//@ts-nocheck
import { Button, Heading } from '@chakra-ui/react';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import RegisterStepOneForm from 'components/register/registerStepOneForm';
import RegisterStepTwoForm from 'components/register/registerStepTwoForm';
import LogoBar from 'layouts/guest/logoBar';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRegisterStore } from 'stores/register';

// Page
const RegisterPage: NextPage = () => {
    // States
    const registerStatus = useRegisterStore((state) => state.status);
    const router = useRouter();
    const step = useRegisterStore((state) => state.step);
    const clearFormValues = useRegisterStore((state) => state.clearFormValues);

    // Effect
    useEffect(() => {
        router.prefetch('/');
        router.prefetch('/login');
    }, [router]);

    return (
        <>
            <NextSeo title={'Registrarse en MATCH'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/explorer" />

            <LogoBar>
                {registerStatus === 'FORM' ? (
                    <>
                        <Heading w="full" as="h1" size="4xl" fontWeight="bold" mt="30px" textAlign="start">
                            REGISTRO
                        </Heading>
                        {step === 'ONE' ? <RegisterStepOneForm /> : <RegisterStepTwoForm />}

                        <Button
                            onClick={() => {
                                router.push('/login');
                                clearFormValues();
                            }}
                            variant="ghost"
                            mt="20px"
                        >
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
