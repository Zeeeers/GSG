// @ts-nocheck
import {
    Badge,
    Button,
    Divider,
    HStack,
    Link,
    Select,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    Portal,
    ListItem,
    UnorderedList,
    Icon,
} from '@chakra-ui/react';

import { Pagination } from 'common/pagination';

import Stage from 'components/projectDetail/formatText/stage';
import React, { useState } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useAdminGsg } from 'services/api/lib/gsg/gsg.calls';
import SelectComponent from './selectComponenet';

const ListProyectsForm = (props: any) => {
    const { data, mutate } = useAdminGsg();
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [paginationIndex, setPagination] = useState(0);
    const toast = useToast();

    const gsgFilterData = data?.data?.projects
        ?.filter((project) => project.title.toLowerCase().includes(props.filters?.title?.toLowerCase() ?? ''))
        .filter((project) => project?.status.includes(props?.filters?.status ?? ''))
        .sort((a, b) => {
            if (props?.filters?.last_status_updated === 'asc') {
                //@ts-ignore
                return new Date(b.last_status_updated) - new Date(a.last_status_updated);
            } else {
                //@ts-ignore
                return new Date(a.last_status_updated) - new Date(b.last_status_updated);
            }
        });

    const handleStatus = async (id: number, e: any) => {
        const { updateStatusGsgProject } = await import('../../services/api/lib/gsg');

        const { ok } = await updateStatusGsgProject({ idProject: id, gsgProject: { status: e.target.value } });

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
            <TableContainer maxW="1200px">
                <Table display={{ base: 'none', lg: 'block' }} size="lg" pt="40px" w="full">
                    <Thead>
                        <Tr>
                            <Th
                                pl={0}
                                fontWeight="bold"
                                fontFamily="inter"
                                fontSize="18px"
                                color="gray.50"
                                border="none"
                            >
                                Fecha
                            </Th>
                            <Th
                                pl={0}
                                fontWeight="bold"
                                fontFamily="inter"
                                fontSize="18px"
                                color="gray.50"
                                border="none"
                            >
                                Nombre del proyecto
                            </Th>
                            <Th
                                pl={0}
                                fontWeight="bold"
                                fontFamily="inter"
                                fontSize="18px"
                                color="gray.50"
                                border="none"
                            >
                                Empresa
                            </Th>
                            <Th
                                pl={0}
                                fontWeight="bold"
                                fontFamily="inter"
                                fontSize="18px"
                                color="gray.50"
                                border="none"
                            >
                                Objetivo{' '}
                                <Popover placement="bottom">
                                    {() => (
                                        <>
                                            <PopoverTrigger>
                                                <Button>
                                                    <Icon as={BsInfoCircleFill} w="18px" h="18px" />
                                                </Button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent
                                                    bg="gray.700"
                                                    border="none"
                                                    py="30px"
                                                    px="20px"
                                                    w="full"
                                                    maxW="380px"
                                                >
                                                    <PopoverHeader
                                                        fontSize="24px"
                                                        fontWeight="bold"
                                                        bg="blue.800"
                                                        px="10px"
                                                        py={0}
                                                        border="none"
                                                        textTransform="uppercase"
                                                    >
                                                        Descripción de cada objetivo
                                                    </PopoverHeader>

                                                    <PopoverArrow bg="gray.700" border="none" w="50px" h="50px" />

                                                    <PopoverBody border="none">
                                                        <UnorderedList
                                                            spacing="20px"
                                                            fontFamily="inter"
                                                            lineHeight="140%"
                                                            fontSize="14px"
                                                            color="gray.300"
                                                        >
                                                            <ListItem>
                                                                <Text>
                                                                    <Text
                                                                        as="span"
                                                                        fontWeight="bold"
                                                                        fontFamily="inter"
                                                                    >
                                                                        Financiamiento:{' '}
                                                                    </Text>
                                                                    La empresa busca levantar financiamiento
                                                                </Text>
                                                            </ListItem>
                                                            <ListItem>
                                                                <Text>
                                                                    <Text as="span" fontWeight="bold">
                                                                        Visibilidad (Negro):{' '}
                                                                    </Text>
                                                                    Empresa busca visibilidad sin buscar financiamiento
                                                                </Text>
                                                            </ListItem>
                                                            <ListItem>
                                                                <Text>
                                                                    <Text as="span" fontWeight="bold">
                                                                        Visibilidad (Azul):{' '}
                                                                    </Text>
                                                                    Empresa busca visibilidad, ha determinado una fecha
                                                                    en la que quiere levantar financiamiento y está
                                                                    dentro del plazo
                                                                </Text>
                                                            </ListItem>
                                                            <ListItem>
                                                                <Text>
                                                                    <Text as="span" fontWeight="bold">
                                                                        Visibilidad (rojo):{' '}
                                                                    </Text>
                                                                    Empresa busca visibilidad, ha determinado una fecha
                                                                    en la que quiere levantar financiamiento y el plazo
                                                                    ha expirado, hay que comunicarse con ellos
                                                                </Text>
                                                            </ListItem>
                                                        </UnorderedList>
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Portal>
                                        </>
                                    )}
                                </Popover>
                            </Th>
                            <Th
                                pl="40px"
                                fontWeight="bold"
                                fontFamily="inter"
                                fontSize="18px"
                                color="gray.50"
                                border="none"
                            >
                                Status
                            </Th>
                            <Th pl={0} border="none"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {gsgFilterData
                            ?.map((proyect) => (
                                <Tr key={proyect.id}>
                                    <Td fontFamily="inter" pl={0} py="30px" w="13%">
                                        {new Date(proyect?.last_status_updated).toLocaleString('es-CL', {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </Td>
                                    <Td fontFamily="inter" pl={0} py="30px" maxW="100px">
                                        <Tooltip label={proyect?.title} bg="gray.700" hasArrow>
                                            <Text overflow="hidden" textOverflow="ellipsis">
                                                {proyect?.title}
                                            </Text>
                                        </Tooltip>
                                    </Td>
                                    <Td
                                        fontFamily="inter"
                                        pl={0}
                                        maxW="100px"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                    >
                                        <Tooltip label={proyect?.organization.name} bg="gray.700" hasArrow>
                                            <Text overflow="hidden" textOverflow="ellipsis">
                                                {proyect?.organization.name}
                                            </Text>
                                        </Tooltip>
                                    </Td>
                                    <Td fontFamily="inter" pl={0} maxW="148px">
                                        <Stack
                                            py="4px"
                                            px="10px"
                                            w="fit-content"
                                            h="29px"
                                            bg={
                                                proyect?.fundraising_start_month
                                                    ? new Date(proyect?.fundraising_start_month) < new Date()
                                                        ? 'red.500'
                                                        : 'blue.500'
                                                    : 'gray.800'
                                            }
                                            rounded="8px"
                                        >
                                            <Text fontSize="15px" fontFamily="inter">
                                                {proyect?.current_goal === 'visibility'
                                                    ? 'Visibilidad'
                                                    : 'Financiamiento'}
                                            </Text>
                                        </Stack>
                                    </Td>

                                    <Td fontFamily="inter" pl="40px" maxW="200px">
                                        <SelectComponent project={proyect} handleStatus={handleStatus} />
                                    </Td>
                                    <Td fontFamily="inter" pl="50px">
                                        <HStack spacing="20px">
                                            <Link
                                                href={`/project/${proyect?.id}-${proyect?.title
                                                    .toLowerCase()
                                                    .replaceAll(' ', '-')}`}
                                                target="_blank"
                                            >
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
                            ))
                            .slice((paginationIndex - 1) * 12, (paginationIndex - 1) * 12 + 12)}
                    </Tbody>
                </Table>
            </TableContainer>

            <Stack align="flex-start" w="full" pt="30px">
                <Pagination
                    pages={Math.ceil((gsgFilterData?.length ?? 0) / 12)}
                    actualPage={1}
                    onChange={(page) => setPagination(page)}
                />
            </Stack>

            <VStack display={{ base: 'block', lg: 'none' }} w="full" align="flex-start" mt="40px">
                {data?.data?.projects?.map((project) => (
                    <>
                        <VStack key={project.id} w="full" align="flex-start" pt="30px" spacing="20px">
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
