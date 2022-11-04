// Dependencies
//@ts-nocheck
import {
    Button,
    Collapse,
    Container,
    Divider,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    SimpleGrid,
    Stack,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import ExplorerCard from 'components/explorer/explorerCard/explorerCard';
import CardSkeleton from 'components/explorer/explorerCard/explorerCard.skeleton';
import NotProject from 'components/explorer/statusProject/notProject';
import StatusProject from 'components/explorer/statusProject/status';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from 'layouts/main/navbar';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useGsg } from 'services/api/lib/gsg';
import { useGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { useOrganization } from 'services/api/lib/organization';
import { useQualityList } from 'services/api/lib/qualities';
import { useUser } from 'services/api/lib/user';
import { useFilterStore } from 'stores/filters';

const Explorer: NextPage = () => {
    // filter orderBy
    const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
    // data proyects
    const { data: gsg } = useGsg();
    const { data: orga } = useOrganization(true);
    const { data: user } = useUser();
    const { data: project } = useGsgProject(orga?.gsg_project_id);
    const { data: qualities } = useQualityList();
    const filters = useFilterStore((s) => s.filters);
    const setFilters = useFilterStore((s) => s.setFilters);

    const projectSort = gsg?.data?.projects[0].sort((a, b) =>
        orderBy === 'asc' ? (a.id < b.id ? -1 : 1) : a.id > b.id ? -1 : 1,
    );

    const projectFilter = projectSort
        ?.filter((p) => Object.values(p.qualities).find((p) => filters?.qualities?.includes(p?.name) ?? []))
        .filter((p) => p?.title?.toLowerCase().includes(filters?.search?.toLowerCase() ?? ''));

    const [isVisible, setIsVisible] = useState(true);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    useEffect(() => {
        if (user) {
            setIsVisible(true);
        }
    }, [user]);

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

                <AnimatePresence>
                    {isVisible && (
                        <Stack
                            as={motion.div}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.8 }}
                            spacing="40px"
                            justify="flex-start"
                            direction="column"
                            justifyContent="end"
                            w="full"
                        >
                            <Stack justify="flex-start" direction="column" justifyContent="end" w="full">
                                <VStack w="full" align="flex-start" spacing="10px">
                                    <Heading
                                        fontSize={{ base: '2xl', md: '4xl' }}
                                        lineHeight="130%"
                                        fontWeight="bold"
                                        w="full"
                                        textAlign="left"
                                        textTransform="uppercase"
                                    >
                                        Todos los proyectos de inversión
                                    </Heading>
                                    <Text>
                                        A continuación se visualizan todos los proyectos activos dentro de Match. Puedes
                                        filtrarlos según lo requieras.
                                    </Text>
                                </VStack>

                                <Stack
                                    spacing="13px"
                                    pt="20px"
                                    direction={{ base: 'column', md: 'row' }}
                                    alignItems={{ base: 'center', sm: 'flex-end' }}
                                    justifyContent="space-between"
                                    w="full"
                                >
                                    <HStack spacing="20px" justifyContent="flex-end" w={{ base: 'full', lg: '194px' }}>
                                        <Menu>
                                            {({ isOpen }) => (
                                                <>
                                                    <MenuButton
                                                        border="1px"
                                                        borderColor="gray.500"
                                                        h="40px"
                                                        w="full"
                                                        as={Button}
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
                                        direction={{ base: 'column', md: 'row' }}
                                        w={{ base: 'full', md: 'fit-content' }}
                                    >
                                        <Stack
                                            flexDirection="row"
                                            alignItems={{ base: 'center', sm: 'flex-end' }}
                                            justify={{ base: 'space-between', md: 'center' }}
                                            w="full"
                                        >
                                            <Input
                                                w={{ base: 'full', sm: 'full', md: '184px' }}
                                                variant="outline"
                                                borderColor="gray.400"
                                                placeholder="Buscar"
                                                mr="5px"
                                                textColor="white"
                                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                            />
                                        </Stack>
                                        <Button
                                            onClick={() => setIsOpenFilter(!isOpenFilter)}
                                            variant="solid"
                                            h="38px"
                                            background="gray.800"
                                            w="full"
                                            fontFamily="inter"
                                            fontSize="16px"
                                            fontWeight="normal"
                                            _hover={{ background: 'gray.700' }}
                                            _focus={{ background: 'gray.700' }}
                                            _selected={{ background: 'gray.700' }}
                                        >
                                            Filtro avanzados
                                        </Button>
                                    </Stack>
                                </Stack>

                                <Collapse in={isOpenFilter}>
                                    <Wrap mt="30px" direction="row" spacingX="50px" spacingY="15px" w="full">
                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: '350px' }}
                                                    h="40px"
                                                >
                                                    <Flex alignItems="center" justify="space-between" px="16px">
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Objetivos de desarrollo sostenible{' '}
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: 'full', md: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup
                                                        w="full"
                                                        title="Filtro"
                                                        type="checkbox"
                                                        defaultValue={filters?.qualities?.map((qt) => qt)}
                                                        onChange={(value: Array<string>) =>
                                                            setFilters({
                                                                qualities: value.length === 0 ? undefined : value,
                                                            })
                                                        }
                                                    >
                                                        {qualities?.qualities?.map((quality) => (
                                                            <MenuItemOption
                                                                w="full"
                                                                key={`${quality.id}-Filter`}
                                                                value={quality.icon.name.toString()}
                                                                _checked={{
                                                                    bgColor: 'gray.700',
                                                                }}
                                                                rounded="none"
                                                                fontWeight="medium"
                                                                icon={<></>}
                                                                iconSpacing={'unset'}
                                                            >
                                                                <Flex align="center" justify="flex-start" w="full">
                                                                    <Image
                                                                        rounded="full"
                                                                        Width={32}
                                                                        Height={32}
                                                                        mr={4}
                                                                        src={quality.icon.image}
                                                                        alt={quality.icon.name}
                                                                    />

                                                                    {quality.icon.name}
                                                                </Flex>
                                                            </MenuItemOption>
                                                        ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>

                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: '332px' }}
                                                    h="40px"
                                                >
                                                    <Flex px="16px" alignItems="center" justify="space-between">
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Certificación
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: 'full', md: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup
                                                        title="Filtro"
                                                        type="checkbox"
                                                        defaultValue={filters?.qualities?.map((qt) => qt)}
                                                        onChange={(value: Array<string>) =>
                                                            setFilters({
                                                                qualities: value.length === 0 ? undefined : value,
                                                            })
                                                        }
                                                    >
                                                        {qualities?.qualities?.map((quality) => (
                                                            <MenuItemOption
                                                                key={`${quality.id}-Filter`}
                                                                value={quality.icon.name.toString()}
                                                                _checked={{
                                                                    bgColor: 'gray.700',
                                                                }}
                                                                rounded="none"
                                                                fontWeight="medium"
                                                                icon={<></>}
                                                                iconSpacing={'unset'}
                                                            >
                                                                {quality.icon.name}
                                                            </MenuItemOption>
                                                        ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>

                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: '332px' }}
                                                    h="40px"
                                                >
                                                    <Flex px="16px" alignItems="center" justify="space-between">
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Etapa del proyecto
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: 'full', sm: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup
                                                        title="Filtro"
                                                        type="checkbox"
                                                        defaultValue={filters?.qualities?.map((qt) => qt)}
                                                        onChange={(value: Array<string>) =>
                                                            setFilters({
                                                                qualities: value.length === 0 ? undefined : value,
                                                            })
                                                        }
                                                    >
                                                        {qualities?.qualities?.map((quality) => (
                                                            <MenuItemOption
                                                                key={`${quality.id}-Filter`}
                                                                value={quality.icon.name.toString()}
                                                                _checked={{
                                                                    bgColor: 'gray.700',
                                                                }}
                                                                rounded="none"
                                                                fontWeight="medium"
                                                                icon={<></>}
                                                                iconSpacing={'unset'}
                                                            >
                                                                {quality.icon.name}
                                                            </MenuItemOption>
                                                        ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>

                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: '332px' }}
                                                    h="40px"
                                                >
                                                    <Flex px="16px" alignItems="center" justify="space-between">
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Etapa de levantamiento
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: 'full', md: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup
                                                        title="Filtro"
                                                        type="checkbox"
                                                        defaultValue={filters?.qualities?.map((qt) => qt)}
                                                        onChange={(value: Array<string>) =>
                                                            setFilters({
                                                                qualities: value.length === 0 ? undefined : value,
                                                            })
                                                        }
                                                    >
                                                        {qualities?.qualities?.map((quality) => (
                                                            <MenuItemOption
                                                                key={`${quality.id}-Filter`}
                                                                value={quality.icon.name.toString()}
                                                                _checked={{
                                                                    bgColor: 'gray.700',
                                                                }}
                                                                rounded="none"
                                                                fontWeight="medium"
                                                                icon={<></>}
                                                                iconSpacing={'unset'}
                                                            >
                                                                {quality.icon.name}
                                                            </MenuItemOption>
                                                        ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>

                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: '332px' }}
                                                    h="40px"
                                                >
                                                    <Flex px="16px" alignItems="center" justify="space-between">
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Rentabilidad esperada
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: 'full', md: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup
                                                        title="Filtro"
                                                        type="checkbox"
                                                        defaultValue={filters?.qualities?.map((qt) => qt)}
                                                        onChange={(value: Array<string>) =>
                                                            setFilters({
                                                                qualities: value.length === 0 ? undefined : value,
                                                            })
                                                        }
                                                    >
                                                        {qualities?.qualities?.map((quality) => (
                                                            <MenuItemOption
                                                                key={`${quality.id}-Filter`}
                                                                value={quality.icon.name.toString()}
                                                                _checked={{
                                                                    bgColor: 'gray.700',
                                                                }}
                                                                rounded="none"
                                                                fontWeight="medium"
                                                                icon={<></>}
                                                                iconSpacing={'unset'}
                                                            >
                                                                {quality.icon.name}
                                                            </MenuItemOption>
                                                        ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>

                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: '332px' }}
                                                    h="40px"
                                                >
                                                    <Flex px="16px" alignItems="center" justify="space-between">
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Monto de aporte
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: 'full', md: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup
                                                        title="Filtro"
                                                        type="checkbox"
                                                        defaultValue={filters?.qualities?.map((qt) => qt)}
                                                        onChange={(value: Array<string>) =>
                                                            setFilters({
                                                                qualities: value.length === 0 ? undefined : value,
                                                            })
                                                        }
                                                    >
                                                        {qualities?.qualities?.map((quality) => (
                                                            <MenuItemOption
                                                                key={`${quality.id}-Filter`}
                                                                value={quality.icon.name.toString()}
                                                                _checked={{
                                                                    bgColor: 'gray.700',
                                                                }}
                                                                rounded="none"
                                                                fontWeight="medium"
                                                                icon={<></>}
                                                                iconSpacing={'unset'}
                                                            >
                                                                {quality.icon.name}
                                                            </MenuItemOption>
                                                        ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>

                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: '332px' }}
                                                    h="40px"
                                                >
                                                    <Flex px="16px" alignItems="center" justify="space-between">
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Plazos de inversión
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: 'full', md: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup
                                                        title="Filtro"
                                                        type="checkbox"
                                                        defaultValue={filters?.qualities?.map((qt) => qt)}
                                                        onChange={(value: Array<string>) =>
                                                            setFilters({
                                                                qualities: value.length === 0 ? undefined : value,
                                                            })
                                                        }
                                                    >
                                                        {qualities?.qualities?.map((quality) => (
                                                            <MenuItemOption
                                                                key={`${quality.id}-Filter`}
                                                                value={quality.icon.name.toString()}
                                                                _checked={{
                                                                    bgColor: 'gray.700',
                                                                }}
                                                                rounded="none"
                                                                fontWeight="medium"
                                                                icon={<></>}
                                                                iconSpacing={'unset'}
                                                            >
                                                                {quality.icon.name}
                                                            </MenuItemOption>
                                                        ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>

                                        <Divider pt="30px" />

                                        <Stack direction="row" w="full" justify="space-between">
                                            <HStack align="start">
                                                <Text
                                                    color="gray.50"
                                                    fontFamily="inter"
                                                    fontWeight="medium"
                                                    fontSize="16px"
                                                >
                                                    Filtrado por
                                                </Text>
                                                <Wrap spacingX="10px">
                                                    {filters?.qualities?.map((qualitie) => (
                                                        <WrapItem background="gray.700" rounded="6px" px="8px" py="6px">
                                                            <Text fontSize="13px" fontFamily="inter">
                                                                {qualitie}
                                                            </Text>
                                                        </WrapItem>
                                                    ))}
                                                </Wrap>
                                            </HStack>
                                            <Text color="gray.50" fontFamily="inter" fontSize="14px">
                                                Limpiar filtros
                                            </Text>
                                        </Stack>
                                    </Wrap>
                                </Collapse>
                            </Stack>

                            <VStack mt={{ base: '20px', md: '40px' }} align="start" spacing="36px">
                                {gsg ? (
                                    <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing="37px">
                                        {projectFilter?.length !== 0 ? (
                                            projectFilter?.map((project) => (
                                                <ExplorerCard key={project.id} project={project} />
                                            ))
                                        ) : (
                                            <Text fontSize="lg" fontWeight="medium">
                                                No se encontraron proyectos
                                            </Text>
                                        )}
                                    </SimpleGrid>
                                ) : (
                                    <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing="37px">
                                        {[0, 2, 3, 4, 5, 6].map((item, index) => (
                                            <CardSkeleton key={index} />
                                        ))}
                                    </SimpleGrid>
                                )}
                            </VStack>
                        </Stack>
                    )}
                </AnimatePresence>
            </Container>
        </>
    );
};

export default Explorer;
