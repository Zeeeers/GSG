// Dependencies
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Button,
    Flex,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Tabs,
} from '@chakra-ui/react';
import LoginOrgaForm from 'components/organization/loginOrgaForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginForm from './loginForm';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

// Component
const LoginChooseModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const router = useRouter();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
                <ModalOverlay />
                <ModalContent rounded="2xl" pt={'54px'} px="30px">
                    <ModalHeader fontSize="3xl" d="flex" textAlign="start" px={0} py={0}>
                        Ingresar
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={6} pt={0}>
                        <Text fontSize={'md'} fontWeight={'normal'} mt="7px">
                            Elige la cuenta con la que quieres ingresar
                        </Text>
                        <Tabs fontFamily="inter" fontWeight="normal" fontSize="md" isLazy>
                            <TabList
                                alignItems="flex-start"
                                borderBottom="0"
                                overflowX="auto"
                                overflowY="hidden"
                                pb="10px"
                            >
                                <Tab
                                    pr="15px"
                                    pl={0}
                                    pt="20px"
                                    borderBottom="2px"
                                    textAlign="start"
                                    alignItems="flex-start"
                                    whiteSpace="nowrap"
                                >
                                    Empresa
                                </Tab>
                                <Tab ml="15px" px={0} pt="20px" borderBottom="2px" whiteSpace="nowrap">
                                    Inversionista
                                </Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel px={0}>
                                    <LoginOrgaForm afterLogin={onClose} />

                                    <Flex flexDirection={'column'} alignItems={'center'} mt="20px">
                                        <Link href="/recovery/recoveryPassword" passHref>
                                            <Button
                                                variant="link"
                                                transitionProperty="all"
                                                transitionDuration={'slow'}
                                                colorScheme="primary"
                                                fontWeight={'normal'}
                                            >
                                                Olvidé mi contraseña
                                            </Button>
                                        </Link>
                                        <VStack spacing="10px" mt="36px">
                                            <Text fontSize={'md'} fontWeight={'normal'}>
                                                ¿Eres empresa y no tienes cuenta?
                                            </Text>
                                            <Button
                                                onClick={() => router.push('/register')}
                                                variant="outline"
                                                transitionProperty="all"
                                                transitionDuration={'slow'}
                                                colorScheme="secondary"
                                                w="320px"
                                                fontWeight={'normal'}
                                            >
                                                Registrarme
                                            </Button>
                                        </VStack>
                                    </Flex>
                                </TabPanel>
                                <TabPanel px={0}>
                                    <LoginForm afterLogin={onClose} />

                                    <Flex flexDirection={'column'} alignItems={'center'}>
                                        <Link href="/recovery/recoveryPassword" passHref>
                                            <Button
                                                variant="link"
                                                transitionProperty="all"
                                                transitionDuration={'slow'}
                                                colorScheme="primary"
                                                fontWeight="normal"
                                            >
                                                Olvidé mi contraseña
                                            </Button>
                                        </Link>
                                        <VStack spacing="7px" mt="36px">
                                            <Text fontSize={'md'} fontWeight={'normal'} fontFamily="inter">
                                                ¿Eres inversionista y no tienes cuenta?
                                            </Text>
                                            <Button variant="outline">Solicitar una invitación</Button>
                                        </VStack>
                                    </Flex>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

// Export
export default LoginChooseModal;
