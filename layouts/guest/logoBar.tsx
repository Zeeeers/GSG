// Dependencies
//@ts-nocheck
import { Flex, HStack, Img, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Component
const LogoBar: React.FC = ({ children }) => {
    const router = useRouter();

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            bgImage="/images/nasa.jpg"
            bgSize="cover"
            height={{ base: '100%', xl: router.asPath === '/login' ? '100vh' : '100%' }}
            w="full"
            bgPosition="center"
            bgAttachment="fixed"
            pb="70px"
        >
            <VStack spacing="30px" mt="20px" h="fit-content" w="full">
                <Text fontSize="36px" fontWeight="bold" textTransform="uppercase">
                    Inversión de impacto
                </Text>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    margin="auto"
                    marginTop="40px"
                    h="100vh"
                    w={{ base: 'full', sm: '460px' }}
                    p={{ base: '25px', md: 30 }}
                    bgColor="gray.800"
                    rounded="16px"
                    h="fit-content"
                >
                    <Link href="/explorer" passHref>
                        <HStack w="full" spacing={3} alignItems="center" cursor="pointer">
                            <Img
                                src="https://skala-chile.s3.us-east-2.amazonaws.com/production/match_logo_V.2.png"
                                w="133px"
                                h="35px"
                            />
                        </HStack>
                    </Link>

                    {children}
                </Flex>
            </VStack>
        </Flex>
    );
};

// Export
export default LogoBar;
