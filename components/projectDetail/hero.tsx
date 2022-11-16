// Dependencies
//@ts-nocheck
import { Avatar, Button, Container, Flex, HStack, Img, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import cookies from 'nookies';
import { useEffect, useRef, useState } from 'react';
import { Gsg } from 'services/api/types/Gsg';
import Body from './body';
import ContactModal from './contactModal';
import BadgeStage from './formatText/badgeStage';
import FinanceGoal from './formatText/financeGoal';

interface Props {
    project: Gsg | undefined;
    user: User | undefined;
    orga: Organization | undefined;
}

// Component
const HeaderHero: React.FC<Props> = ({ project, user, orga, mutate }) => {
    const adminCookie = cookies.get()[process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!];
    const router = useRouter();

    // States
    const [sticky, setSticky] = useState(false);
    const [isActive, setIsActive] = useState({
        description_general: true,
        impact: false,
        description_finance: false,
        other: false,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const description_general = useRef<HTMLBodyElement>(null);
    const impact = useRef<HTMLBodyElement>(null);
    const description_finance = useRef<HTMLBodyElement>(null);
    const other = useRef<HTMLBodyElement>(null);

    const ref = useRef({
        description_general,
        impact,
        description_finance,
        other,
    });

    const executeScroll = (section: string) => {
        switch (section) {
            case 'description_general':
                description_general?.current?.scrollIntoView({
                    behavior: 'smooth',
                });

                break;
            case 'impact':
                impact?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
            case 'description_finance':
                description_finance?.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
            case 'other':
                other?.current?.scrollIntoView({
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

        let description_generalY = description_general.current?.getBoundingClientRect().y ?? 0;
        let impactY = impact.current?.getBoundingClientRect().y ?? 0;
        let description_financeY = description_finance.current?.getBoundingClientRect().y ?? 0;
        let otherY = other.current?.getBoundingClientRect().y ?? 0;

        if (description_generalY < 130) {
            setIsActive({
                ...isActive,
                description_general: true,
                impact: false,
                description_finance: false,
                other: false,
            });
        }
        if (impactY < 130) {
            setIsActive({
                ...isActive,
                description_general: false,
                impact: true,
                description_finance: false,
                other: false,
            });
        } else {
            setIsActive({
                ...isActive,
                description_general: true,
                impact: false,
                description_finance: false,
                other: false,
            });
        }
        if (description_financeY < 130) {
            setIsActive({
                ...isActive,
                description_general: false,
                impact: false,
                description_finance: true,
                other: false,
            });
        }
        if (otherY < 130) {
            setIsActive({
                ...isActive,
                description_general: false,
                impact: false,
                description_finance: false,
                other: true,
            });
        }
    };

    const handleInterest = async () => {
        const { createInterest } = await import('../../services/api/lib/gsg');

        try {
            const { data, ok } = await createInterest({ project: { gsg_projects_id: project?.id } });

            if (ok) {
                mutate();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Flex w="full" h="90px" position="absolute" ref={description_general}>
                <Container
                    maxWidth={{ base: 'full', md: '4xl', lg: '5xl', xl: '6xl' }}
                    pb={16}
                    px={{ base: 0, md: 4, lg: 12, xl: 6 }}
                >
                    <Stack
                        display={{ base: 'none', xl: 'flex' }}
                        position={sticky ? 'fixed' : 'absolute'}
                        alignItems="end"
                        spacing="30px"
                        zIndex={30}
                        marginLeft="-110px"
                        marginTop={sticky ? '5px' : '350px'}
                    >
                        <Button
                            color={isActive.description_general ? 'teal.400' : ''}
                            fontWeight="medium"
                            variant="unstyled"
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                            rounded={0}
                            borderBottom={isActive.description_general ? '2px' : ''}
                            onClick={() => executeScroll('description_general')}
                        >
                            Descripción general
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
                            onClick={() => executeScroll('description_finance')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.description_finance ? 'teal.400' : ''}
                            borderBottom={isActive.description_finance ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Descripción financiera
                        </Button>
                        <Button
                            onClick={() => executeScroll('other')}
                            variant="unstyled"
                            rounded={0}
                            color={isActive.other ? 'teal.400' : ''}
                            borderBottom={isActive.other ? '2px' : ''}
                            _hover={{ color: 'teal.500' }}
                            fontSize="sm"
                        >
                            Otra información
                        </Button>
                    </Stack>

                    {user &&
                        (Object.values(project?.relations ?? {}).find(
                            (r) => r.organization_id === user?.organization_id,
                        )?.kinds !== 'interested' ? (
                            <Button
                                position="fixed"
                                onClick={handleInterest}
                                leftIcon={<Img src="/images/icons/interest.svg" />}
                                variant="solid"
                                rounded="500px"
                                h="40px"
                                right="50px"
                                bottom="30px"
                                background="gray.700"
                                _hover={{ background: 'gray.600' }}
                            >
                                <Text>Me interesa</Text>
                            </Button>
                        ) : (
                            <Button
                                position="fixed"
                                onClick={handleInterest}
                                variant="solid"
                                background="blue.700"
                                color="gray.50"
                                rounded="500px"
                                fontSize="18px"
                                fontFamily="inter"
                                h="40px"
                                px="15px"
                                _hover={{ borderColor: 'none' }}
                                leftIcon={<Img src="/images/icons/interest.svg" />}
                                right="50px"
                                bottom="30px"
                            >
                                <Text>Te interesa</Text>
                            </Button>
                        ))}

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
                                    src={project?.main_image}
                                    alt="Imagen del desafio"
                                    w={{ base: 'full', md: 898 }}
                                    objectFit="cover"
                                    borderRadius={{ base: 0, md: '2xl' }}
                                    h="full"
                                />
                            </Flex>

                            <Flex
                                position={{ base: 'relative', md: 'absolute' }}
                                bottom={{
                                    base: 0,
                                    md:
                                        project?.description?.length <= 700
                                            ? '-20rem'
                                            : project?.description?.length <= 200
                                            ? '-20rem'
                                            : '-33rem',
                                }}
                                justifyContent="center"
                                w="full"
                            >
                                <VStack
                                    boxShadow="lg"
                                    bg="gray.800"
                                    w={{ base: 'full', md: 898 }}
                                    h={{ base: 'full', md: '-webkit-fit-content' }}
                                    justifyContent="start"
                                    alignItems="start"
                                    rounded={{ base: 0, md: '2xl' }}
                                    px={{ base: '24px', md: '40px' }}
                                    py={{ base: '24px', md: '30px' }}
                                    spacing={0}
                                >
                                    <VStack align="flex-start" spacing="15px" mb="20px">
                                        <HStack spacing="17px" mb="15px" justify="space-between" w="full">
                                            <HStack>
                                                <Avatar
                                                    name={project?.organization?.name}
                                                    src={project?.organization?.image}
                                                    w="48px"
                                                    h="48px"
                                                />
                                                <Text fontSize={'24px'} fontWeight="medium" fontFamily="inter">
                                                    {project?.organization?.name}
                                                </Text>
                                            </HStack>
                                            {user &&
                                                Object.values(project?.relations ?? {}).find(
                                                    (r) => r.organization_id === user?.organization_id,
                                                )?.kinds !== 'interested' && (
                                                    <Button
                                                        onClick={handleInterest}
                                                        leftIcon={<Img src="/images/icons/interest.svg" />}
                                                        variant="outline"
                                                        border="2px"
                                                        rounded="500px"
                                                        borderColor="gray.50"
                                                        h="40px"
                                                        _hover={{ borderColor: 'none' }}
                                                    >
                                                        <Text>Me interesa</Text>
                                                    </Button>
                                                )}

                                            {Object.values(project?.relations ?? {}).find(
                                                (r) => r.organization_id === user?.organization_id,
                                            )?.kinds === 'interested' && (
                                                <Button
                                                    onClick={handleInterest}
                                                    variant="solid"
                                                    background="gray.50"
                                                    color="gray.800"
                                                    border="2px"
                                                    rounded="500px"
                                                    borderColor="gray.50"
                                                    fontSize="18px"
                                                    fontFamily="inter"
                                                    h="40px"
                                                    px="10px"
                                                    _hover={{ borderColor: 'none' }}
                                                    leftIcon={
                                                        <Img
                                                            src="/images/icons/interest_green.svg"
                                                            as={motion.img}
                                                            initial={{ scale: 0 }}
                                                            animate={{
                                                                scale: 1,
                                                                transition: {
                                                                    type: 'spring',
                                                                    duration: 1,
                                                                    bounce: 0.6,
                                                                },
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Text>Te interesa</Text>
                                                </Button>
                                            )}
                                        </HStack>
                                        {user && (
                                            <HStack px="10px" py="5px" rounded="6px" background="#3B5D89">
                                                <Img src="/images/icons/interest.svg" />
                                                <Text
                                                    color="gray.50"
                                                    fontFamily="inter"
                                                    fontWeight="400"
                                                    fontSize="15px"
                                                >
                                                    {`${project?.relations?.interests} inversionistas interesados`}
                                                </Text>
                                            </HStack>
                                        )}

                                        <VStack align="flex-start" w="full" spacing="10px">
                                            <Text
                                                fontSize={{ base: '3xl', md: '4xl' }}
                                                lineHeight="32px"
                                                textTransform="uppercase"
                                                fontWeight="bold"
                                            >
                                                {project?.title}
                                            </Text>

                                            <Text fontSize={{ base: 'sm', md: 'md' }} fontFamily="inter" as="p">
                                                {project?.description}
                                            </Text>
                                        </VStack>
                                    </VStack>
                                    <HStack>
                                        {project?.capital_stage && <BadgeStage capitalStage={project?.capital_stage} />}

                                        {!project?.debt ||
                                            (project?.debt !== 'other' && <BadgeStage capitalStage={project?.debt} />)}
                                    </HStack>
                                    <VStack align="flex-start" w="full" pt="20px" m={0} spacing={0}>
                                        <Text fontFamily="inter" color="gray.400" fontSize="16px">
                                            Rango de levantamiento buscado
                                        </Text>
                                        <Flex
                                            justifyContent="space-between"
                                            direction={{ base: 'column', md: 'row' }}
                                            w="full"
                                            pt="5px"
                                        >
                                            <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="medium">
                                                {FinanceGoal(project?.finance_goal)} (CLP)
                                            </Text>
                                            <Stack
                                                alignItems={{ base: 'center', md: 'start' }}
                                                spacing="5px"
                                                mt={{ base: '20px', md: 0 }}
                                                justifyContent="end"
                                            >
                                                {(user || project?.id === orga?.gsg_project_id || adminCookie) && (
                                                    <Button
                                                        onClick={onOpen}
                                                        w={{ base: 'full', md: '212px' }}
                                                        h="48px"
                                                        variant="solid"
                                                    >
                                                        Contactar
                                                    </Button>
                                                )}
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

            <ContactModal isOpen={isOpen} onClose={onClose} project={project?.organization} web={project?.contacts} />
        </>
    );
};

// Export
export default HeaderHero;
