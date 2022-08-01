// Dependencies
import { Box, Button, HStack, Icon, Slide, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useMobileMenuStore } from 'stores/mainNav';
//import { useUser } from '../../../../services/api/lib/user';

// Types
interface Props {
    onLogOut: () => void;
}

// Component
const MobileUserMenu: React.FC<Props> = ({ onLogOut }) => {
    // States
    const isOpen = useMobileMenuStore((c) => c.isOpen);
    const onToggle = useMobileMenuStore((s) => s.onToggle);
    //const { data: user } = useUser();

    return (
        <Slide in={isOpen} direction="left" style={{ zIndex: 30 }}>
            <VStack h="full" w="full" bgColor="gray.700">
                <Box py={8} zIndex={0} />

                <Link href="/profile" passHref>
                    <HStack
                        as={Button}
                        spacing={4}
                        px={4}
                        justifyContent="left"
                        variant="ghost"
                        color="white"
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

                <HStack
                    as={Button}
                    spacing={4}
                    px={4}
                    justifyContent="left"
                    variant="ghost"
                    color="white"
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
