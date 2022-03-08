// Dependencies
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Heading, IconButton, useMediaQuery } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import LogoBar from 'layouts/guest/logoBar';
import { useCreatePassStore } from 'stores/createPass';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import { IOptChImage } from '@clyc/optimized-image/components/chakraImage';
import { useEffect } from 'react';

// Dynamic
const Image = dynamic<IOptChImage>(() => import('@clyc/optimized-image/components/chakraImage'));
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));
const CreatePassForm = dynamic(() => import('components/createNewPass/newPasswordForm'));
const CreatePassSuccess = dynamic(() => import('components/createNewPass/newPasswordSuccess'));

// Page
const CreateNewPassword: NextPage = () => {
    // States
    const status = useCreatePassStore((state) => state.status);
    const setStatus = useCreatePassStore((state) => state.updateStatus);
    const [isDesktop] = useMediaQuery('(min-width: 62em)');
    const router = useRouter();

    // Effects
    useEffect(() => {
        router.prefetch('/');
        router.prefetch('/login');
    }, [router]);

    return (
        <>
            <NextSeo title={'Crear una nueva contraseña en Skala Desafíos'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/home" />

            <LogoBar>
                <Link href={'/login'} passHref>
                    <IconButton
                        mt={8}
                        mb={4}
                        py={4}
                        aria-label={'Volver a la pagina de inicio'}
                        w={'fit-content'}
                        borderRadius={'full'}
                        icon={<FaArrowLeft />}
                        onClick={async () => {
                            await router.push('/');
                            setStatus('FORM');
                        }}
                    />
                </Link>

                {status === 'FORM' ? (
                    <>
                        <Heading as="h1" size="4xl" fontWeight="bold">
                            Crear nueva contraseña
                        </Heading>

                        <CreatePassForm />
                    </>
                ) : (
                    <CreatePassSuccess />
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
export default CreateNewPassword;
