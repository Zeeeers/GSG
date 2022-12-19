// Dependencies
import { Heading, HStack } from '@chakra-ui/react';

// Component
const ProfileHeader: React.FC = () => {
    return (
        <HStack align="baseline" as="header" alignItems={'center'} spacing="20px">
            <Heading as="h1" fontSize={{ base: '3xl', lg: '4xl' }} fontWeight="bold">
                CUENTA
            </Heading>
        </HStack>
    );
};

// Export
export default ProfileHeader;
