// Dependencies
//@ts-nocheck
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Flex, HStack, Img, Link, Text, VStack } from '@chakra-ui/react';
import CreatePasswordForm from 'components/createPassword/createPasswordForm';

type Props = {
    token: string;
    jwt: string;
};
// Page
const ChangePassword: NextPage<Props> = ({ token, jwt }) => {
    return (
        <>
            <NextSeo title="Crear contraseña - MATCH" />
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
                        <Link href="/explorer">
                            <HStack mb="20px" spacing={3} alignItems="center" cursor="pointer">
                                <Img
                                    src="https://skala-chile.s3.us-east-2.amazonaws.com/production/match_logo_V.2.png"
                                    w="133px"
                                    h="35px"
                                />
                            </HStack>
                        </Link>
                        <VStack maxW="504px" alignItems="flex-start">
                            <Text fontSize="24px" textAlign="center">
                                Hola!, te damos la bienvenida a GSG, para continuar crea tu contraseña
                            </Text>

                            <CreatePasswordForm token={token} jwt={jwt} />
                        </VStack>
                    </Flex>
                </VStack>
            </Flex>
        </>
    );
};

// Export
export default ChangePassword;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token, jwt } = context.query;

    if (!token && !jwt) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {
            token,
            jwt,
        }, // will be passed to the page component as props
    };
};
