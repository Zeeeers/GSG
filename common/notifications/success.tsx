// Dependencies
import { Alert, AlertDescription, AlertTitle, Flex, Icon, Stack } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

// Types
interface Props {
    title: string;
    description: string;
}

// Component
const SuccessNotification: React.FC<Props> = ({ title, description }) => {
    return (
        <Alert
            borderRadius={'lg'}
            borderLeft={'solid 6px'}
            borderColor={'primary.500'}
            bgColor={'white.base'}
            shadow={'card'}
        >
            <Stack>
                <Flex>
                    <Icon as={FaCheckCircle} color={'primary.500'} mr={3} />
                    <AlertTitle>{title}</AlertTitle>
                </Flex>

                <AlertDescription fontSize="sm">{description}</AlertDescription>
            </Stack>
        </Alert>
    );
};

// Export
export default SuccessNotification;
