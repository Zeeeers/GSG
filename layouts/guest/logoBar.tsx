// Dependencies
import Link from 'next/link';
import { Flex, HStack, Text } from '@chakra-ui/react';
import Image from '@clyc/optimized-image/components/chakraImage';

// Component
const LogoBar: React.FC = ({ children }) => {
    return (
        <Flex
            flexDirection="column"
            position={'absolute'}
            left={0}
            h={'100vh'}
            width={{ base: 'full', lg: 5 / 12 }}
            p={8}
            bgColor="white.base"
        >
            <Link href="/" passHref>
                <HStack spacing={3} alignItems="center" cursor="pointer">
                    <Image
                        src={`https://skala-chile.s3.us-east-2.amazonaws.com/img/logos/logo-azul.svg`}
                        alt={'Skala Chile'}
                        h={7}
                        tHeight={50}
                        tWidth={120}
                        fitIn
                        cursor={'pointer'}
                    />

                    <Text fontSize="3xl" fontWeight="bold" color="primary.500" pt={1} cursor="pointer">
                        Inversiones
                    </Text>
                </HStack>
            </Link>

            {children}
        </Flex>
    );
};

// Export
export default LogoBar;
