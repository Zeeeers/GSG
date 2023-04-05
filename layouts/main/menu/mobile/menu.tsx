// Dependencies
import { Box, Button, Slide, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from 'services/api/lib/user';
import { useMobileMenuStore } from 'stores/mainNav';

// Types
interface Props {
    onLogOut: () => void;
}

// Component
const MobileUserMenu: React.FC<Props> = () => {
    // States
    const isOpen = useMobileMenuStore((c) => c.isOpen);
    const setIsOpen = useMobileMenuStore((c) => c.onToggle);
    const router = useRouter();
    const { data: user } = useUser();

    return !user?.user ? (
        <Slide in={isOpen} direction="left" style={{ zIndex: 40 }}>
            <VStack spacing="20px" align="flex-start" h="full" w="full" bgColor="gray.700" px="24px">
                <Box py="60px" zIndex={0} />

                <Button w="full" variant="outline" onClick={() => router.push('/register')}>
                    ¿Eres empresa? levantar capital
                </Button>
                <Button
                    w="full"
                    onClick={() => router.push('/login').then(() => setIsOpen())}
                    variant="solid"
                    _focus={{ outline: 'none' }}
                    aria-label="Buscar"
                    textColor="white"
                    py="10px"
                    px="16px"
                >
                    Ingresar
                </Button>
            </VStack>
        </Slide>
    ) : null;
};

// Export
export default MobileUserMenu;
