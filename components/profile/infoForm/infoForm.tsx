// Dependencies
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useUser } from 'services/api/lib/user';
import InfoSkeleton from './infoForm.skeleton';

// Components
const InfoForm: React.FC = () => {
    // States
    const { data: user } = useUser();

    return user ? (
        <FormControl id="email" mt={6} w={{ lg: 8 / 12 }}>
            <FormLabel fontSize="lg" fontWeight="bold">
                Correo electrónico
            </FormLabel>

            <Input name="email" value={user?.email} onChange={() => null} fontWeight="medium" size="md" mt={2} />
        </FormControl>
    ) : (
        <InfoSkeleton />
    );
};

// Export
export default InfoForm;
