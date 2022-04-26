// Dependencies
import { Icon, IconButton } from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useMobileMenuStore } from 'stores/mainNav';

// Component
const MobileUserMenuButton: React.FC = () => {
    // States
    const isOpen = useMobileMenuStore((c) => c.isOpen);
    const onToggle = useMobileMenuStore((c) => c.onToggle);

    return (
        <IconButton
            icon={<Icon as={isOpen ? FaTimes : FaBars} />}
            aria-label="Menu de usuario"
            rounded="6px"
            px="8px"
            py="8px"
            onClick={() => onToggle()}
        />
    );
};

// Export
export default MobileUserMenuButton;
