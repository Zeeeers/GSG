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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useInvestorAll } from 'services/api/lib/user';
import { User } from 'services/api/types/User';

const ListInvestorForm = (props: any) => {
    const [deleteProduct, setDeleteProduct] = useState(false);
    const toast = useToast();

    const { data: investors, mutate } = useInvestorAll();

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
            <Table display={{ base: 'none', lg: 'block' }} size="lg" p={0} w="full">
                <Thead>
                    <Tr>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Creación
                        </Th>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Nombre del inversionista
                        </Th>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Correo
                        </Th>
                        <Th pl={0} fontWeight="bold" color="gray.50" border="none">
                            Status
                        </Th>
                        <Th pl={0} border="none"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {investors
                        ?.filter((investor) =>
                            investor.name.toLowerCase().includes(props.filters?.name?.toLowerCase() ?? ''),
                        )
                        .filter((investor, {}, user) =>
                            investor?.active == (props.filters?.status === '')
                                ? user
                                : investor?.active === (props?.filters?.status === 'true'),
                        )
                        .sort((a, b) => {
                            if (props.filters.last_status_updated === 'asc') {
                                //@ts-ignore
                                return new Date(b.created_at) - new Date(a.created_at);
                            } else {
                                //@ts-ignore
                                return new Date(a.created_at) - new Date(b.created_at);
                            }
                        })
                        .map((investor: User, i: number) => (
                            <Tr key={i}>
                                <Td fontFamily="inter" pl={0} py="30px">
                                    {new Date(investor?.created_at).toLocaleString('es-CL', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}
                                </Td>
                                <Td fontFamily="inter" pl={0} py="30px">
                                    {investor.name}
                                </Td>
                                <Td fontFamily="inter" pl={0}>
                                    {investor.email}
                                </Td>

                                <Td fontFamily="inter" pl={0}>
                                    <FormControl display="flex" alignItems="center">
                                        <Switch
                                            onChange={() => handleStatus(investor.id)}
                                            isChecked={investor.active}
                                        />
                                    </FormControl>
                                </Td>
                                <Td fontFamily="inter" pl={0}>
                                    <Button
                                        type="button"
                                        isLoading={deleteProduct}
                                        loadingText="Eliminando producto"
                                        onClick={() => handleDelete(investor.id)}
                                        variant="solid"
                                        colorScheme="red"
                                        w="129px"
                                        px="12px"
                                    >
                                        Eliminar cuenta
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>

            <VStack display={{ base: 'block', lg: 'none' }} w="full" align="flex-start" mt="40px">
                {investors?.map((investor: User) => (
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
                                    <Switch onChange={() => handleStatus(investor.id)} isChecked={investor.active} />
                                </FormControl>
                            </HStack>

                            <HStack w="full" align="center" justify="space-between">
                                <Stack display={{ base: 'none', sm: 'block' }} w="full"></Stack>
                                <Button
                                    type="button"
                                    isLoading={deleteProduct}
                                    loadingText="Eliminando producto"
                                    onClick={() => handleDelete(investor.id)}
                                    variant="solid"
                                    colorScheme="red"
                                >
                                    Eliminar cuenta
                                </Button>
                            </HStack>
                        </VStack>

                        <Divider />
                    </>
                ))}
            </VStack>
        </>
    );
};

export default ListInvestorForm;
