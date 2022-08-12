// Dependencies
//@ts-nocheck
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
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
import { useOrganization } from 'services/api/lib/organization';
import NotProject from 'components/explorer/statusProject/notProject';
import StatusProject from 'components/explorer/statusProject/status';
import { useGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { useFilterStore } from 'stores/filters';

const Explorer: NextPage = () => {
    // filter orderBy
    const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
    // data proyects
    const { data: gsg } = useGsg();
    const { data: orga } = useOrganization(true);
    const { data: project } = useGsgProject(orga?.gsg_project_id);
    const filters = useFilterStore((s) => s.filters);
    const setFilters = useFilterStore((s) => s.setFilters);

    const projectSort = gsg?.data?.projects[0].sort((a, b) =>
        orderBy === 'asc' ? (a.id < b.id ? -1 : 1) : a.id > b.id ? -1 : 1,
    );

    const projectFilter = projectSort?.filter((p) =>
        Object.values(p.qualities).find((p) => filters?.qualities?.includes(p.name)),
    );

    const projectFilterSearch = projectSort?.filter((p) => p.title.includes(filters?.search ?? ''));

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!orga) {
            setIsVisible(true);
        }
    }, []);

    return (
        <>
            <NextSeo title={'Explorador - GSG'} />
            <Navbar />
            <Container maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }} mb="124px" mt="120px">
                {orga !== undefined &&
                    (orga?.gsg_project_id ? <StatusProject project={project?.data.gsg_project} /> : <NotProject />)}

                {orga && (
                    <HStack bg="gray.700" p="20px" rounded="8px" mb="40px" justifyContent="space-between">
                        <VStack align="flex-start" w={{ base: 'full', sm: 'fit-content' }}>
                            <Text fontSize="24px" fontWeight="bold" fontFamily="barlow" textTransform="uppercase">
                                Revisar otros proyectos
                            </Text>
                            <Text fontFamily="inter">Explora proyectos que otras empresas han postulado</Text>

                            <Button
                                display={{ base: 'block', md: 'none' }}
                                bg="blue.700"
                                _hover={{ bg: 'blue.600' }}
                                h="40px"
                                variant="solid"
                                onClick={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? 'Ocultar' : 'Explorar'}
                            </Button>
                        </VStack>

                        <Button
                            display={{ base: 'none', md: 'block' }}
                            bg="blue.700"
                            _hover={{ bg: 'blue.600' }}
                            h="40px"
                            variant="solid"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? 'Ocultar' : 'Explorar'}
                        </Button>
                    </HStack>
                )}

                {isVisible ? (
                    <>
                        <Stack
                            justify={'space-between'}
                            direction={{ base: 'column', md: 'row' }}
                            justifyContent="end"
                            w="full"
                        >
                            <Heading
                                fontSize={{ base: '2xl', md: '4xl' }}
                                lineHeight="130%"
                                fontWeight="bold"
                                w="full"
                                textAlign="left"
                            >
                                PROYECTOS DE INVERSIÓN
                            </Heading>
                            <Stack
                                spacing="13px"
                                direction={{ base: 'column-reverse', md: 'row' }}
                                alignItems={{ base: 'center', sm: 'flex-end' }}
                                justifyContent="flex-end"
                            >
                                <HStack
                                    display={{ base: 'none', md: 'block' }}
                                    spacing="20px"
                                    justifyContent="flex-end"
                                >
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
                                                            {orderBy === 'desc' ? 'Más recientes' : 'Más antiguos'}
                                                        </Text>
                                                        <Icon as={isOpen ? FaChevronUp : FaChevronDown} ml={2} />
                                                    </Flex>
                                                </MenuButton>
                                                <MenuList w={{ base: 'full', md: '194px' }}>
                                                    <MenuOptionGroup
                                                        value={orderBy}
                                                        onChange={(e: 'asc' | 'desc') => setOrderBy(e)}
                                                    >
                                                        <MenuItemOption value="desc" fontWeight="normal">
                                                            Más recientes
                                                        </MenuItemOption>
                                                        <MenuItemOption value="asc" fontWeight="normal">
                                                            Más antiguos
                                                        </MenuItemOption>
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </>
                                        )}
                                    </Menu>
                                </HStack>

                                <Stack
                                    display={{ base: 'none', sm: 'flex' }}
                                    flexDirection="row"
                                    alignItems={{ base: 'center', sm: 'flex-end' }}
                                    justify={{ base: 'space-between', md: 'center' }}
                                    w="full"
                                >
                                    <Input
                                        w={{ base: 'full', sm: 'full', md: '184px' }}
                                        variant="outline"
                                        placeholder="Buscar"
                                        mr="5px"
                                        textColor="white"
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    />
                                </Stack>

                                <VStack display={{ base: 'block', sm: 'none' }} spacing="9px" w="full">
                                    <Input
                                        w="full"
                                        variant="outline"
                                        placeholder="Buscar"
                                        textColor="white"
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    />
                                </VStack>

                                <HStack
                                    display={{ base: 'block', md: 'none' }}
                                    spacing="20px"
                                    w="full"
                                    justifyContent="end"
                                >
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
                                                            {orderBy === 'desc' ? 'Más recientes' : 'Más antiguos'}
                                                        </Text>
                                                        <Icon as={isOpen ? FaChevronUp : FaChevronDown} ml={2} />
                                                    </Flex>
                                                </MenuButton>
                                                <MenuList w={{ base: 'full', md: '194px' }}>
                                                    <MenuOptionGroup
                                                        value={orderBy}
                                                        onChange={(e: 'asc' | 'desc') => setOrderBy(e)}
                                                    >
                                                        <MenuItemOption value="desc" fontWeight="normal">
                                                            Más recientes
                                                        </MenuItemOption>
                                                        <MenuItemOption value="asc" fontWeight="normal">
                                                            Más antiguos
                                                        </MenuItemOption>
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </>
                                        )}
                                    </Menu>
                                </HStack>
                            </Stack>
                        </Stack>

                        <VStack mt={{ base: '20px', md: '40px' }} align="start" spacing="36px">
                            <NavbarFilter />
                            {gsg?.data?.projects.length !== 0 ? (
                                <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing="37px">
                                    {projectFilter?.length !== 0
                                        ? projectFilter?.map((project) => (
                                              <ExplorerCard key={project.id} project={project} />
                                          ))
                                        : projectFilterSearch?.map((project) => (
                                              <ExplorerCard key={project.id} project={project} />
                                          ))}
                                </SimpleGrid>
                            ) : (
                                <Text fontSize="2xl" fontWeight="bold">
                                    No hay proyectos publicados
                                </Text>
                            )}
                        </VStack>
                    </>
                ) : (
                    ''
                )}
            </Container>
        </>
    );
};

export default Explorer;
