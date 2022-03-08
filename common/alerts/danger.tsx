// Dependencies
import { Alert } from '@chakra-ui/react';

// Types
interface Props {
    message: string;
}

// Components
const DangerAlert: React.FC<Props> = ({ message }) => {
    return (
        <Alert
            variant="solid"
            bg={'danger.400'}
            borderRadius={'lg'}
            fontWeight="semibold"
            textAlign="center"
            justifyContent="center"
        >
            {message}
        </Alert>
    );
};

// Export
export default DangerAlert;
