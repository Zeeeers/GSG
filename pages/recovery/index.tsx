// Dependencies
import { useEffect } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useRecoveryStore } from 'stores/recovery';
import { IconButton, useMediaQuery } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import LogoBar from 'layouts/guest/logoBar';
import RecoveryForm from 'components/recovery/recoveryForm';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import { IOptChImage } from '@clyc/optimized-image/components/chakraImage';

// Dynamic
const Image = dynamic<IOptChImage>(() => import('@clyc/optimized-image/components/chakraImage'));
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));
const RecoverySent = dynamic(() => import('components/recovery/recoverySent'));

// Page
const RecoverAccount: NextPage = () => {
    // States
    const router = useRouter();
    const [isDesktop] = useMediaQuery('(min-width: 62em)');
    const recoveryStatus = useRecoveryStore((state) => state.status);
    const clearValues = useRecoveryStore((state) => state.clearValues);

    // Effects
    useEffect(() => {
        router.prefetch('/');
        router.prefetch('/login');
    }, [router]);

    return (
        <>
            <NextSeo title={'Recuperar contraseña en Skala Inversiones'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_COOKIE_NAME!} fallbackUrl="/home" />

            <LogoBar>
                <Link href={'/'} passHref>
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
                            clearValues();
                        }}
                    />
                </Link>

                {recoveryStatus === 'FORM' ? <RecoveryForm /> : <RecoverySent />}
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
export default RecoverAccount;
