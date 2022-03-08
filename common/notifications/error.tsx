// Dependencies
import { Alert, AlertDescription, AlertTitle, Flex, Icon, Stack } from '@chakra-ui/react';
import { FaExclamationCircle } from 'react-icons/fa';

// Types
interface Props {
    title: string;
    description: string;
}

// Component
const ErrorNotification: React.FC<Props> = ({ title, description }) => {
    return (
        <Alert borderLeft={'solid 6px'} borderColor={'danger.500'} bgColor={'white.base'} shadow="lg">
            <Stack>
                <Flex>
                    <Icon as={FaExclamationCircle} color={'danger.500'} mr={3} />
                    <AlertTitle>{title}</AlertTitle>
                </Flex>

                <AlertDescription fontSize="sm">{description}</AlertDescription>
            </Stack>
        </Alert>
    );
};

ErrorNotification.displayName = 'ErrorNotification';

// Export
export default ErrorNotification;
