import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Icon,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Select,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import PrivatePage from '@clyc/next-route-manager/components/PrivatePage';
import AddInvestorForm from 'components/admin/createInvestorForm';
import ListProyectsForm from 'components/admin/listProyectsForm';
import SendMatchForm from 'components/admin/sendMatchForm';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import router from 'next/router';
import React, { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';

const Panel: NextPage = () => {
    const [page, setPage] = useState(0);

    const { isOpen, onOpen, onClose } = useDisclosure();

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

            <VStack position="relative" w="full" h="100vh">
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay backdropFilter="auto" backdropBrightness="40%" />
                    <DrawerContent bg="gray.800">
                        <DrawerCloseButton />
                        <DrawerHeader>Panel</DrawerHeader>

                        <DrawerBody>
                            <VStack align="flex-start" spacing="15px">
                                <Button fontWeight={`${page === 0 ? 'bold' : 'normal'}`} onClick={() => setPage(0)}>
                                    Nuevo inversionista
                                </Button>
                                <Button fontWeight={`${page === 1 ? 'bold' : 'normal'}`} onClick={() => setPage(1)}>
                                    Proyectos postulados
                                </Button>

                                <Divider />

                                <Button fontWeight={`${page === 2 ? 'bold' : 'normal'}`} onClick={() => setPage(2)}>
                                    Enviar match
                                </Button>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <Tabs
                    h="full"
                    w="full"
                    bg="gray.900"
                    orientation="vertical"
                    index={page}
                    onChange={(index) => setPage(index)}
                    overflow="hidden"
                >
                    <TabList
                        display={{ base: 'none', xl: 'block' }}
                        bg="gray.800"
                        border="none"
                        w={{ base: 'full', xl: '339px' }}
                    >
                        <VStack align="start" pt="87px" pb="30px" px="30px" w="full">
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

                    <TabPanels pl={{ base: '25px', '2xl': '100px' }} overflowY="auto" w="full">
                        <TabPanel pr={{ base: '25px', '2xl': '200px' }}>
                            <VStack>
                                <HStack
                                    w="full"
                                    justify={{ base: 'space-between', xl: 'flex-end' }}
                                    align="center"
                                    h="fit-content"
                                >
                                    <Stack display={{ base: 'block', xl: 'none' }}>
                                        <Button onClick={onOpen} leftIcon={<FaBars />}></Button>
                                    </Stack>
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

                                <VStack
                                    w="full"
                                    pt="87px"
                                    position="relative"
                                    align="flex-start"
                                    justify="flex-start"
                                    spacing="15px"
                                    marginBottom="40px"
                                >
                                    <Text w={{ base: 'full', md: '537px' }} fontWeight="bold" fontSize="2xl">
                                        AGREGAR UN NUEVO INVERSIONISTA
                                    </Text>
                                    <Text
                                        w={{ base: 'full', md: '537px' }}
                                        fontWeight="normal"
                                        fontSize="sm"
                                        fontFamily="inter"
                                    >
                                        La invitación será enviada al correo del inversionista, quien deberá activar su
                                        cuenta por medio del link presente dentro de este.
                                    </Text>

                                    <AddInvestorForm />
                                </VStack>
                            </VStack>
                        </TabPanel>

                        <TabPanel pr={{ base: '25px', '2xl': '200px' }}>
                            <VStack w="full">
                                <HStack
                                    w="full"
                                    justify={{ base: 'space-between', xl: 'flex-end' }}
                                    align="center"
                                    h="fit-content"
                                >
                                    <Stack display={{ base: 'block', xl: 'none' }}>
                                        <Button onClick={onOpen} leftIcon={<FaBars />}></Button>
                                    </Stack>
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

                                <Stack
                                    pt="40px"
                                    w="full"
                                    direction={{ base: 'column', lg: 'row' }}
                                    align={{ base: 'flex-start', lg: 'center' }}
                                    justifyContent="space-between"
                                >
                                    <Text fontWeight="bold" fontSize="2xl" marginBottom="40px">
                                        PROYECTOS POSTULADOS
                                    </Text>

                                    <Stack direction={{ base: 'column', md: 'row' }} w="fit-content" spacing="15px">
                                        <Select w="fit-content" variant="filled" _focus={{ color: 'white' }} h="40px">
                                            <option value="select">Filtrar por estado</option>
                                            <option value="in-review">En revisión</option>
                                            <option value="sketch">Borrador</option>
                                            <option value="published">Publicado</option>
                                            <option value="canceled">Finalizado</option>
                                        </Select>

                                        <HStack w="fit-content">
                                            <Input
                                                w={{ base: 'full', md: '184px' }}
                                                h="40px"
                                                variant="outline"
                                                placeholder="Buscar"
                                            />

                                            <Button
                                                w="fit-content"
                                                variant="solid"
                                                bg="gray.600"
                                                _focus={{ outline: 'none' }}
                                                aria-label="Buscar"
                                                textColor="white"
                                                py="6px"
                                                px="12px"
                                                h="40px"
                                            >
                                                <HStack w="fit-content" py="6px" px="12px" spacing="10px">
                                                    <Icon as={FaSearch} />
                                                    <Text>Buscar</Text>
                                                </HStack>
                                            </Button>
                                        </HStack>
                                    </Stack>
                                </Stack>
                                <ListProyectsForm />
                            </VStack>
                        </TabPanel>

                        <TabPanel pr={{ base: '25px', '2xl': '200px' }}>
                            <VStack w="full">
                                <HStack
                                    w="full"
                                    justify={{ base: 'space-between', xl: 'flex-end' }}
                                    align="center"
                                    h="fit-content"
                                >
                                    <Stack display={{ base: 'block', xl: 'none' }}>
                                        <Button onClick={onOpen} leftIcon={<FaBars />}></Button>
                                    </Stack>
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
                                <VStack
                                    w="full"
                                    position="relative"
                                    align="flex-start"
                                    spacing="15px"
                                    pb="40px"
                                    pt="40px"
                                >
                                    <Text fontWeight="bold" fontSize="2xl">
                                        ENVIAR MATCH A UN INVERSIONISTA
                                    </Text>
                                    <Text fontWeight="normal" fontSize="sm" fontFamily="inter">
                                        Ingresa un correo para enviar un match.
                                    </Text>
                                </VStack>

                                <SendMatchForm />
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </>
    );
};

export default Panel;
