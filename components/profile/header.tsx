// Dependencies

import { Button, Heading, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

// Component
const ProfileHeader: React.FC = () => {
    const router = useRouter();

    return (
        <HStack align="baseline" as="header" alignItems={'center'} spacing="20px">
            <Button
                variant="outline"
                textColor="teal.300"
                borderColor="teal.300"
                fontWeight="bold"
                _hover={{ background: 'teal.300', color: 'white' }}
                borderRadius="full"
                w="40px"
                h="40px"
                onClick={() => router.push('/explorer')}
            >
                {'<-'}
            </Button>
            <Heading as="h1" fontSize={{ base: '3xl', lg: '4xl' }} fontWeight="bold">
                CUENTA
            </Heading>
        </HStack>
    );
};

// Export
export default ProfileHeader;
