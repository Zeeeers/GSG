// Dependencies
import { NextPage } from 'next';
import { useState } from 'react';
import {
    Box,
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
} from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown, FaSearch } from 'react-icons/fa';
import NavbarFilter from 'components/explorer/navbarFilter/navbarFilter';
import ExplorerCard from 'components/explorer/explorerCard/explorerCard';
import Navbar from 'layouts/main/navbar';
import { useGsg } from 'services/api/lib/gsg';

const Explorer: NextPage = ({}) => {
    // filter orderBy
    const [orderBy, setOrderBy] = useState<'[id,asc]' | '[id,desc]'>('[id,desc]');
    // data proyects
    const { data: gsg } = useGsg();

    return (
        <>
            <Navbar />
            <Container maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }} mb="124px" mt="50px">
                <Flex>
                    <Heading fontSize="4xl" fontWeight="medium" w="full" textAlign="left">
                        Proyectos de inversión
                    </Heading>
                    <Box>
                        <HStack spacing="20px">
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton as={Button} w="194px">
                                            <Flex
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
                                        <MenuList w="194px">
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

                            <Box>
                                <HStack spacing="4px" w="full">
                                    <Input h="40px" w="184px" placeholder="Buscar..." />
                                    <Button
                                        variant="solid"
                                        _focus={{ outline: 'none' }}
                                        aria-label="Buscar"
                                        textColor="white"
                                        py="10px"
                                        px="16px"
                                        w="106px"
                                    >
                                        <HStack w="full" spacing="10px">
                                            <Icon as={FaSearch} />
                                            <Text>Buscar</Text>
                                        </HStack>
                                    </Button>
                                </HStack>
                            </Box>
                        </HStack>
                    </Box>
                </Flex>

                <VStack mt="40px" align="start" spacing="36px">
                    <NavbarFilter />
                    {/* Validation of existing projects (temporary) */}
                    {gsg?.data.projects === [] ? (
                        <SimpleGrid w="full" columns={3} spacing="37px">
                            {gsg?.data.projects.map((project) => (
                                <ExplorerCard key={project.id} project={project} />
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text>No hay proyectos</Text>
                    )}
                </VStack>
            </Container>
        </>
    );
};

export default Explorer;
