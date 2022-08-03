// Dependencies
//@ts-nocheck
import { NextPage } from 'next';
import { useState } from 'react';
import {
    Container,
    Flex,
    Heading,
    Menu,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    MenuButton,
    Text,
    Button,
    Icon,
    Input,
    HStack,
    VStack,
    SimpleGrid,
    Stack,
} from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown, FaSearch } from 'react-icons/fa';
import NavbarFilter from 'components/explorer/navbarFilter/navbarFilter';
import ExplorerCard from 'components/explorer/explorerCard/explorerCard';
import Navbar from 'layouts/main/navbar';
import { useGsg } from 'services/api/lib/gsg';

import { projects } from 'services/api/data';
import { NextSeo } from 'next-seo';

const Explorer: NextPage = ({}) => {
    // filter orderBy
    const [orderBy, setOrderBy] = useState<'[id,asc]' | '[id,desc]'>('[id,desc]');
    // data proyects
    const { data: gsg } = useGsg();

    console.log(gsg?.data?.projects.filter((item) => item.status === 'published'));

    return (
        <>
            <NextSeo title={'Explorador - GSG'} />
            <Navbar />
            <Container maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }} mb="124px" mt="120px">
                <Stack
                    justify={'space-between'}
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent="end"
                    w="full"
                >
                    <Heading fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" w="full" textAlign="left">
                        PROYECTOS DE INVERSIÓN
                    </Heading>
                    <Stack spacing="13px" direction={{ base: 'column-reverse', md: 'row' }} w="full">
                        <HStack spacing="20px" w="full" justifyContent="end">
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton
                                            border="1px"
                                            borderColor="gray.500"
                                            h="40px"
                                            as={Button}
                                            w={{ base: 'full', lg: '194px' }}
                                        >
                                            <Flex
                                                py="8px"
                                                px="16px"
                                                justifyContent="space-between"
                                                w="full"
                                                alignItems="center"
                                                fontWeight="normal"
                                                fontSize="md"
                                            >
                                                <Text>
                                                    {orderBy === '[id,desc]' ? 'Más recientes' : 'Más antiguos'}
                                                </Text>
                                                <Icon as={isOpen ? FaChevronUp : FaChevronDown} ml={2} />
                                            </Flex>
                                        </MenuButton>
                                        <MenuList w={{ base: 'full', md: '194px' }}>
                                            <MenuOptionGroup
                                                value={orderBy}
                                                onChange={(e: '[id,asc]' | '[id,desc]') => setOrderBy(e)}
                                            >
                                                <MenuItemOption value="[id,desc]" fontWeight="normal">
                                                    Más recientes
                                                </MenuItemOption>
                                                <MenuItemOption value="[id,asc]" fontWeight="normal">
                                                    Más antiguos
                                                </MenuItemOption>
                                            </MenuOptionGroup>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </HStack>

                        <HStack spacing="9px" w="full">
                            <Input w={{ base: 'full', md: '184px' }} variant="outline" placeholder="Buscar" />
                            <Button
                                variant="solid"
                                bg="gray.600"
                                _focus={{ outline: 'none' }}
                                aria-label="Buscar"
                                textColor="white"
                                py="10px"
                                px="16px"
                                w="110px"
                            >
                                <HStack w="full" spacing="10px">
                                    <Icon as={FaSearch} />
                                    <Text>Buscar</Text>
                                </HStack>
                            </Button>
                        </HStack>
                    </Stack>
                </Stack>

                <VStack mt={{ base: '20px', md: '40px' }} align="start" spacing="36px">
                    <NavbarFilter />
                    {gsg?.data?.projects.length !== 0 ? (
                        <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing="37px">
                            {gsg?.data?.projects[0].map((project) => (
                                <ExplorerCard key={project.id} project={project} />
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text fontSize="2xl" fontWeight="bold">
                            No hay proyectos publicados
                        </Text>
                    )}
                </VStack>
            </Container>
        </>
    );
};

export default Explorer;
