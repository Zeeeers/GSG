import { Avatar, forwardRef, Grid, GridItem, HStack, Icon, Stack, Text, TextProps } from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import { CgShapeSquare, CgShapeCircle, CgShapeTriangle, CgSortAz } from 'react-icons/cg';
import { Gsg } from 'services/api/types/Gsg';
import { HiHeart } from 'react-icons/hi';
import { Ref } from 'react';

const Body = forwardRef<any, any>(({ project }, ref) => {
    const { about, impact, problem, solution, additionalInfo, finance, model, income, oportunity, member } =
        ref.current;

    const members = [
        {
            name: 'Nicolás henríquez',
            position: 'Gerente general',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        },
        {
            name: 'Nicolás henríquez',
            position: 'Gerente general',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        },
    ];
    return (
        <Stack
            alignItems="start"
            mt="5rem"
            px={{ base: '34px', md: '124px' }}
            spacing="50px"
            py="207px"
            scrollPaddingTop="100px"
        >
            <Stack>
                <Text scrollMarginTop="100px" ref={about} fontSize="4xl">
                    Acerca de
                </Text>
                <Text as="p" fontFamily="inter" fontSize="md">
                    {project?.about}
                </Text>
            </Stack>

            <Stack bg="gray.800" w="full" rounded="16px" py="40px" px={{ base: '24px', md: '35px' }}>
                <Text scrollMarginTop="150px" ref={impact} fontSize="4xl" fontWeight="medium">
                    Impacto
                </Text>
                <Text fontSize="sm" fontFamily="inter">
                    Madurez de impacto Intermedio
                </Text>

                <HStack spacing="20px" pt="15px" pb="30px">
                    <Stack p="15px" bg="green.600" rounded="15px">
                        <Icon w={10} h={10} color="gray.50" as={HiHeart} />
                    </Stack>
                    <Text
                        fontWeight="medium"
                        fontSize="20px"
                        color="#279B48
"
                    >
                        Salud y bienestar
                    </Text>
                </HStack>
                <Stack spacing="50px">
                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="red.400" as={CgShapeSquare} />
                            <Text fontSize="2xl" fontWeight="medium" color="red.300">
                                QUÉ
                            </Text>
                        </HStack>
                        <Text fontFamily="inter" fontSize="md">
                            {project?.impact_what ?? 'No hay impacto'}
                        </Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="teal.200" as={CgShapeCircle} />
                            <Text fontSize="2xl" fontWeight="medium" color="teal.300">
                                QUIÉN
                            </Text>
                        </HStack>
                        <Text fontFamily="inter" fontSize="md">
                            {project?.impact_who ?? 'No hay impacto'}
                        </Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="cyan.200" as={CgSortAz} />
                            <Text fontSize="2xl" fontWeight="medium" color="cyan.300">
                                CUANTO
                            </Text>
                        </HStack>
                        <Text fontFamily="inter" fontSize="md">
                            {project?.impact_how_much ?? 'No hay impacto'}
                        </Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="purple.200" as={BsPlus} />
                            <Text fontSize="2xl" fontWeight="medium" color="purple.300">
                                CONTRIBUCIÓN
                            </Text>
                        </HStack>
                        <Text fontFamily="inter" fontSize="md">
                            {project?.impact_contribution ?? 'No hay impacto'}
                        </Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="orange.500" as={CgShapeTriangle} />
                            <Text fontSize="2xl" fontWeight="medium" color="orange.400">
                                RIESGOS
                            </Text>
                        </HStack>
                        <Text fontFamily="inter" fontSize="md">
                            {project?.impact_risk ?? 'No hay impacto'}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>

            <Stack>
                <Text scrollMarginTop="100px" ref={problem} fontSize="4xl">
                    Problema
                </Text>
                <Text fontFamily="inter" fontSize="md">
                    {project?.problem}
                </Text>
            </Stack>

            <Stack>
                <Text scrollMarginTop="100px" ref={solution} fontSize="4xl">
                    Solución
                </Text>
                <Text fontFamily="inter" fontSize="md">
                    {project?.solution}
                </Text>
            </Stack>

            <Stack>
                <Text scrollMarginTop="100px" ref={additionalInfo} fontSize="4xl">
                    Información complementaria
                </Text>
                <Text fontFamily="inter" fontSize="md">
                    {project?.more_info}
                </Text>
            </Stack>

            <Stack>
                <Text scrollMarginTop="100px" ref={finance} fontSize="4xl">
                    Finanzas
                </Text>
                <Text fontFamily="inter" fontSize="md">
                    {project?.finance}
                </Text>
            </Stack>

            <Stack>
                <Text scrollMarginTop="100px" ref={model} fontSize="4xl">
                    Modelo de negocios
                </Text>
                <Text fontFamily="inter" fontSize="md">
                    {project?.business_model}
                </Text>
            </Stack>

            <Stack>
                <Text scrollMarginTop="100px" ref={income} fontSize="4xl">
                    Uso de los ingresos
                </Text>
            </Stack>

            <Stack>
                <Text scrollMarginTop="100px" ref={oportunity} fontSize="4xl">
                    Oportunidad de inversión
                </Text>
                <Text fontFamily="inter" fontSize="md">
                    {project?.investment_opportunity}
                </Text>
            </Stack>
            <Stack spacing="30px">
                <Text scrollMarginTop="100px" ref={member} fontSize="4xl">
                    Equipo
                </Text>
                <Grid
                    placeContent="start"
                    placeItems="start"
                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                    gap="50px"
                >
                    {members.map((member, i) => (
                        <GridItem key={i}>
                            <Stack spacing="10px" p={0}>
                                <Avatar name={member.name} w="96px" h="96px" />
                                <Text color="gray.50" fontSize="xl" fontWeight="medium">
                                    {member.name}
                                </Text>
                                <Text color="gray.500" fontSize="sm">
                                    {member.position}
                                </Text>
                                <Text fontFamily="inter" fontSize="md" as="p">
                                    {member.description}
                                </Text>
                            </Stack>
                        </GridItem>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );
});

export default Body;
