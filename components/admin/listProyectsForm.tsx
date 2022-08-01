// @ts-nocheck
import { Badge, Button, HStack, Table, Tbody, Td, Th, Thead, Tr, Select, useToast, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGsg } from 'services/api/lib/gsg';

const ListProyectsForm = () => {
    const [status, setStatus] = useState('');
    const { data, mutate } = useGsg(true);
    const toast = useToast();

    const handleStatus = async (id: number, e: InputEvent) => {
        const { updateStatusGsgProject } = await import('../../services/api/lib/gsg');
        const { ok } = await updateStatusGsgProject({ idProject: id, gsgProject: { status: e.target.value } });

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

    return (
        <>
            <Table size="lg" p={0}>
                <Thead>
                    <Tr>
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
                    {data?.data?.projects[0].map((proyect) => (
                        <Tr>
                            <Td fontFamily="inter" pl={0} py="30px">
                                {proyect.title}
                            </Td>
                            <Td fontFamily="inter" pl={0}>
                                Northstar SpA
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
                                    {proyect.capital_stage}
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
                                    <Button variant="solid" colorScheme="red">
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
