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
    useDisclosure,
    Img,
} from '@chakra-ui/react';
import ExplorerCard from 'components/explorer/explorerCard/explorerCard';
import CardSkeleton from 'components/explorer/explorerCard/explorerCard.skeleton';
import NotProject from 'components/explorer/statusProject/notProject';
import StatusProject from 'components/explorer/statusProject/status';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from 'layouts/main/navbar';
import { GetServerSideProps, GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useGsg } from 'services/api/lib/gsg';
import { gsgAllFetcher, useGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { useOrganization } from 'services/api/lib/organization';
import { useQualityList } from 'services/api/lib/qualities';
import { userFetcher, useUser } from 'services/api/lib/user';
import { useFilterStore } from 'stores/filters';
import { CgClose } from 'react-icons/cg';
import { MdClose, MdFilterList } from 'react-icons/md';
import ThirdParties from 'components/projectDetail/formatText/thirdParties';
import Stage from 'components/projectDetail/formatText/stage';
import StageCapital from 'components/projectDetail/formatText/stageCapital';
import Sector from 'components/projectDetail/formatText/sector';
import Rentability from 'components/projectDetail/formatText/rentability';
import FinanceGoal from 'components/projectDetail/formatText/financeGoal';
import Time from 'components/projectDetail/formatText/time';
import FilterExperienceModal from 'components/experience/filterExperienceModal';
import Router, { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BsCheck } from 'react-icons/bs';
import cookies from 'cookie';
import { useInterest } from 'services/api/lib/interest';
import ChangePhoneModal from 'components/explorer/changePhoneModal';
import { isValidPhoneNumber } from 'libphonenumber-js';

const Explorer: NextPage = ({ user: initialData }) => {
    // filter orderBy
    const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
    const [isVisible, setIsVisible] = useState(true);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [getPorjects, setGetProjets] = useState([]);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { isOpen: isOpenExperience, onOpen: openExperience, onClose: closeExperience } = useDisclosure();
    const { isOpen: isOpenPhone, onOpen: openPhone, onClose: closePhone } = useDisclosure();

    const router = useRouter();

    // data proyects
    const { data: gsg } = useGsg();
    const { data: orga } = useOrganization(true);
    const { data: userResponse } = useUser(undefined, { revalidateOnFocus: true, initialData: initialData });
    const { data: project } = useGsgProject(orga?.gsg_project_id);
    const { data: qualities } = useQualityList();
    const { data: getInterest } = useInterest();

    console.log(getInterest);

    const filters = useFilterStore((s) => s.filters);
    const setFilters = useFilterStore((s) => s.setFilters);

    const filtersResult = useCallback(() => {
        const projectSort = gsg?.data?.projects?.flat()?.sort((a, b) => {
            if (orderBy === 'desc') {
                //@ts-ignore
                return new Date(b.last_status_updated) - new Date(a.last_status_updated);
            } else {
                //@ts-ignore
                return new Date(a.last_status_updated) - new Date(b.last_status_updated);
            }
        });

        const projectFilter = projectSort
            ?.filter((p) =>
                Object.values(p?.qualities ?? { qualities: {} }).some(
                    (q) => filters?.qualities?.includes(q.name) ?? [],
                ),
            )
            ?.filter((p) => filters?.certification?.includes(p?.third_parties) ?? [])
            ?.filter((p) => filters?.projectStage?.includes(p?.stage) ?? [])
            ?.filter(
                (p) =>
                    (filters?.surveyStage?.includes(p?.capital_stage) || filters?.surveyStage?.includes(p?.debt)) ?? [],
            )
            ?.filter((p) => filters?.expectedReturn?.includes(p?.expected_rentability) ?? [])
            ?.filter((p) => filters?.contributionAmount?.includes(p?.finance_goal) ?? [])
            ?.filter((p) => filters?.investmentTerms?.includes(p?.time_lapse) ?? [])
            ?.filter((p) => p?.title?.toLowerCase().includes(filters?.search?.toLowerCase() ?? ''));

        return projectFilter;
    }, [filters, orderBy, gsg]);

    const optionsCertification = [
        { value: 'certified-b', label: 'Certificación empresa B' },
        { value: 'prize-org', label: 'Premio o reconocimiento de empresa u organización' },
        { value: 'incubators', label: 'Participación en Incubadoras o Aceleradoras' },
        { value: 'corfo', label: 'Adjudicación fondo CORFO u otro fondo público' },
    ];

    const optionsProjectStage = [
        { value: 'development', label: 'Producto o servicio en desarrollo' },
        { value: 'mvp', label: 'Producto o servicio en prototipo en pilotaje' },
        { value: 'ready_to_launch', label: 'Producto o servicio listo para lanzar al mercado' },
        { value: 'already_launched', label: 'Producto o servicio ya en el mercado' },
    ];

    const optionsSurveyStage = [
        { value: 'pre-seed', label: 'Pre-seed' },
        { value: 'seed', label: 'Seed' },
        { value: 'series-a', label: 'Serie A' },
        { value: 'series-b', label: 'Serie B' },
        { value: 'series-c', label: 'Serie C' },
        { value: 'series-d', label: 'Serie D' },
        { value: 'senior-debt', label: 'Deuda senior' },
        { value: 'mezzanine-debt', label: 'Deuda mezzanine' },
    ];

    const optionsExpectedReturn = [
        { value: '1-5', label: 'Entre 1 y 5%' },
        { value: '6-10', label: 'Entre 6 y 10%' },
        { value: '11-20', label: 'Entre 11 y 20%' },
        { value: 'more-than-21', label: 'Más de 21%' },
    ];

    const optionContributionAmount = [
        { value: 'less-than-20', label: 'Menos de 20 millones' },
        { value: '20-49', label: '20 millones y hasta 49 millones' },
        { value: '50-99', label: '50 millones y hasta 99 millones' },
        { value: '100-249', label: '100 millones y hasta 249 millones' },
        { value: '250', label: '250 millones' },
        { value: 'more-than-250', label: 'Sobre 250 millones' },
        { value: 'more-than-1000', label: 'Sobre 1000 millones' },
    ];

    const optionsInvestmentTerms = [
        { value: 'unti-a-year', label: 'Hasta 12 meses' },
        { value: 'until-2-years', label: 'Hasta 24 meses' },
        { value: 'until-3-years', label: 'Hasta 36 meses' },
        { value: 'until-4-years', label: 'Hasta 48 meses' },
        { value: 'more-than-4-years', label: 'Más de 48 meses' },
    ];

    useEffect(() => {
        if (userResponse?.user) {
            setIsVisible(true);
        }
    }, [userResponse?.user]);

    useEffect(() => {
        const { onboarding } = Router.query;

        if (onboarding && onboarding === 'filter-experience') {
            openExperience(true);
        }
    }, [isOpenExperience, router.query, openExperience]);

    useEffect(() => {
        if (filters?.qualities?.length === 0) {
            setFilters({ ...filters, qualities: undefined });
        }

        if (filters?.certification?.length === 0) {
            setFilters({ ...filters, certification: undefined });
        }

        if (filters?.projectStage?.length === 0) {
            setFilters({ ...filters, projectStage: undefined });
        }

        if (filters?.surveyStage?.length === 0) {
            setFilters({ ...filters, surveyStage: undefined });
        }

        if (filters?.expectedReturn?.length === 0) {
            setFilters({ ...filters, expectedReturn: undefined });
        }

        if (filters?.contributionAmount?.length === 0) {
            setFilters({ ...filters, contributionAmount: undefined });
        }

        if (filters?.investmentTerms?.length === 0) {
            setFilters({ ...filters, investmentTerms: undefined });
        }
    }, [
        filters?.qualities,
        filters?.certification,
        filters?.projectStage,
        filters?.surveyStage,
        filters?.expectedReturn,
        filters?.contributionAmount,
        filters?.investmentTerms,
        setFilters,
        filters,
    ]);

    return (
        <>
            <NextSeo title={'Explorador - MATCH'} />
            <Navbar />

            <Container maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }} mb="124px" mt="120px">
                {orga !== undefined &&
                    (orga?.gsg_project_id ? <StatusProject project={project?.data?.gsg_project} /> : <NotProject />)}

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

                {userResponse?.user && (
                    <Button
                        onClick={() =>
                            router.push({
                                pathname: '/explorer',
                                query: { onboarding: 'filter-experience' },
                            })
                        }
                        position="fixed"
                        right={{ base: '20px', md: '60px' }}
                        bottom={{ base: '20px', md: '50px' }}
                        background={{ base: 'gray.700', xl: 'gray.800' }}
                        w="50px"
                        h="50px"
                        p="10px"
                        rounded="8px"
                        _hover={{ background: 'gray.700' }}
                        zIndex={30}
                    >
                        <Img src="/images/icons/question.svg" />
                    </Button>
                )}

                {userResponse?.user &&
                    (isValidPhoneNumber(userResponse?.user?.organization?.legal_representative_phone ?? '') ? null : (
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            align="center"
                            justify="space-between"
                            mb="32px"
                            bg="gray.800"
                            p="20px"
                            rounded="8px"
                        >
                            <VStack align="start">
                                <Text fontSize="24px" fontWeight="medium" fontFamily="inter">
                                    Ayúdanos a completar tu perfil
                                </Text>
                                <Stack
                                    direction={{ base: 'column', md: 'row' }}
                                    align={{ base: 'start', md: 'center' }}
                                    bg="gray.800"
                                    py="10px"
                                    rounded="8px"
                                    spacing={{ base: '16px', md: '24px' }}
                                >
                                    <HStack spacing="3px">
                                        <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                                        <Text>Contraseña</Text>
                                    </HStack>

                                    <HStack spacing="3px">
                                        <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                                        <Text>Nombre</Text>
                                    </HStack>

                                    <HStack spacing="3px">
                                        {userResponse?.user?.organization?.image ? (
                                            <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                                        ) : (
                                            <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                                        )}
                                        <Text>Imagen de perfil</Text>
                                    </HStack>

                                    <HStack spacing="3px">
                                        {userResponse?.user?.organization?.legal_representative_phone &&
                                        isValidPhoneNumber(
                                            userResponse?.user?.organization?.legal_representative_phone,
                                        ) ? (
                                            <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                                        ) : (
                                            <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                                        )}
                                        <Text>Contacto</Text>
                                    </HStack>

                                    <HStack spacing="3px">
                                        {!(
                                            getInterest?.data?.interests.capital_stage == null &&
                                            getInterest?.data?.interests.expected_rentability == null &&
                                            getInterest?.data?.interests.finance_goal == null &&
                                            getInterest?.data?.interests.stage == null &&
                                            getInterest?.data?.interests.time_lapse == null &&
                                            getInterest?.data?.interests.third_party == null &&
                                            getInterest?.data?.interests.qualities == null
                                        ) ? (
                                            <Icon as={BsCheck} color="teal.500" w="24px" h="24px" />
                                        ) : (
                                            <Icon as={MdClose} color="red.500" w="24px" h="24px" />
                                        )}
                                        <Text>Intereses</Text>
                                    </HStack>
                                </Stack>
                            </VStack>

                            <Button
                                onClick={() => {
                                    if (
                                        userResponse?.user?.organization?.legal_representative_phone &&
                                        isValidPhoneNumber(userResponse?.user?.organization?.legal_representative_phone)
                                    ) {
                                        router.push({
                                            pathname: '/profile',
                                            query: 'tab=1',
                                        });
                                    } else {
                                        openPhone();
                                    }
                                }}
                                variant="solid"
                                h="40px"
                                w={{ base: 'full', md: 'fit-content' }}
                            >
                                Actualizar contacto
                            </Button>
                        </Stack>
                    ))}

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
                                        fontSize={{ base: '36px', md: '4xl' }}
                                        lineHeight="130%"
                                        fontWeight="bold"
                                        w="full"
                                        textAlign="left"
                                        textTransform="uppercase"
                                    >
                                        Todos los proyectos de inversión
                                    </Heading>
                                    {userResponse?.user ? (
                                        <Text>
                                            A continuación se visualizan todos los proyectos activos dentro de Match.
                                            Puedes filtrarlos según lo requieras.
                                        </Text>
                                    ) : (
                                        <Text>
                                            A continuación se visualizan todos los proyectos activos dentro de Match.
                                        </Text>
                                    )}
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
                                            mb="5px"
                                        >
                                            <Input
                                                w={{ base: 'full', sm: 'full', md: '184px' }}
                                                variant="outline"
                                                borderColor="gray.400"
                                                placeholder="Buscar"
                                                textColor="white"
                                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                            />
                                        </Stack>
                                        {userResponse?.user && (
                                            <Button
                                                leftIcon={<Icon as={MdFilterList} w="20px" h="20px" />}
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
                                                Filtros avanzados
                                            </Button>
                                        )}
                                    </Stack>
                                </Stack>

                                <Collapse in={isOpenFilter}>
                                    <Stack
                                        display={{ base: 'flex', md: 'none' }}
                                        direction="column"
                                        w="full"
                                        justify="space-between"
                                        pt="30px"
                                    >
                                        <HStack w="full" justify="space-between">
                                            <Text
                                                color="gray.50"
                                                fontFamily="inter"
                                                fontWeight="medium"
                                                fontSize="20px"
                                            >
                                                Filtrado por
                                            </Text>

                                            <Icon
                                                onClick={() => setFilters({})}
                                                cursor="pointer"
                                                as={CgClose}
                                                color="red.500"
                                                w="25px"
                                                h="25px"
                                            />
                                        </HStack>

                                        <Wrap spacingX="10px" pt="10px">
                                            {filters?.qualities?.map((qualitie) => (
                                                <WrapItem
                                                    key={`${qualitie}-key`}
                                                    background="gray.700"
                                                    rounded="6px"
                                                    px="8px"
                                                    py="6px"
                                                    alignItems="center"
                                                >
                                                    <Text fontSize="13px" fontFamily="inter">
                                                        {qualitie}
                                                    </Text>
                                                    <Icon
                                                        cursor="pointer"
                                                        as={CgClose}
                                                        color="gray.600"
                                                        w="20px"
                                                        h="20px"
                                                        marginLeft="5px"
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                qualities: filters.qualities?.filter(
                                                                    (q) => q !== qualitie,
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </WrapItem>
                                            ))}

                                            {filters?.certification?.map((c) => (
                                                <WrapItem
                                                    key={`${c}-key`}
                                                    background="gray.700"
                                                    rounded="6px"
                                                    px="8px"
                                                    py="6px"
                                                >
                                                    <Text fontSize="13px" fontFamily="inter">
                                                        {ThirdParties(c)}
                                                    </Text>
                                                    <Icon
                                                        cursor="pointer"
                                                        as={CgClose}
                                                        color="gray.600"
                                                        w="20px"
                                                        h="20px"
                                                        marginLeft="5px"
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                certification: filters.certification?.filter(
                                                                    (cer) => cer !== c,
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </WrapItem>
                                            ))}

                                            {filters?.projectStage?.map((p) => (
                                                <WrapItem
                                                    key={`${p}-key`}
                                                    background="gray.700"
                                                    rounded="6px"
                                                    px="8px"
                                                    py="6px"
                                                >
                                                    <Text fontSize="13px" fontFamily="inter">
                                                        {StageCapital(p)}
                                                    </Text>
                                                    <Icon
                                                        cursor="pointer"
                                                        as={CgClose}
                                                        color="gray.600"
                                                        w="20px"
                                                        h="20px"
                                                        marginLeft="5px"
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                projectStage: filters.projectStage?.filter(
                                                                    (ps) => ps !== p,
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </WrapItem>
                                            ))}

                                            {filters?.surveyStage?.map((ss) => (
                                                <WrapItem
                                                    key={`${ss}-key`}
                                                    background="gray.700"
                                                    rounded="6px"
                                                    px="8px"
                                                    py="6px"
                                                >
                                                    <Text fontSize="13px" fontFamily="inter">
                                                        {Stage(ss)}
                                                    </Text>
                                                    <Icon
                                                        cursor="pointer"
                                                        as={CgClose}
                                                        color="gray.600"
                                                        w="20px"
                                                        h="20px"
                                                        marginLeft="5px"
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                surveyStage: filters.surveyStage?.filter(
                                                                    (sstag) => sstag !== ss,
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </WrapItem>
                                            ))}

                                            {filters?.expectedReturn?.map((er) => (
                                                <WrapItem
                                                    key={`${er}-key`}
                                                    background="gray.700"
                                                    rounded="6px"
                                                    px="8px"
                                                    py="6px"
                                                >
                                                    <Text fontSize="13px" fontFamily="inter">
                                                        {Rentability(er)}
                                                    </Text>
                                                    <Icon
                                                        cursor="pointer"
                                                        as={CgClose}
                                                        color="gray.600"
                                                        w="20px"
                                                        h="20px"
                                                        marginLeft="5px"
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                expectedReturn: filters.expectedReturn?.filter(
                                                                    (exr) => exr !== er,
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </WrapItem>
                                            ))}

                                            {filters?.contributionAmount?.map((ca) => (
                                                <WrapItem
                                                    key={`${ca}-key`}
                                                    background="gray.700"
                                                    rounded="6px"
                                                    px="8px"
                                                    py="6px"
                                                >
                                                    <Text fontSize="13px" fontFamily="inter">
                                                        {FinanceGoal(ca)}
                                                    </Text>
                                                    <Icon
                                                        cursor="pointer"
                                                        as={CgClose}
                                                        color="gray.600"
                                                        w="20px"
                                                        h="20px"
                                                        marginLeft="5px"
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                contributionAmount: filters.contributionAmount?.filter(
                                                                    (cta) => cta !== ca,
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </WrapItem>
                                            ))}

                                            {filters?.investmentTerms?.map((it) => (
                                                <WrapItem
                                                    key={`${it}-key`}
                                                    background="gray.700"
                                                    rounded="6px"
                                                    px="8px"
                                                    py="6px"
                                                >
                                                    <Text fontSize="13px" fontFamily="inter">
                                                        {Time(it)}
                                                    </Text>
                                                    <Icon
                                                        cursor="pointer"
                                                        as={CgClose}
                                                        color="gray.600"
                                                        w="20px"
                                                        h="20px"
                                                        marginLeft="5px"
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                investmentTerms: filters.investmentTerms?.filter(
                                                                    (int) => int !== it,
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </WrapItem>
                                            ))}
                                        </Wrap>
                                    </Stack>

                                    <Wrap mt="30px" direction="row" spacingX="50px" spacingY="15px" w="full">
                                        <WrapItem w={{ base: 'full', md: 'fit-content' }}>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton
                                                    as={Button}
                                                    border="1px"
                                                    borderColor="gray.500"
                                                    whiteSpace="break-spaces"
                                                    textAlign="left"
                                                    w={{ base: 'full', sm: 'fit-content' }}
                                                    h="fit-content"
                                                >
                                                    <Flex
                                                        alignItems="center"
                                                        justify="space-between"
                                                        px="20px"
                                                        py="8px"
                                                    >
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Objetivos de desarrollo sostenible{' '}
                                                            {filters?.qualities && `(${filters?.qualities?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: '290px', sm: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup title="Filtro">
                                                        {qualities?.qualities
                                                            ?.filter(
                                                                (qualitie) =>
                                                                    !filters?.qualities?.includes(qualitie.icon.name),
                                                            )
                                                            .map((quality) => (
                                                                <MenuItemOption
                                                                    w="full"
                                                                    key={`${quality.id}-Filter`}
                                                                    value={quality.icon.name}
                                                                    onClick={(e) => {
                                                                        setFilters({
                                                                            ...filters,
                                                                            qualities: [
                                                                                ...(filters?.qualities ?? []),
                                                                                quality.icon.name,
                                                                            ],
                                                                        });
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
                                                    <Flex
                                                        w="full"
                                                        px="16px"
                                                        alignItems="center"
                                                        justify="space-between"
                                                    >
                                                        <Text as="p" fontFamily="inter" fontSize="16px">
                                                            Certificación
                                                            {filters?.certification &&
                                                                `(${filters?.certification?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: '290px', sm: '332px' }}
                                                    overflowY="auto"
                                                    className="custom-scroll"
                                                    maxHeight="55vh"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup title="Filtro">
                                                        {optionsCertification
                                                            ?.filter((c) => !filters?.certification?.includes(c.value))
                                                            .map((c, index) => (
                                                                <MenuItemOption
                                                                    key={`${index}-Filter`}
                                                                    value={c.value}
                                                                    onClick={() =>
                                                                        setFilters({
                                                                            ...filters,
                                                                            certification: [
                                                                                ...(filters?.certification ?? []),
                                                                                c.value,
                                                                            ],
                                                                        })
                                                                    }
                                                                    rounded="none"
                                                                    fontWeight="medium"
                                                                    icon={<></>}
                                                                    iconSpacing={'unset'}
                                                                >
                                                                    {c.label}
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
                                                            {filters?.projectStage &&
                                                                `(${filters?.projectStage?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: '290px', sm: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup title="Filtro">
                                                        {optionsProjectStage
                                                            ?.filter((ps) => !filters?.projectStage?.includes(ps.value))
                                                            .map((ps, index) => (
                                                                <MenuItemOption
                                                                    w="full"
                                                                    key={`${index}-Filter`}
                                                                    value={ps.value}
                                                                    onClick={() =>
                                                                        setFilters({
                                                                            ...filters,
                                                                            projectStage: [
                                                                                ...(filters?.projectStage ?? []),
                                                                                ps.value,
                                                                            ],
                                                                        })
                                                                    }
                                                                    rounded="none"
                                                                    fontWeight="medium"
                                                                    icon={<></>}
                                                                    iconSpacing={'unset'}
                                                                >
                                                                    {ps.label}
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
                                                            {filters?.surveyStage &&
                                                                `(${filters?.surveyStage?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: '290px', sm: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup title="Filtro">
                                                        {optionsSurveyStage
                                                            ?.filter((ss) => !filters?.surveyStage?.includes(ss.value))
                                                            ?.map((ss, index) => (
                                                                <MenuItemOption
                                                                    key={`${index}-Filter`}
                                                                    value={ss.value}
                                                                    onClick={() =>
                                                                        setFilters({
                                                                            ...filters,
                                                                            surveyStage: [
                                                                                ...(filters?.surveyStage ?? []),
                                                                                ss.value,
                                                                            ],
                                                                        })
                                                                    }
                                                                    rounded="none"
                                                                    fontWeight="medium"
                                                                    icon={<></>}
                                                                    iconSpacing={'unset'}
                                                                >
                                                                    {ss.label}
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
                                                            {filters?.expectedReturn &&
                                                                `(${filters?.expectedReturn?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: '290px', sm: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup title="Filtro">
                                                        {optionsExpectedReturn
                                                            ?.filter(
                                                                (er) => !filters?.expectedReturn?.includes(er.value),
                                                            )
                                                            .map((er, index) => (
                                                                <MenuItemOption
                                                                    key={`${index}-Filter`}
                                                                    value={er.value}
                                                                    onClick={() =>
                                                                        setFilters({
                                                                            ...filters,
                                                                            expectedReturn: [
                                                                                ...(filters?.expectedReturn ?? []),
                                                                                er.value,
                                                                            ],
                                                                        })
                                                                    }
                                                                    rounded="none"
                                                                    fontWeight="medium"
                                                                    icon={<></>}
                                                                    iconSpacing={'unset'}
                                                                >
                                                                    {er.label}
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
                                                            {filters?.contributionAmount &&
                                                                `(${filters?.contributionAmount?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: '290px', sm: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup title="Filtro">
                                                        {optionContributionAmount
                                                            ?.filter(
                                                                (ca) =>
                                                                    !filters?.contributionAmount?.includes(ca.value),
                                                            )
                                                            ?.map((ca, index) => (
                                                                <MenuItemOption
                                                                    key={`${index}-Filter`}
                                                                    value={ca.value}
                                                                    onClick={() =>
                                                                        setFilters({
                                                                            ...filters,
                                                                            contributionAmount: [
                                                                                ...(filters?.contributionAmount ?? []),
                                                                                ca.value,
                                                                            ],
                                                                        })
                                                                    }
                                                                    rounded="none"
                                                                    fontWeight="medium"
                                                                    icon={<></>}
                                                                    iconSpacing={'unset'}
                                                                >
                                                                    {ca.label}
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
                                                            {filters?.investmentTerms &&
                                                                `(${filters?.investmentTerms?.length})`}
                                                        </Text>

                                                        <Icon ml={2} as={FaChevronDown} />
                                                    </Flex>
                                                </MenuButton>

                                                <MenuList
                                                    w={{ base: '290px', sm: '332px' }}
                                                    overflowY="auto"
                                                    maxHeight="55vh"
                                                    className="custom-scroll"
                                                    bg="gray.800"
                                                >
                                                    <MenuOptionGroup title="Filtro">
                                                        {optionsInvestmentTerms
                                                            ?.filter(
                                                                (i) => !filters?.investmentTerms?.includes(i.value),
                                                            )
                                                            .map((i, index) => (
                                                                <MenuItemOption
                                                                    key={`${index}-Filter`}
                                                                    value={i.value}
                                                                    onClick={() =>
                                                                        setFilters({
                                                                            ...filters,
                                                                            investmentTerms: [
                                                                                ...(filters?.investmentTerms ?? []),
                                                                                i.value,
                                                                            ],
                                                                        })
                                                                    }
                                                                    rounded="none"
                                                                    fontWeight="medium"
                                                                    icon={<></>}
                                                                    iconSpacing={'unset'}
                                                                >
                                                                    {i.label}
                                                                </MenuItemOption>
                                                            ))}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </WrapItem>
                                    </Wrap>

                                    <Divider pt="30px" />

                                    <Stack
                                        display={{ base: 'none', md: 'flex' }}
                                        direction="row"
                                        w="full"
                                        justify="space-between"
                                        pt="30px"
                                    >
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
                                                    <WrapItem
                                                        key={`${qualitie}-key`}
                                                        background="gray.700"
                                                        rounded="6px"
                                                        px="8px"
                                                        py="6px"
                                                        alignItems="center"
                                                    >
                                                        <Text fontSize="13px" fontFamily="inter">
                                                            {qualitie}
                                                        </Text>
                                                        <Icon
                                                            cursor="pointer"
                                                            as={CgClose}
                                                            color="gray.600"
                                                            w="20px"
                                                            h="20px"
                                                            marginLeft="5px"
                                                            onClick={() =>
                                                                setFilters({
                                                                    ...filters,
                                                                    qualities: filters?.qualities?.filter(
                                                                        (q) => q !== qualitie,
                                                                    ),
                                                                })
                                                            }
                                                        />
                                                    </WrapItem>
                                                ))}

                                                {filters?.certification?.map((c) => (
                                                    <WrapItem
                                                        key={`${c}-key`}
                                                        background="gray.700"
                                                        rounded="6px"
                                                        px="8px"
                                                        py="6px"
                                                    >
                                                        <Text fontSize="13px" fontFamily="inter">
                                                            {ThirdParties(c)}
                                                        </Text>
                                                        <Icon
                                                            cursor="pointer"
                                                            as={CgClose}
                                                            color="gray.600"
                                                            w="20px"
                                                            h="20px"
                                                            marginLeft="5px"
                                                            onClick={() =>
                                                                setFilters({
                                                                    ...filters,
                                                                    certification: filters.certification?.filter(
                                                                        (cer) => cer !== c,
                                                                    ),
                                                                })
                                                            }
                                                        />
                                                    </WrapItem>
                                                ))}

                                                {filters?.projectStage?.map((p) => (
                                                    <WrapItem
                                                        key={`${p}-key`}
                                                        background="gray.700"
                                                        rounded="6px"
                                                        px="8px"
                                                        py="6px"
                                                    >
                                                        <Text fontSize="13px" fontFamily="inter">
                                                            {StageCapital(p)}
                                                        </Text>
                                                        <Icon
                                                            cursor="pointer"
                                                            as={CgClose}
                                                            color="gray.600"
                                                            w="20px"
                                                            h="20px"
                                                            marginLeft="5px"
                                                            onClick={() =>
                                                                setFilters({
                                                                    ...filters,
                                                                    projectStage: filters.projectStage?.filter(
                                                                        (ps) => ps !== p,
                                                                    ),
                                                                })
                                                            }
                                                        />
                                                    </WrapItem>
                                                ))}

                                                {filters?.surveyStage?.map((ss) => (
                                                    <WrapItem
                                                        key={`${ss}-key`}
                                                        background="gray.700"
                                                        rounded="6px"
                                                        px="8px"
                                                        py="6px"
                                                    >
                                                        <Text fontSize="13px" fontFamily="inter">
                                                            {Stage(ss)}
                                                        </Text>
                                                        <Icon
                                                            cursor="pointer"
                                                            as={CgClose}
                                                            color="gray.600"
                                                            w="20px"
                                                            h="20px"
                                                            marginLeft="5px"
                                                            onClick={() =>
                                                                setFilters({
                                                                    ...filters,
                                                                    surveyStage: filters.surveyStage?.filter(
                                                                        (sstag) => sstag !== ss,
                                                                    ),
                                                                })
                                                            }
                                                        />
                                                    </WrapItem>
                                                ))}

                                                {filters?.expectedReturn?.map((er) => (
                                                    <WrapItem
                                                        key={`${er}-key`}
                                                        background="gray.700"
                                                        rounded="6px"
                                                        px="8px"
                                                        py="6px"
                                                    >
                                                        <Text fontSize="13px" fontFamily="inter">
                                                            {Rentability(er)}
                                                        </Text>
                                                        <Icon
                                                            cursor="pointer"
                                                            as={CgClose}
                                                            color="gray.600"
                                                            w="20px"
                                                            h="20px"
                                                            marginLeft="5px"
                                                            onClick={() =>
                                                                setFilters({
                                                                    ...filters,
                                                                    expectedReturn: filters.expectedReturn?.filter(
                                                                        (exr) => exr !== er,
                                                                    ),
                                                                })
                                                            }
                                                        />
                                                    </WrapItem>
                                                ))}

                                                {filters?.contributionAmount?.map((ca) => (
                                                    <WrapItem
                                                        key={`${ca}-key`}
                                                        background="gray.700"
                                                        rounded="6px"
                                                        px="8px"
                                                        py="6px"
                                                    >
                                                        <Text fontSize="13px" fontFamily="inter">
                                                            {FinanceGoal(ca)}
                                                        </Text>
                                                        <Icon
                                                            cursor="pointer"
                                                            as={CgClose}
                                                            color="gray.600"
                                                            w="20px"
                                                            h="20px"
                                                            marginLeft="5px"
                                                            onClick={() =>
                                                                setFilters({
                                                                    ...filters,
                                                                    contributionAmount:
                                                                        filters.contributionAmount?.filter(
                                                                            (cta) => cta !== ca,
                                                                        ),
                                                                })
                                                            }
                                                        />
                                                    </WrapItem>
                                                ))}

                                                {filters?.investmentTerms?.map((it) => (
                                                    <WrapItem
                                                        key={`${it}-key`}
                                                        background="gray.700"
                                                        rounded="6px"
                                                        px="8px"
                                                        py="6px"
                                                    >
                                                        <Text fontSize="13px" fontFamily="inter">
                                                            {Time(it)}
                                                        </Text>
                                                        <Icon
                                                            cursor="pointer"
                                                            as={CgClose}
                                                            color="gray.600"
                                                            w="20px"
                                                            h="20px"
                                                            marginLeft="5px"
                                                            onClick={() =>
                                                                setFilters({
                                                                    ...filters,
                                                                    investmentTerms: filters.investmentTerms?.filter(
                                                                        (int) => int !== it,
                                                                    ),
                                                                })
                                                            }
                                                        />
                                                    </WrapItem>
                                                ))}
                                            </Wrap>
                                        </HStack>

                                        <Button
                                            onClick={() => setFilters({})}
                                            variant="ghost"
                                            color="gray.50"
                                            fontFamily="inter"
                                            fontSize="14px"
                                            rightIcon={
                                                <Icon cursor="pointer" as={CgClose} color="red.500" w="20px" h="20px" />
                                            }
                                        >
                                            Limpiar filtros
                                        </Button>
                                    </Stack>
                                </Collapse>
                            </Stack>

                            <VStack mt={{ base: '20px', md: '40px' }} align="start" spacing="36px">
                                {gsg ? (
                                    <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing="37px">
                                        {filtersResult()?.length !== 0 ? (
                                            filtersResult()?.map((project) => (
                                                <ExplorerCard
                                                    key={project.id}
                                                    project={project}
                                                    user={userResponse?.user}
                                                />
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

            <FilterExperienceModal isOpen={isOpenExperience} onClose={closeExperience} />
            <ChangePhoneModal isOpen={isOpenPhone} onClose={closePhone} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
    try {
        const response = await userFetcher(req);

        return {
            props: {
                user: response,
            },
        };
    } catch (error) {
        return {
            props: {},
        };
    }
};

export default Explorer;
