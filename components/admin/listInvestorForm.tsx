import {
    Button,
    Divider,
    HStack,
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
    FormControl,
    Switch,
    Icon,
} from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import { Pagination } from 'common/pagination';
import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';
import { useInvestorAll } from 'services/api/lib/user';
import { User } from 'services/api/types/User';

const ListInvestorForm = (props: any) => {
    const [deleteProduct, setDeleteProduct] = useState(false);
    const toast = useToast();
    const [paginationIndex, setPagination] = useState(0);

    const { data: investors, mutate } = useInvestorAll();

    const investorFilter = investors
        ?.filter((investor) => investor.name.toLowerCase().includes(props.filters?.name?.toLowerCase() ?? ''))
        .filter((investor, {}, user) =>
            investor?.active == (props.filters?.status === '')
                ? user
                : investor?.active === (props?.filters?.status === 'true'),
        )
        .sort((a, b) => {
            if (props.filters.created_at === 'asc') {
                //@ts-ignore
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                //@ts-ignore
                return new Date(a.created_at) - new Date(b.created_at);
            }
        });

    const handleStatus = async (id: number) => {
        const { updateStatus } = await import('../../services/api/lib/user');
        const { ok, data } = await updateStatus(id);

        if (ok) {
            toast({
                title: `Inversionista ${data?.data.user.active ? 'activado' : 'desactivado'}`,
                description: `El inversionista ${data?.data.user.name} se ha ${
                    data?.data.user.active ? 'activado' : 'desactivado'
                } exitosamente.`,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });

            mutate();
        } else {
            toast({
                title: 'Error al actualizar',
                description:
                    'Ha ocurrido un error al intentar actualizar el status del inversionista, porfavor intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    const handleDelete = async (id: number) => {
        setDeleteProduct(true);
        const { deleteInvestor } = await import('../../services/api/lib/user');
        const { ok } = await deleteInvestor(id);

        if (ok) {
            setDeleteProduct(false);
            toast({
                title: 'Inversionista eliminado',
                description: `El inversionista ha sido eliminado exitosamente.`,
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
                description:
                    'Ha ocurrido un error al intentar eliminar al inversionistas, porfavor intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return (
        <>
            <Table display={{ base: 'none', lg: 'block' }} size="lg" p={0} w="1080px" pt="40px">
                <Thead>
                    <Tr>
                        <Th pl={0} fontWeight="700" fontSize="18px" fontFamily="inter" color="gray.50" border="none">
                            Creación
                        </Th>
                        <Th
                            pl={0}
                            fontWeight="700"
                            fontSize="18px"
                            fontFamily="inter"
                            color="gray.50"
                            border="none"
                            w="200px"
                        >
                            Nombre del inversionista
                        </Th>
                        <Th
                            pl={0}
                            fontWeight="700"
                            fontSize="18px"
                            fontFamily="inter"
                            color="gray.50"
                            border="none"
                            w="200px"
                        >
                            Correo
                        </Th>
                        <Th
                            pl={0}
                            fontWeight="700"
                            fontSize="18px"
                            fontFamily="inter"
                            color="gray.50"
                            border="none"
                            w="65px"
                        >
                            Status
                        </Th>
                        <Th
                            pl={0}
                            fontWeight="700"
                            fontSize="18px"
                            fontFamily="inter"
                            color="gray.50"
                            border="none"
                            w="120px"
                        >
                            Confirmada
                        </Th>
                        <Th pl={0} border="none"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {investorFilter
                        ?.map((investor: User, i: number) => (
                            <Tr key={i}>
                                <Td fontFamily="inter" pl={0} py="30px">
                                    {new Date(investor?.created_at).toLocaleString('es-CL', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}
                                </Td>
                                <Td fontFamily="inter" pl={0} py="30px" w="200px">
                                    {investor?.name}
                                </Td>
                                <Td fontFamily="inter" pl={0} w="200px">
                                    {investor?.email}
                                </Td>

                                <Td fontFamily="inter" pl={0}>
                                    <FormControl display="flex" alignItems="center">
                                        <Switch
                                            size="md"
                                            onChange={() => handleStatus(investor?.id)}
                                            isChecked={investor?.active}
                                        />
                                    </FormControl>
                                </Td>

                                <Td fontFamily="inter" pl={0}>
                                    {investor?.user_pass_created ? (
                                        <Tooltip
                                            hasArrow
                                            label="Cuenta confirmada"
                                            bg="teal.500"
                                            fontFamily="inter"
                                            fontSize="14px"
                                            rounded="16px"
                                            py="4px"
                                            px="10px"
                                            direction="rtl"
                                        >
                                            <Stack bg="teal.500" w="22px" rounded="full">
                                                <Icon w="22px" h="22px" color="gray.50" as={BsCheck} />
                                            </Stack>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip
                                            hasArrow
                                            label="Cuenta pendiente"
                                            bg="gray.500"
                                            fontFamily="inter"
                                            fontSize="14px"
                                            rounded="16px"
                                            py="4px"
                                            px="10px"
                                            direction="rtl"
                                        >
                                            <Stack
                                                justify="center"
                                                align="center"
                                                bg="gray.500"
                                                w="22px"
                                                h="22px"
                                                rounded="full"
                                                px="10px"
                                            >
                                                <Icon w={3} h={3} color="gray.50" as={FaEllipsisH} />
                                            </Stack>
                                        </Tooltip>
                                    )}
                                </Td>
                                <Td fontFamily="inter" pl="0">
                                    <Button
                                        type="button"
                                        isLoading={deleteProduct}
                                        loadingText="Eliminando producto"
                                        onClick={() => handleDelete(investor.id)}
                                        variant="solid"
                                        colorScheme="red"
                                        w="fit-content"
                                        px="12px"
                                    >
                                        Eliminar cuenta
                                    </Button>
                                </Td>
                            </Tr>
                        ))
                        .slice((paginationIndex - 1) * 12, (paginationIndex - 1) * 12 + 12)}
                </Tbody>
            </Table>

            <VStack display={{ base: 'block', lg: 'none' }} w="full" align="flex-start" mt="40px">
                {investors
                    ?.map((investor: User) => (
                        <>
                            <VStack w="full" align="flex-start" pt="30px" spacing="20px">
                                <HStack w="full" align="center" justify="space-between">
                                    <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                        Nombre del inversionista
                                    </Text>

                                    <Text>{investor.name}</Text>
                                </HStack>

                                <HStack w="full" align="center" justify="space-between">
                                    <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                        Correo
                                    </Text>

                                    <Text>{investor.email}</Text>
                                </HStack>

                                <HStack w="full" align="center" justify="space-between">
                                    <Text display={{ base: 'none', sm: 'block' }} fontSize="16px">
                                        Status
                                    </Text>
                                    <FormControl display="flex" alignItems="center">
                                        <Switch
                                            onChange={() => handleStatus(investor.id)}
                                            isChecked={investor.active}
                                        />
                                    </FormControl>
                                </HStack>

                                <HStack w="full" fontFamily="inter" pl={0}>
                                    <Text>Confirmada</Text>
                                    {investor?.user_pass_created ? (
                                        <Stack bg="teal.500" w="22px" rounded="full">
                                            <Icon w="22px" h="22px" color="gray.50" as={BsCheck} />
                                        </Stack>
                                    ) : (
                                        <Stack
                                            justify="center"
                                            align="center"
                                            bg="gray.500"
                                            w="22px"
                                            h="22px"
                                            rounded="full"
                                            px="10px"
                                        >
                                            <Icon w={3} h={3} color="gray.50" as={FaEllipsisH} />
                                        </Stack>
                                    )}
                                </HStack>

                                <HStack w="full" align="center" justify="end">
                                    <Button
                                        type="button"
                                        isLoading={deleteProduct}
                                        loadingText="Eliminando producto"
                                        onClick={() => handleDelete(investor.id)}
                                        variant="solid"
                                        colorScheme="red"
                                        w="fit-content"
                                    >
                                        Eliminar cuenta
                                    </Button>
                                </HStack>
                            </VStack>

                            <Divider />
                        </>
                    ))
                    .slice((paginationIndex - 1) * 12, (paginationIndex - 1) * 12 + 12)}
            </VStack>

            <Stack align="flex-start" w="full" pt="30px">
                <Pagination
                    pages={Math.ceil((investorFilter?.length ?? 0) / 12)}
                    actualPage={1}
                    onChange={(page) => setPagination(page)}
                />
            </Stack>
        </>
    );
};

export default ListInvestorForm;
