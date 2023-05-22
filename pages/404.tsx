import { Button, Img, Stack, Text, VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

const Custom404 = () => {
    const router = useRouter();
    return (
        <>
            <NextSeo title="Error 404 - Impact Matching" />

            <Stack
                bgImage="/images/nasa.jpg"
                bgSize="cover"
                height="100vh"
                w="full"
                bgPosition="center"
                bgAttachment="fixed"
                align="center"
                justify="center"
            >
                <VStack
                    align="center"
                    textAlign="center"
                    py="50px"
                    px="30px"
                    rounded="16px"
                    maxW="394px"
                    h="fit-content"
                    bg="gray.800"
                    spacing="30px"
                >
                    <Img
                        src="https://bucket-company-pitch.s3.amazonaws.com/img/logo_impact_matching.png"
                        w="170px"
                        h="45px"
                    />
                    <VStack spacing="25px">
                        <Text fontWeight="700" fontSize="60px" lineHeight="60px">
                            404
                        </Text>

                        <VStack spacing="10px" mt="25px">
                            <Text fontWeight="700" fontSize="30px" lineHeight="36px">
                                Algo ha ido mal
                            </Text>
                            <Text fontFamily="inter" fontSize="16px">
                                La página que buscas no se ha encontrado, prueba volviendo al explorador
                            </Text>
                        </VStack>
                    </VStack>

                    <Button
                        onClick={() => router.push('/explorer')}
                        variant="solid"
                        fontSize="14px"
                        fontWeight="normal"
                        fontFamily="inter"
                        h="40px"
                        py="10px"
                        px="30px"
                    >
                        Ir al explorador
                    </Button>
                </VStack>
            </Stack>
        </>
    );
};

export default Custom404;
