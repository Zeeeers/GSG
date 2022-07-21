// Dependencies
import Link from 'next/link';
import { Flex, HStack, Img, Text, VStack } from '@chakra-ui/react';
//import Image from '@clyc/optimized-image/components/chakraImage';

// Component
const LogoBar: React.FC = ({ children }) => {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            bgImage="/images/nasa.jpg"
            bgSize="cover"
            height="1080px"
            w="full"
            bgPosition="center"
            bgAttachment="scroll"
        >
            <VStack spacing="30px" mt="100px">
                <Text fontSize="36px" fontWeight="bold">
                    Inversiones de impacto
                </Text>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    margin="auto"
                    marginTop="40px"
                    h="fit-content"
                    width="fit-content"
                    p={{ base: '25px', md: 30 }}
                    bgColor="gray.900"
                    rounded="16px"
                >
                    <Link href="/explorer" passHref>
                        <HStack mb="20px" spacing={3} alignItems="center" cursor="pointer">
                            <Img src="/images/logo_match_blanco.png" />
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
