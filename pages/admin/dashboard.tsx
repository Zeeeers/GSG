import {
    HStack,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Tabs,
    Text,
    VStack,
    Select,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    Icon,
    Divider,
} from '@chakra-ui/react';
import PrivatePage from '@clyc/next-route-manager/components/PrivatePage';
import AddInvestorForm from 'components/admin/createInvestorForm';
import ListProyectsForm from 'components/admin/listProyectsForm';
import SendMatchForm from 'components/admin/sendMatchForm';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import router from 'next/router';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Panel: NextPage = () => {
    const handleLogOut = async () => {
        const auth = (await import('@clyc/next-route-manager/libs/AuthManager')).default;
        auth.removeToken(process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!, {
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'TRUE',
        });
        router.push('/admin/login');
    };

    return (
        <>
            <NextSeo title={'Dashboard - Administrador GSG'} />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!} fallbackUrl="/admin/login" />
            <HStack position="absolute" right={60} top={'20px'} w="fit-content">
                <Menu direction="rtl">
                    {({ isOpen }) => (
                        <>
                            <MenuButton isActive={isOpen} as={Button}>
                                Admin
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleLogOut}>Cerrar sesión</MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </HStack>
            <VStack w="full" h="100vh">
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

                        <Divider />

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
                            Enviar match
                        </Tab>
                    </TabList>

                    <TabPanels pt="87px" pl={{ base: '25px', '2xl': '100px' }} overflowY="auto">
                        <TabPanel w="537px">
                            <VStack position="relative" align="start" spacing="15px" marginBottom="40px">
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

                        <TabPanel w="full" pr={{ base: '25px', '2xl': '200px' }}>
                            <HStack align="center" justifyContent="space-between">
                                <Text fontWeight="bold" fontSize="2xl" marginBottom="40px">
                                    PROYECTOS POSTULADOS
                                </Text>
                                <HStack spacing="15px">
                                    <Select variant="filled" _focus={{ color: 'white' }} h="40px">
                                        <option value="select">Filtrar por estado</option>
                                        <option value="in-review">En revisión</option>
                                        <option value="sketch">Borrador</option>
                                        <option value="published">Publicado</option>
                                        <option value="canceled">Finalizado</option>
                                    </Select>

                                    <HStack>
                                        <Input
                                            w={{ base: 'full', md: '184px' }}
                                            h="40px"
                                            variant="outline"
                                            placeholder="Buscar"
                                        />
                                        <Button
                                            variant="solid"
                                            bg="gray.600"
                                            _focus={{ outline: 'none' }}
                                            aria-label="Buscar"
                                            textColor="white"
                                            py="10px"
                                            px="16px"
                                            w="110px"
                                            h="40px"
                                        >
                                            <HStack w="full" spacing="10px">
                                                <Icon as={FaSearch} />
                                                <Text>Buscar</Text>
                                            </HStack>
                                        </Button>
                                    </HStack>
                                </HStack>
                            </HStack>
                            <ListProyectsForm />
                        </TabPanel>

                        <TabPanel w="537px">
                            <VStack position="relative" align="start" spacing="15px" marginBottom="40px">
                                <Text fontWeight="bold" fontSize="2xl">
                                    ENVIAR MATCH A UN INVERSIONISTA
                                </Text>
                                <Text fontWeight="normal" fontSize="sm" fontFamily="inter">
                                    Ingresa un correo para enviar un match.
                                </Text>
                            </VStack>

                            <SendMatchForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </>
    );
};

export default Panel;
