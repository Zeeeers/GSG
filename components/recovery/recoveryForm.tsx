// Dependencies
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useRecaptcha from 'hooks/useRecaptcha';
import { IRecoveryData, recoverySchema } from 'forms/recovery';
import { useRecoveryStore } from 'stores/recovery';

// Dynamic
const DangerAlert = dynamic(() => import('common/alerts/danger'));

// Types
interface AfterStatus {
    status: '' | 'SENDING_EMAIL' | 'ERROR' | 'SUCCESS';
    message: string;
}

// Component
const RecoveryForm: React.FC = () => {
    // States
    const router = useRouter();
    const setRecoveryStatus = useRecoveryStore((state) => state.updateStatus);
    const setEmail = useRecoveryStore((state) => state.updateEmail);
    const [afterStatus, setAfterStatus] = useState<AfterStatus>({ status: '', message: '' });
    const { status, executeAsync, ReCAPTCHA, validate, ref } = useRecaptcha();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IRecoveryData>({
        resolver: zodResolver(recoverySchema),
    });

    // Handlers
    const validateCaptcha = async (): Promise<boolean> => {
        const token = await executeAsync();

        if (token) {
            const validated = await validate(token);

            return validated;
        }

        return false;
    };

    const handleRecovery = async (values: IRecoveryData) => {
        const isValidCaptcha = await validateCaptcha();

        if (isValidCaptcha) {
            setAfterStatus({ status: 'SENDING_EMAIL', message: '' });
            const { recoverPassword } = await import('services/api/lib/auth');

            const { ok } = await recoverPassword({ email: values.email, kind: 'company_skala' });

            if (ok) {
                setEmail(values.email);
                setRecoveryStatus('SUCCESS');
            } else {
                setAfterStatus({
                    status: 'ERROR',
                    message: 'Un error inesperado ha ocurrido. Por favor, intentalo nuevamente.',
                });
            }
        }
    };

    return (
        <>
            <Heading as="h1" size="4xl" fontWeight="bold">
                Recuperar cuenta
            </Heading>

            <form autoComplete="off" onSubmit={handleSubmit(handleRecovery)}>
                <FormControl id="email" mt={8} mb={6} isInvalid={!!errors.email}>
                    <FormLabel>Correo electrónico</FormLabel>

                    <Input size="md" {...register('email')} />

                    <FormErrorMessage fontWeight="semibold">{errors.email?.message}</FormErrorMessage>
                </FormControl>

                {status.status === 'ERROR' && <DangerAlert message={status.message} />}
                {afterStatus.status === 'ERROR' && <DangerAlert message={afterStatus.message} />}

                <Button
                    type="submit"
                    mt={6}
                    variant="solid"
                    loadingText={
                        status.status === 'VALIDATING_CAPTCHA' ? 'Verificando captcha' : 'Enviando correo electrónico'
                    }
                    isLoading={status.status === 'VALIDATING_CAPTCHA' || afterStatus.status === 'SENDING_EMAIL'}
                >
                    Recuperar contraseña
                </Button>
            </form>

            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
                size="invisible"
                badge="bottomleft"
                ref={ref}
                hl={router.locale}
            />
        </>
    );
};

// Export
export default RecoveryForm;
