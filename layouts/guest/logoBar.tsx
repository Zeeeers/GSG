// Dependencies
import Link from 'next/link';
import { Flex, HStack, Img, Text } from '@chakra-ui/react';
//import Image from '@clyc/optimized-image/components/chakraImage';

// Component
const LogoBar: React.FC = ({ children }) => {
    return (
        <Flex
            flexDirection="column"
            position={'absolute'}
            left={0}
            h={'100vh'}
            width={{ base: 'full', lg: 5 / 12 }}
            p={{ base: '25px', md: 20 }}
            bgColor="gray.900"
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
    );
};

// Export
export default LogoBar;
