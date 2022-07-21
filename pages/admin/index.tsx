//@ts-nocheck
import {
    HStack,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Tabs,
    Text,
    VStack,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Badge,
    Select,
    Button,
} from '@chakra-ui/react';
import AddInvestorForm from 'components/admin/AddInvestorForm';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const Panel: NextPage = () => {
    return (
        <>
            <NextSeo title={'Dashboard - Administrador CompanyPitch'} />
            <HStack w="full" h="100vh">
                <Tabs h="full" w="full" bg="gray.900" orientation="vertical">
                    <TabList bg="gray.800" border="none" w="339px">
                        <VStack align="start" pt="87px" pb="30px" px="30px">
                            <Text fontSize="xl" fontWeight="bold">
                                PANEL
                            </Text>
                        </VStack>

                        <Tab
                            fontFamily="inter"
                            justifyContent="flex-start"
                            _selected={{
                                border: 'none',
                                color: 'primary.600',
                                fontWeight: 'bold',
                                borderRadius: 'none',
                                background: 'gray.800',
                            }}
                            _focus={{
                                border: 'none',
                            }}
                            _checked={{ border: 'none' }}
                            fontWeight="normal"
                            border="none"
                            fontSize="md"
                            pl={6}
                            py="15px"
                        >
                            Nuevo inversionista
                        </Tab>
                        <Tab
                            fontFamily="inter"
                            justifyContent="flex-start"
                            border="none"
                            _selected={{
                                border: 'none',
                                color: 'primary.600',
                                fontWeight: 'bold',
                                borderRadius: 'none',
                            }}
                            _focus={{
                                border: 'none',
                            }}
                            fontWeight="normal"
                            fontSize="md"
                            pl={6}
                            py="15px"
                        >
                            Proyectos postulados
                        </Tab>
                    </TabList>

                    <TabPanels pt="87px" pl="100px" overflowY="auto">
                        <TabPanel w="537px">
                            <VStack align="start" spacing="15px" marginBottom="40px">
                                <Text fontWeight="bold" fontSize="2xl">
                                    AGREGAR UN NUEVO INVERSIONISTA
                                </Text>
                                <Text fontWeight="normal" fontSize="sm" fontFamily="inter">
                                    La invitación será enviada al correo del inversionista, quien deberá activar su
                                    cuenta por medio del link presente dentro de este.
                                </Text>
                            </VStack>

                            <AddInvestorForm />
                        </TabPanel>

                        <TabPanel>
                            <Text fontWeight="bold" fontSize="2xl" marginBottom="40px">
                                PROYECTOS POSTULADOS
                            </Text>

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
                                    <Tr>
                                        <Td pl={0} py="30px" fontFamily="inter">
                                            Northstar Technologies Group
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
                                                Pre-seed
                                            </Badge>
                                        </Td>
                                        <Td fontFamily="inter" pl={0}>
                                            <Select variant="filled" _focus={{ color: 'white' }}>
                                                <option value="option1">Completado</option>
                                                <option value="option2">Finalizado</option>
                                                <option value="option3">En revisión</option>
                                            </Select>
                                        </Td>
                                        <Td fontFamily="inter" pl={0}>
                                            <HStack spacing="20px">
                                                <Button variant="solid">Ver proyecto</Button>
                                                <Button variant="solid" colorScheme="red">
                                                    Eliminar
                                                </Button>
                                            </HStack>
                                        </Td>
                                    </Tr>

                                    <Tr>
                                        <Td fontFamily="inter" pl={0} py="30px">
                                            Northstar Technologies Group
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
                                                Seed
                                            </Badge>
                                        </Td>
                                        <Td fontFamily="inter" pl={0}>
                                            <Select defaultValue="option2" variant="filled" _focus={{ color: 'white' }}>
                                                <option value="option1">Completado</option>
                                                <option value="option2">Finalizado</option>
                                                <option value="option3">En revisión</option>
                                            </Select>
                                        </Td>
                                        <Td fontFamily="inter" pl={0}>
                                            <HStack spacing="20px">
                                                <Button variant="solid">Ver proyecto</Button>
                                                <Button variant="solid" colorScheme="red">
                                                    Eliminar
                                                </Button>
                                            </HStack>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </HStack>
        </>
    );
};

export default Panel;
