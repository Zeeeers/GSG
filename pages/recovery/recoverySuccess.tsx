// Dependencies
//@ts-nocheck
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { useRegisterStore } from 'stores/register';
import { Button, Flex, Heading, HStack, Img, Link, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import LogoBar from 'layouts/guest/logoBar';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import RegisterStepOneForm from 'components/register/registerStepOneForm';
import RegisterStepTwoForm from 'components/register/registerStepTwoForm';
import CreatePasswordForm from 'components/createPassword/createPasswordForm';
import RecoveryForm from 'components/recovery/createPasswordForm';

// Dynamic
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));
//const RegisterSuccess = dynamic(() => import('components/register/registerSuccess'));

// Page
const RecoveryPassword: NextPage = () => {
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
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    margin="auto"
                    marginTop="40px"
                    h="fit-content"
                    width="fit-content"
                    p={{ base: '25px', md: 30 }}
                    bgColor="gray.800"
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
                    <VStack maxW="504px" alignItems="center">
                        <VStack>
                            <Text fontSize="30px" fontWeight="bold" textTransform="uppercase" textAlign="center">
                                Gracias
                            </Text>
                            <Text fontSize="16px" fontFamily="inter" textAlign="center">
                                Te enviaremos un correo de reestablecimiento si tu cuenta está registrada dentro de
                                nuestra plataforma
                            </Text>
                        </VStack>
                        <Link href="/login" pt="40px">
                            <Button>Volver atrás</Button>
                        </Link>
                    </VStack>
                </Flex>
            </VStack>
        </Flex>
    );
};

// Export
export default RecoveryPassword;
