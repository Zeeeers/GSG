import { Box, HStack, Skeleton } from '@chakra-ui/react';

const CardSkeleton: React.FC = () => {
    return (
        <Box
            w={{ base: 'full', lg: '332px' }}
            h="448px"
            roundedTop="18px"
            roundedBottom="8px"
            shadow="lg"
            bg="gray.800"
        >
            <Skeleton h="165px" roundedTop="18px" />

            <Box h="283px" px="20px" py="18px">
                <HStack>
                    <Skeleton w="73px" h="24px" />
                    <Skeleton w="73px" h="24px" />
                </HStack>

                <Skeleton h="48px" mt="15px" />
                <Skeleton h="100px" mt="10px" />

                <Skeleton h="32px" mt="20px" />
            </Box>
        </Box>
    );
};

export default CardSkeleton;
