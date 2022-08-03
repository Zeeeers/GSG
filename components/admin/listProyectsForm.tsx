//@ts-nocheck
import { Badge, Button, HStack, Table, Tbody, Td, Th, Thead, Tr, Select, useToast, Link } from '@chakra-ui/react';
import Stage from 'components/projectDetail/formatText/stage';
import React, { useState } from 'react';
import { useAdminGsg } from 'services/api/lib/gsg/gsg.calls';

const ListProyectsForm = () => {
    const [status, setStatus] = useState('');
    const { data, mutate } = useAdminGsg();
    const [deleteProduct, setDeleteProduct] = useState(false);
    const toast = useToast();

    console.log(data);

    const handleStatus = async (id: number, e: any) => {
        const { updateStatusGsgProject } = await import('../../services/api/lib/gsg');
        const { ok } = await updateStatusGsgProject({ idProject: id, gsgProject: { status: e?.target?.value } });

        if (ok) {
            toast({
                title: 'Producto actualizado',
                description: `Se ha actualizado el estado del producto exitosamente.`,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });

            mutate();
        } else {
            toast({
                title: 'Error al actualizar',
                description: 'Ha ocurrido un error al intentar actualizar el producto, porfavor intentelo de nuevo.',
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
                title: 'Producto eliminado',
                description: `Se ha eliminado el producto exitosamente.`,
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
                description: 'Ha ocurrido un error al intentar eliminar el producto, porfavor intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return (
        <>
            <Table size="lg" p={0}>
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
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Etapa
                        </Th>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Status
                        </Th>
                        <Th pl={0} border="none"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.data?.projects?.map((proyect, i) => (
                        <Tr key={i}>
                            <Td fontFamily="inter" pl={0} py="30px" w="13%">
                                {new Date(proyect.last_status_updated).toLocaleString('es-CL', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                })}
                            </Td>
                            <Td fontFamily="inter" pl={0} py="30px">
                                {proyect.title}
                            </Td>
                            <Td fontFamily="inter" pl={0}>
                                {proyect?.organization.name}
                            </Td>
                            <Td fontFamily="inter" pl={0}>
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
                                    {Stage(proyect.capital_stage)}
                                </Badge>
                            </Td>
                            <Td fontFamily="inter" pl={0}>
                                <Select
                                    defaultValue={proyect.status}
                                    onChange={(e) => handleStatus(proyect.id, e)}
                                    variant="filled"
                                    _focus={{ color: 'white' }}
                                >
                                    <option value="in-review">En revisión</option>
                                    <option value="sketch">Borrador</option>
                                    <option value="published">Publicado</option>
                                    <option value="canceled">Finalizado</option>
                                </Select>
                            </Td>
                            <Td fontFamily="inter" pl={0}>
                                <HStack spacing="20px">
                                    <Link href={`/projectDetail/${proyect.id}`} target="_blank">
                                        <Button variant="solid">Ver proyecto</Button>
                                    </Link>
                                    <Button
                                        type="button"
                                        isLoading={deleteProduct}
                                        loadingText="Eliminando producto"
                                        onClick={() => handleDelete(proyect.id)}
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
        </>
    );
};

export default ListProyectsForm;
