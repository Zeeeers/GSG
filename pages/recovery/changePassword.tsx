// Dependencies
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Flex, HStack, Img, Link, Text, VStack } from '@chakra-ui/react';
import CreatePasswordForm from 'components/createPassword/createPasswordForm';
import { userFetcher } from 'services/api/lib/user';
import { User } from 'services/api/types/User';

type Props = {
    token: string;
    jwt: string;
    user: User;
};
// Page
const ChangePassword: NextPage<Props> = ({ token, jwt, user }) => {
    return (
        <>
            <NextSeo title="Crear contraseña - Impact Matching" />
            <Flex
                flexDirection="column"
                alignItems="center"
                bgSize="cover"
                height="1080px"
                w="full"
                bgPosition="center"
                bgAttachment="scroll"
            >
                <VStack spacing="30px" mt="100px" width="full">
                    <Flex
                        flexDirection="column"
                        alignItems="start"
                        margin="auto"
                        marginTop="40px"
                        h="fit-content"
                        width="full"
                        maxW="500px"
                        p={{ base: '25px', md: 30 }}
                        bgColor="transparent"
                        rounded="16px"
                    >
                        <Link href="/explorer">
                            <HStack mb="20px" spacing={3} alignItems="start" justify="start" cursor="pointer">
                                <Img
                                    src="https://bucket-company-pitch.s3.amazonaws.com/img/logo_impact_matching.png"
                                    w="170px"
                                    h="45px"
                                />
                            </HStack>
                        </Link>
                        <VStack w="full" alignItems="flex-start" spacing="12px">
                            <VStack w="full" spacing="4px" alignItems="flex-start" lineHeight="31.2px">
                                <Text fontSize="24px" textAlign="start">
                                    ¡Hola {user?.name}!
                                </Text>
                                <Text fontSize="24px" textAlign="start">
                                    Te damos la bienvenida a GSG
                                </Text>
                            </VStack>

                            <Text fontSize="16px" textAlign="start" color="gray.400" lineHeight="22.4px">
                                Para continuar crea tu contraseña
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

    const response = await userFetcher(context.req, jwt as string);

    return {
        props: {
            token,
            jwt,
            user: response?.user,
        },
    };
};
