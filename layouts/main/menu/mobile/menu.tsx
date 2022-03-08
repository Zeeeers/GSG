// Dependencies
import { Box, Button, Divider, HStack, Icon, Slide, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FaBuilding, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useMobileMenuStore } from 'stores/mainNav';

// Types
interface Props {
    onLogOut: () => void;
}

// Component
const MobileUserMenu: React.FC<Props> = ({ onLogOut }) => {
    // States
    const isOpen = useMobileMenuStore((c) => c.isOpen);
    const onToggle = useMobileMenuStore((s) => s.onToggle);

    return (
        <Slide in={isOpen} direction="left" style={{ zIndex: 30 }}>
            <VStack h="full" w="full" bgColor="white.base">
                <Box py={8} zIndex={0} />

                <Link href="/profile" passHref>
                    <HStack
                        as={Button}
                        spacing={4}
                        px={4}
                        justifyContent="left"
                        variant="ghost"
                        w="full"
                        rounded="none"
                        onClick={onToggle}
                    >
                        <Icon as={FaUser} />
                        <Text fontWeight="semibold" fontSize="xl">
                            Perfil de usuario
                        </Text>
                    </HStack>
                </Link>

                <Link href="/profile/organization" passHref>
                    <HStack
                        as={Button}
                        spacing={4}
                        px={4}
                        justifyContent="left"
                        variant="ghost"
                        w="full"
                        rounded="none"
                        onClick={onToggle}
                    >
                        <Icon as={FaBuilding} />
                        <Text fontWeight="semibold" fontSize="xl">
                            Perfil de organización
                        </Text>
                    </HStack>
                </Link>

                <Divider />

                <HStack
                    as={Button}
                    spacing={4}
                    px={4}
                    justifyContent="left"
                    variant="ghost"
                    w="full"
                    rounded="none"
                    onClick={() => {
                        onToggle();
                        onLogOut();
                    }}
                >
                    <Icon as={FaSignOutAlt} />
                    <Text fontWeight="semibold" fontSize="xl">
                        Cerrar sesión
                    </Text>
                </HStack>
            </VStack>
        </Slide>
    );
};

// Export
export default MobileUserMenu;
