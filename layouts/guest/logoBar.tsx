// Dependencies
//@ts-nocheck
import Link from 'next/link';
import { Flex, HStack, Img, Text, VStack } from '@chakra-ui/react';

// Component
const LogoBar: React.FC = ({ children }) => {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            bgImage="/images/nasa.jpg"
            bgSize="cover"
            height="100%"
            w="full"
            bgPosition="center"
            bgAttachment="fixed"
            pb="100px"
        >
            <VStack spacing="30px" mt="60px" h="100%" w="full">
                <Text fontSize="36px" fontWeight="bold">
                    Inversión de impacto
                </Text>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    margin="auto"
                    marginTop="40px"
                    h="fit-content"
                    w={{ base: 'full', sm: '460px' }}
                    p={{ base: '25px', md: 30 }}
                    bgColor="gray.800"
                    rounded="16px"
                >
                    <Link href="/explorer" passHref>
                        <HStack mb="10px" spacing={3} alignItems="center" cursor="pointer">
                            <Img
                                src="https://clycme-images.s3.us-east-2.amazonaws.com/images/logo/logo_match.png"
                                w="40px"
                                h="40px"
                            />
                            <Text
                                fontSize="3xl"
                                textAlign="start"
                                fontWeight="bold"
                                color="primary.500"
                                pt={1}
                                cursor="pointer"
                            >
                                MATCH
                            </Text>
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
