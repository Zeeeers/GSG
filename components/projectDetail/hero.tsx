// Dependencies
import { Img, Badge, Container, Flex, VStack, Text, Stack, Button, useDisclosure, HStack } from '@chakra-ui/react';
import { impact } from '@clyc/api-wrapper';
import CurrencyFormat from 'common/currencyFormat';
import { useEffect, useRef, useState } from 'react';
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
    const [isActive, setIsActive] = useState({
        about: false,
        impact: false,
        problem: false,
        solution: false,
        additionalInfo: false,
        finance: false,
        model: false,
        income: false,
        oportunity: false,
        member: false,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const about = useRef<HTMLBodyElement>(null);
    const impact = useRef<HTMLBodyElement>(null);
    const problem = useRef<HTMLBodyElement>(null);
    const solution = useRef<HTMLBodyElement>(null);
    const additionalInfo = useRef<HTMLBodyElement>(null);
    const finance = useRef<HTMLBodyElement>(null);
    const model = useRef<HTMLBodyElement>(null);
    const income = useRef<HTMLBodyElement>(null);
    const oportunity = useRef<HTMLBodyElement>(null);
    const member = useRef<HTMLBodyElement>(null);

    const ref = useRef({
        about,
        impact,
        problem,
        solution,
        additionalInfo,
        finance,
        model,
        income,
        oportunity,
        member,
    });

    const executeScroll = (section: string) => {
        switch (section) {
            case 'about':
                about?.current?.scrollIntoView({
                    behavior: 'smooth',
                });

                break;
            case 'impact':
                impact?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
            case 'problem':
                problem?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
            case 'solution':
                solution?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;

            case 'additional':
                additionalInfo?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;

            case 'finance':
                finance?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
            case 'model':
                model?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;

            case 'income':
                income?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;

            case 'oportunity':
                oportunity?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
            case 'member':
                member?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
        }
    };

    const handleScroll = () => {
        if (window.scrollY > 370) {
            setSticky(true);
        } else if (window.scrollY < 250) {
            setSticky(false);
        }

        let aboutY = about.current?.getBoundingClientRect().y ?? 0;
        let impactY = impact.current?.getBoundingClientRect().y ?? 0;
        let problemY = problem.current?.getBoundingClientRect().y ?? 0;
        let solutionY = solution.current?.getBoundingClientRect().y ?? 0;
        let additionalInfoY = additionalInfo.current?.getBoundingClientRect().y ?? 0;
        let financeY = finance.current?.getBoundingClientRect().y ?? 0;
        let modelY = model.current?.getBoundingClientRect().y ?? 0;
        let incomeY = income.current?.getBoundingClientRect().y ?? 0;
        let oportunityY = oportunity.current?.getBoundingClientRect().y ?? 0;
        let memberY = member.current?.getBoundingClientRect().y ?? 0;

        if (aboutY < 130) {
            setIsActive({
                ...isActive,
                about: true,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: false,
                income: false,
                oportunity: false,
                member: false,
            });
        } else {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: false,
                income: false,
                oportunity: false,
                member: false,
            });
        }
        if (impactY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: true,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: false,
                income: false,
                oportunity: false,
                member: false,
            });
        }
        if (problemY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: true,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: false,
                income: false,
                oportunity: false,
                member: false,
            });
        }
        if (solutionY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: true,
                additionalInfo: false,
                finance: false,
                model: false,
                income: false,
                oportunity: false,
                member: false,
            });
        }
        if (additionalInfoY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: true,
                finance: false,
                model: false,
                income: false,
                oportunity: false,
                member: false,
            });
        }
        if (financeY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: true,
                model: false,
                income: false,
                oportunity: false,
                member: false,
            });
        }
        if (modelY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: true,
                income: false,
                oportunity: false,
                member: false,
            });
        }
        if (incomeY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: false,
                income: true,
                oportunity: false,
                member: false,
            });
        }
        if (oportunityY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: false,
                income: false,
                oportunity: true,
                member: false,
            });
        }
        if (memberY < 130) {
            setIsActive({
                ...isActive,
                about: false,
                impact: false,
                problem: false,
                solution: false,
                additionalInfo: false,
                finance: false,
                model: false,
                income: false,
                oportunity: false,
                member: true,
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
                            color={isActive.about ? 'teal.400' : ''}
                            fontWeight="medium"
                            variant="unstyled"
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                            rounded={0}
                            borderBottom={isActive.about ? '2px' : ''}
                            onClick={() => executeScroll('about')}
                        >
                            Acerca de
                        </Button>
                        <Button
                            onClick={() => executeScroll('impact')}
                            color={isActive.impact ? 'teal.400' : ''}
                            borderBottom={isActive.impact ? '2px' : ''}
                            variant="unstyled"
                            rounded={0}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Impacto
                        </Button>
                        <Button
                            onClick={() => executeScroll('problem')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.problem ? 'teal.400' : ''}
                            borderBottom={isActive.problem ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Problema
                        </Button>
                        <Button
                            onClick={() => executeScroll('solution')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.solution ? 'teal.400' : ''}
                            borderBottom={isActive.solution ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Solución
                        </Button>
                        <Button
                            onClick={() => executeScroll('additional')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.additionalInfo ? 'teal.400' : ''}
                            borderBottom={isActive.additionalInfo ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Inf. complementaria
                        </Button>
                        <Button
                            onClick={() => executeScroll('finance')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.finance ? 'teal.400' : ''}
                            borderBottom={isActive.finance ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Finanzas
                        </Button>

                        <Button
                            onClick={() => executeScroll('model')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.model ? 'teal.400' : ''}
                            borderBottom={isActive.model ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Modelo de negocio
                        </Button>
                        <Button
                            onClick={() => executeScroll('income')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.income ? 'teal.400' : ''}
                            borderBottom={isActive.income ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Uso de ingresos
                        </Button>
                        <Button
                            onClick={() => executeScroll('oportunity')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.oportunity ? 'teal.400' : ''}
                            borderBottom={isActive.oportunity ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Oportunidad de inversión
                        </Button>
                        <Button
                            onClick={() => executeScroll('member')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.member ? 'teal.400' : ''}
                            borderBottom={isActive.member ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
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

                    <Body project={project} ref={ref} />
                </Container>
            </Flex>

            <ContactModal isOpen={isOpen} onClose={onClose} project={project} />
        </>
    );
};

// Export
export default HeaderHero;
