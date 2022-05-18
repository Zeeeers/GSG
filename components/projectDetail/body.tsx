import { Avatar, Grid, GridItem, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import { CgShapeSquare, CgShapeCircle, CgShapeTriangle, CgSortAz } from 'react-icons/cg';
import { Gsg } from 'services/api/types/Gsg';

interface Props {
    project: Gsg | undefined;
}

const Body: React.FC<Props> = ({ project }) => {
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
        <Stack alignItems="start" mt="5rem" px={{ base: '34px', md: '124px' }} spacing="50px" py="207px">
            <Stack>
                <Text fontSize="4xl">Acerca de</Text>
                <Text as="p">{project?.about}</Text>
            </Stack>

            <Stack bg="gray.800" w="full" rounded="16px" py="40px" px={{ base: '24px', md: '35px' }}>
                <Text fontSize="4xl">Impacto</Text>
                <Text fontSize="sm">Madurez de impacto Intermedio</Text>
                <Stack spacing="50px">
                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="red.400" as={CgShapeSquare} />
                            <Text fontSize="2xl" fontWeight="medium" color="red.300">
                                QUÉ
                            </Text>
                        </HStack>
                        <Text>{project?.impact_what ?? 'No hay impacto'}</Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="teal.200" as={CgShapeCircle} />
                            <Text fontSize="2xl" fontWeight="medium" color="teal.300">
                                QUIÉN
                            </Text>
                        </HStack>
                        <Text>{project?.impact_who ?? 'No hay impacto'}</Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="cyan.200" as={CgSortAz} />
                            <Text fontSize="2xl" fontWeight="medium" color="cyan.300">
                                CUANTO
                            </Text>
                        </HStack>
                        <Text>{project?.impact_how_much ?? 'No hay impacto'}</Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="purple.200" as={BsPlus} />
                            <Text fontSize="2xl" fontWeight="medium" color="purple.300">
                                CONTRIBUCIÓN
                            </Text>
                        </HStack>
                        <Text>{project?.impact_contribution ?? 'No hay impacto'}</Text>
                    </Stack>

                    <Stack>
                        <HStack>
                            <Icon w={10} h={10} color="orange.500" as={CgShapeTriangle} />
                            <Text fontSize="2xl" fontWeight="medium" color="orange.400">
                                RIESGOS
                            </Text>
                        </HStack>
                        <Text>{project?.impact_risk ?? 'No hay impacto'}</Text>
                    </Stack>
                </Stack>
            </Stack>

            <Stack>
                <Text fontSize="4xl">Problema</Text>
            </Stack>

            <Stack>
                <Text fontSize="4xl">Solución</Text>
            </Stack>

            <Stack>
                <Text fontSize="4xl">Información complementaria</Text>
            </Stack>

            <Stack>
                <Text fontSize="4xl">Finanzas</Text>
            </Stack>

            <Stack>
                <Text fontSize="4xl">Modelo de negocios</Text>
            </Stack>

            <Stack>
                <Text fontSize="4xl">Uso de los ingresos</Text>
            </Stack>

            <Stack>
                <Text fontSize="4xl">Oportunidad de inversión</Text>
            </Stack>
            <Stack spacing="30px">
                <Text fontSize="4xl">Equipo</Text>
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
                                <Text fontSize="sm" as="p">
                                    {member.description}
                                </Text>
                            </Stack>
                        </GridItem>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );
};

export default Body;
