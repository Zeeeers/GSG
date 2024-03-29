// Dependencies
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Flex, HStack, Img, Link, Text, VStack } from '@chakra-ui/react';
import CreatePasswordForm from 'components/createPassword/createPasswordForm';

type Props = {
    token: string;
};
// Page
const ChangePassword: NextPage<Props> = ({ token }) => {
    return (
        <>
            <NextSeo title={'Crear contraseña - GSG'} />
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
                        <VStack maxW="504px" alignItems="flex-start">
                            <Text fontSize="24px" textAlign="center">
                                Hola Martín, te damos la bienvenida a GSG, para continuar crea tu contraseña
                            </Text>

                            <CreatePasswordForm token={token} />
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
    const { token } = context.query;

    if (!token) {
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
        }, // will be passed to the page component as props
    };
};
