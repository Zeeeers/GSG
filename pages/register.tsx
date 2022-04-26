// Dependencies
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useRegisterStore } from 'stores/register';
import { IconButton, Heading, useMediaQuery } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import LogoBar from 'layouts/guest/logoBar';
import RegisterForm from 'components/register/registerForm';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import { IOptChImage } from '@clyc/optimized-image/components/chakraImage';

// Dynamic
const Image = dynamic<IOptChImage>(() => import('@clyc/optimized-image/components/chakraImage'));
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));
//const RegisterSuccess = dynamic(() => import('components/register/registerSuccess'));

// Page
const RegisterPage: NextPage = () => {
    // States
    const clearFormValues = useRegisterStore((state) => state.clearFormValues);
    const registerStatus = useRegisterStore((state) => state.status);
    const setRegisterStatus = useRegisterStore((state) => state.updateStatus);
    const [isDesktop] = useMediaQuery('(min-width: 62em)');
    const router = useRouter();

    // Effect
    useEffect(() => {
        router.prefetch('/');
        router.prefetch('/login');
    }, [router]);

    return (
        <>
            <NextSeo title={'Registrarse en Skala Desafíos'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/home" />

            <LogoBar>
                <Link href={'/login'} passHref>
                    <IconButton
                        mt={8}
                        mb={4}
                        py={4}
                        aria-label={'Ir a la página anterior'}
                        w={'fit-content'}
                        borderRadius={'full'}
                        icon={<FaArrowLeft />}
                        onClick={async () => {
                            router.back();
                            clearFormValues();
                            setRegisterStatus('FORM');
                        }}
                    />
                </Link>

                {registerStatus === 'FORM' ? (
                    <>
                        <Heading as="h1" size="4xl" fontWeight="bold">
                            Crear cuenta
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
                    <Image
                        src={'https://skala-chile.s3.us-east-2.amazonaws.com/desafios/public_side_background-min.jpg'}
                        alt="Skala desafios"
                        tWidth={3358 / 2}
                        tHeight={2348 / 2}
                        h="full"
                        w="full"
                        objectFit="cover"
                    />
                </SideBackground>
            )}
        </>
    );
};

// Export
export default RegisterPage;
