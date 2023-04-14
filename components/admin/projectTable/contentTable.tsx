import {
    Tr,
    Td,
    Tooltip,
    Text,
    Stack,
    HStack,
    Link,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { Gsg } from 'services/api/types/Gsg';
import SelectComponent from './selectComponenet';

interface ContentTableProps {
    proyect: Gsg;
    handleStatus: (id: number, e: ChangeEvent) => void;
    mutate: () => void;
}

const ContentTable = ({ proyect, handleStatus, mutate }: ContentTableProps) => {
    const [deleteProduct, setDeleteProduct] = useState(false);
    const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

    const toast = useToast();
    const cancelRef = useRef(null);

    const handleDelete = async () => {
        setDeleteProduct(true);
        const { deleteGsgProject } = await import('../../../services/api/lib/gsg');
        const { ok } = await deleteGsgProject(proyect?.id);

        if (ok) {
            setDeleteProduct(false);
            mutate();
            onCloseConfirm();
            toast({
                title: `El Proyecto ${proyect?.title} ha sido eliminado correctamente`,
                status: 'success',
                duration: 6000,
                position: 'top-right',
            });
        } else {
            toast({
                title: 'Ha ocurrido un error',
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
                <Td fontFamily="inter" pl={0} maxW="100px" overflow="hidden" textOverflow="ellipsis">
                    <Tooltip label={proyect?.organization.name} bg="gray.700" hasArrow>
                        <Text overflow="hidden" textOverflow="ellipsis">
                            {proyect?.organization.name}
                        </Text>
                    </Tooltip>
                </Td>
                <Td fontFamily="inter" p={0} maxW="100" m={0}>
                    <Stack
                        py="4px"
                        px="10px"
                        w="fit-content"
                        h="29px"
                        bg={
                            proyect?.current_goal === 'visibility'
                                ? proyect?.fundraising_start_month
                                    ? new Date(proyect?.fundraising_start_month) < new Date()
                                        ? 'red.500'
                                        : 'blue.500'
                                    : 'gray.800'
                                : 'gray.800'
                        }
                        rounded="8px"
                    >
                        <Text fontSize="15px" fontFamily="inter">
                            {proyect?.current_goal === 'visibility' ? 'Visibilidad' : 'Financiamiento'}
                        </Text>
                    </Stack>
                </Td>

                <Td fontFamily="inter" pl="40px" maxW="200px">
                    <SelectComponent project={proyect} handleStatus={handleStatus} />
                </Td>
                <Td fontFamily="inter" pl="50px">
                    <HStack spacing="20px">
                        <Link
                            href={`/project/${proyect?.id}-${proyect?.title.toLowerCase().replaceAll(' ', '-')}`}
                            target="_blank"
                        >
                            <Button variant="solid">Ver proyecto</Button>
                        </Link>
                        <Button type="button" onClick={onOpenConfirm} variant="solid" colorScheme="red">
                            Eliminar
                        </Button>
                    </HStack>
                </Td>
            </Tr>

            {isOpenConfirm && (
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpenConfirm} onClose={onCloseConfirm} isCentered>
                    <AlertDialogOverlay>
                        <AlertDialogContent rounded="16px">
                            <AlertDialogHeader
                                textTransform="uppercase"
                                fontSize="24px"
                                fontWeight="bold"
                                pt="32px"
                                pb="8px"
                                px="25px"
                            >
                                Eliminar proyecto
                            </AlertDialogHeader>

                            <AlertDialogBody px="25px" fontSize="16px" fontFamily="inter" lineHeight="140%">
                                ¿Estas seguro que deseas eliminar el proyecto{' '}
                                <Text as="span" fontFamily="inter" borderBottom="1px solid" fontWeight="medium">
                                    {proyect?.title}
                                </Text>
                                ? Esta acción no se puede deshacer.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button
                                    ref={cancelRef}
                                    variant="outline"
                                    border="2px solid"
                                    borderColor="gray.600"
                                    px="12px"
                                    fontSize="16px"
                                    fontWeight="normal"
                                    onClick={onCloseConfirm}
                                    _hover={{ borderColor: 'gray.600', bg: 'gray.600', color: 'white' }}
                                >
                                    Salir
                                </Button>
                                <Button
                                    variant="solid"
                                    colorScheme="red"
                                    onClick={handleDelete}
                                    ml={3}
                                    fontSize="16px"
                                    fontWeight="normal"
                                    isLoading={deleteProduct}
                                    loadingText=""
                                >
                                    Eliminar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    );
};

export default ContentTable;
