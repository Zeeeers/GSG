// Dependencies
import { Button, HStack, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaBuilding, FaChevronDown, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useOrganization } from 'services/api/lib/organization';
import { useUser } from 'services/api/lib/user';

// Types
interface Props {
    onLogOut: () => Promise<void>;
}

// Component
const UserMenu: React.FC<Props> = ({ onLogOut }) => {
    // States
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { data: organization } = useOrganization();
    const { data: user } = useUser();

    return (
        <Menu isLazy>
            <MenuButton
                as={Button}
                isLoading={isLoggingOut}
                loadingText="Cerrando sesión"
                transition="ease-in"
                variant="ghost"
                colorScheme="basic"
                transitionProperty="background"
                transitionDuration="200ms"
                _hover={{
                    backgroundColor: 'gray.100',
                }}
                size={'lg'}
                px={6}
            >
                <HStack align="center" mr={4}>
                    <Avatar
                        size="sm"
                        name={organization?.name ?? 'Skala'}
                        src={organization?.image}
                        alt={organization?.name ?? ''}
                        tHeight={100}
                        tWidth={100}
                        mr={2}
                        icon={<></>}
                        bgColor={organization?.image ? 'transparent' : 'primary.500'}
                        color={'white.base'}
                    />

                    <Text as="span" fontWeight="normal" color="white.base">
                        {user?.name}
                    </Text>
                </HStack>
            </MenuButton>

            <MenuList w="full" shadow="md">
                <MenuItem
                    fontWeight="semibold"
                    onClick={() => {
                        router.push('/profile');
                    }}
                >
                    Mi perfil
                </MenuItem>

                <MenuDivider />

                <MenuItem
                    fontWeight="semibold"
                    onClick={async () => {
                        setIsLoggingOut(true);
                        await onLogOut();
                        setIsLoggingOut(false);
                    }}
                >
                    Cerrar sesión
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

// Export
export default UserMenu;
