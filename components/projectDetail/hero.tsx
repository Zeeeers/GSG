// Dependencies
import { Img, Badge, Container, Flex, VStack, Text, Stack, Button, useDisclosure, HStack } from '@chakra-ui/react';
import CurrencyFormat from 'common/currencyFormat';
import { useEffect, useState } from 'react';
import { Gsg } from 'services/api/types/Gsg';
import Body from './body';
import ContactModal from './contactModal';

interface Props {
    project: Gsg | undefined;
}

// Component
const HeaderHero: React.FC<Props> = ({ project }) => {
    // States
    const [sticky, setSticky] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleScroll = () => {
        if (window.scrollY > 370) {
            setSticky(true);
        } else if (window.scrollY < 250) {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });
    return (
        <>
            <Flex w="full" h="90px" position="absolute">
                <Container
                    maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }}
                    pt={{ base: 0, md: 4 }}
                    pb={16}
                    px={{ base: 0, md: 4, lg: 12, xl: 6 }}
                >
                    <Stack
                        display={{ base: 'none', md: 'flex' }}
                        position={sticky ? 'fixed' : 'absolute'}
                        alignItems="end"
                        spacing="30px"
                        zIndex={30}
                        marginLeft="-80px"
                        marginTop={sticky ? '5px' : '350px'}
                    >
                        <Button
                            color="teal.400"
                            fontWeight="medium"
                            variant="unstyled"
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                            rounded={0}
                            borderBottom="2px"
                        >
                            Acerca de
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Impacto
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Problema
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Solución
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Inf. complementaria
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Finanzas
                        </Button>

                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Modelo de negocio
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Uso de ingresos
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Oportunidad de inversión
                        </Button>
                        <Button variant="unstyled" _hover={{ color: 'teal.500' }} fontSize="sm">
                            Equipo
                        </Button>
                    </Stack>

                    <VStack w="full">
                        <Flex w="full" direction="column" position="relative">
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                w="full"
                                h={{ base: '140px', md: '20rem' }}
                                overflow="hidden"
                            >
                                <Img
                                    src={project?.main_image?.url}
                                    alt="Imagen del desafio"
                                    w={{ base: 'full', md: 898 }}
                                    objectFit="cover"
                                    borderRadius={{ base: 0, md: '2xl' }}
                                    h="full"
                                />
                            </Flex>

                            <Flex
                                position={{ base: 'relative', md: 'absolute' }}
                                bottom={{ base: 0, md: '-20rem' }}
                                justifyContent="center"
                                w="full"
                            >
                                <VStack
                                    boxShadow="lg"
                                    bg="blue.700"
                                    w={{ base: 'full', md: 898 }}
                                    h={{ base: 'full', md: '-webkit-fit-content' }}
                                    justifyContent="start"
                                    alignItems="start"
                                    rounded={{ base: 0, md: '2xl' }}
                                    px={{ base: '24px', md: '40px' }}
                                    py={{ base: '24px', md: '30px' }}
                                    spacing={0}
                                >
                                    <VStack align="flex-start" spacing="10px" mb="20px">
                                        <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="bold">
                                            {project?.title.toLocaleUpperCase()}
                                        </Text>
                                        <Text fontSize={{ base: 'sm', md: 'md' }}>{project?.business_name}</Text>
                                        <Text fontSize={{ base: 'sm', md: 'md' }} fontFamily="inter" as="p">
                                            {project?.description}
                                        </Text>
                                    </VStack>
                                    <Badge
                                        variant="solid"
                                        colorScheme="green"
                                        textAlign="center"
                                        alignItems="center"
                                        py="2px"
                                        px="8px"
                                        rounded="6px"
                                        mt={0}
                                    >
                                        {project?.stage}
                                    </Badge>
                                    <VStack align="flex-start" w="full" pt="20px" m={0} spacing={0}>
                                        <Text>Levantamiento buscado</Text>
                                        <Flex
                                            justifyContent="space-between"
                                            direction={{ base: 'column', md: 'row' }}
                                            w="full"
                                            pt="5px"
                                        >
                                            <Stack spacing="5px">
                                                <CurrencyFormat
                                                    fontSize="4xl"
                                                    fontWeight="medium"
                                                    number={project?.finance_goal ?? 0}
                                                />
                                                <Text fontSize="sm">Fecha Límite 10 de marzo</Text>
                                            </Stack>

                                            <Stack
                                                alignItems={{ base: 'center', md: 'start' }}
                                                spacing="5px"
                                                mt={{ base: '20px', md: 0 }}
                                            >
                                                <Button
                                                    onClick={onOpen}
                                                    w={{ base: 'full', md: '212px' }}
                                                    variant="solid"
                                                >
                                                    Contactar
                                                </Button>
                                                <Text fontSize="xs">Quedan 23 días</Text>
                                            </Stack>
                                        </Flex>
                                    </VStack>
                                </VStack>
                            </Flex>
                        </Flex>

                        <Flex
                            w="full"
                            justifyContent={{ base: 'center', md: 'flex-end' }}
                            mb={{ base: 4, md: '3rem !important' }}
                            mt={{ base: '5rem !important', md: '1rem !important' }}
                            position="relative"
                            zIndex={100}
                            minH={8}
                        ></Flex>
                    </VStack>

                    <Body project={project} />
                </Container>
            </Flex>

            <ContactModal isOpen={isOpen} onClose={onClose} project={project} />
        </>
    );
};

// Export
export default HeaderHero;
