// Dependencies
import { Flex } from '@chakra-ui/react';

// Component
const SideBackground: React.FC = ({ children }) => {
    return (
        <Flex bgColor="primary.100" height={'100%'} w={7 / 12} position="relative" right={0}>
            {children}
        </Flex>
    );
};

// Export
export default SideBackground;
