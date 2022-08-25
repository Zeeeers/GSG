// Dependencies
//@ts-nocheck
import { Flex, HStack, Img, Text, VStack } from '@chakra-ui/react';
import PublicPage from '@clyc/next-route-manager/components/PublicPage';
import AdminLoginForm from 'components/admin/adminLoginForm';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

// Dynamic
const SideBackground = dynamic(() => import('layouts/guest/sideBackground'));

// Page
const AdminLogin: NextPage = () => {
    return (
        <>
            <NextSeo title={'Iniciar sesión administrador - GSG'} />
            <PublicPage cookieName={process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!} fallbackUrl="/admin/dashboard" />
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
                        <HStack mb="20px" spacing={3} alignItems="center" cursor="pointer">
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
                        <VStack maxW="504px" alignItems="center">
                            <Text fontSize="30px" fontWeight="bold" textTransform="uppercase" textAlign="center">
                                Ingresar como administrador
                            </Text>

                            <AdminLoginForm />
                        </VStack>
                    </Flex>
                </VStack>
            </Flex>
        </>
    );
};

// Export
export default AdminLogin;
