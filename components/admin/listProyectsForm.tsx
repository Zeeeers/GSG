import {
    Badge,
    Button,
    Divider,
    HStack,
    Link,
    Select,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
} from '@chakra-ui/react';
import Stage from 'components/projectDetail/formatText/stage';
import React, { useState } from 'react';
import { useAdminGsg } from 'services/api/lib/gsg/gsg.calls';

const ListProyectsForm = (props: any) => {
    const { data, mutate } = useAdminGsg();
    const [deleteProduct, setDeleteProduct] = useState(false);
    const toast = useToast();

    const handleStatus = async (id: number, e: any) => {
        const { updateStatusGsgProject } = await import('../../services/api/lib/gsg');
        const { ok } = await updateStatusGsgProject({ idProject: id, gsgProject: { status: e?.target?.value } });

        if (ok) {
            toast({
                title: 'Proyecto actualizado',
                description: `Se ha actualizado el estado del proyecto exitosamente.`,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });

            mutate();
        } else {
            toast({
                title: 'Error al actualizar',
                description: 'Ha ocurrido un error al intentar actualizar el proyecto, porfavor intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    const handleDelete = async (id: number) => {
        setDeleteProduct(true);
        const { deleteGsgProject } = await import('../../services/api/lib/gsg');
        const { ok } = await deleteGsgProject(id);

        if (ok) {
            setDeleteProduct(false);
            toast({
                title: 'Proyecto eliminado',
                description: `Se ha eliminado el proyecto exitosamente.`,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });

            mutate();
        } else {
            setDeleteProduct(false);
            toast({
                title: 'Error al eliminar',
                description: 'Ha ocurrido un error al intentar eliminar el proyecto, porfavor intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return (
        <>
            <Table display={{ base: 'none', lg: 'block' }} size="lg" p={0} w="full">
                <Thead>
                    <Tr>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Fecha
                        </Th>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Nombre del proyecto
                        </Th>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Empresa
                        </Th>
                        <Th pl="40px" fontWeight="bold" color="gray.50" border="none">
                            Status
                        </Th>
                        <Th pl={0} border="none"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.data?.projects
                        ?.filter((project) =>
                            project.title.toLowerCase().includes(props.filters?.title?.toLowerCase() ?? ''),
                        )
                        .filter((project) => project?.status.includes(props.filters?.status ?? ''))
                        .sort((a, b) => {
                            if (props.filters.last_status_updated === 'asc') {
                                //@ts-ignore
                                return new Date(b.last_status_updated) - new Date(a.last_status_updated);
                            } else {
                                //@ts-ignore
                                return new Date(a.last_status_updated) - new Date(b.last_status_updated);
                            }
                        })
                        .map((proyect, i) => (
                            <Tr key={i}>
                                <Td fontFamily="inter" pl={0} py="30px" w="13%">
                                    {new Date(proyect?.last_status_updated).toLocaleString('es-CL', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}
                                </Td>
                                <Td fontFamily="inter" pl={0} py="30px">
                                    {proyect?.title}
                                </Td>
                                <Td fontFamily="inter" pl={0}>
                                    {proyect?.organization.name}
                                </Td>

                                <Td fontFamily="inter" pl="40px">
                                    <Select
                                        w="163px"
                                        defaultValue={proyect?.status}
                                        onChange={(e) => handleStatus(proyect?.id, e)}
                                        variant="outline"
                                        _focus={{ color: 'white' }}
                                    >
                                        <option value="in-review">En revisión</option>
                                        <option value="sketch">Borrador</option>
                                        <option value="published">Publicado</option>
                                        <option value="canceled">Finalizado</option>
                                    </Select>
                                </Td>
                                <Td fontFamily="inter" pl="50px">
                                    <HStack spacing="20px">
                                        <Link href={`/projectDetail/${proyect?.id}`} target="_blank">
                                            <Button variant="solid">Ver proyecto</Button>
                                        </Link>
                                        <Button
                                            type="button"
                                            isLoading={deleteProduct}
                                            loadingText="Eliminando producto"
                                            onClick={() => handleDelete(proyect?.id)}
                                            variant="solid"
                                            colorScheme="red"
                                        >
                                            Eliminar
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>

            <VStack display={{ base: 'block', lg: 'none' }} w="full" align="flex-start" mt="40px">
                {data?.data?.projects?.map((project) => (
                    <>
                        <VStack w="full" align="flex-start" pt="30px" spacing="20px">
                            <HStack w="full" align="center" justify="space-between">
                                <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                    Fecha
                                </Text>

                                <Text>
                                    {new Date(project.last_status_updated).toLocaleString('es-CL', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}
                                </Text>
                            </HStack>

                            <HStack w="full" align="center" justify="space-between">
                                <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                    Nombre del proyecto
                                </Text>

                                <Text>{project.title}</Text>
                            </HStack>

                            <HStack w="full" align="center" justify="space-between">
                                <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                    Empresa
                                </Text>

                                <Text>{project?.organization.name}</Text>
                            </HStack>

                            <HStack w="full" align="center" justify="space-between">
                                <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                    Etapa
                                </Text>

                                <Badge
                                    variant="solid"
                                    fontFamily="inter"
                                    colorScheme="green"
                                    textAlign="center"
                                    alignItems="center"
                                    py="2px"
                                    px="8px"
                                    rounded="6px"
                                    mt={0}
                                >
                                    {Stage(project.capital_stage)}
                                </Badge>
                            </HStack>

                            <HStack w="full" align="center" justify="space-between">
                                <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                    Status
                                </Text>
                                <Select
                                    w="163px"
                                    defaultValue={project.status}
                                    onChange={(e) => handleStatus(project.id, e)}
                                    variant="filled"
                                    _focus={{ color: 'white' }}
                                >
                                    <option value="in-review">En revisión</option>
                                    <option value="sketch">Borrador</option>
                                    <option value="published">Publicado</option>
                                    <option value="canceled">Finalizado</option>
                                </Select>
                            </HStack>

                            <HStack w="full" align="center" justify="space-between">
                                <Stack display={{ base: 'none', sm: 'block' }} w="full"></Stack>
                                <HStack align="flex-start" pb="30px">
                                    <Link href={`/projectDetail/${project.id}`} target="_blank">
                                        <Button variant="solid">Ver proyecto</Button>
                                    </Link>
                                    <Button
                                        type="button"
                                        isLoading={deleteProduct}
                                        loadingText="Eliminando producto"
                                        onClick={() => handleDelete(project.id)}
                                        variant="solid"
                                        colorScheme="red"
                                    >
                                        Eliminar
                                    </Button>
                                </HStack>
                            </HStack>
                        </VStack>

                        <Divider />
                    </>
                ))}
            </VStack>
        </>
    );
};

export default ListProyectsForm;
