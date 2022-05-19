// Dependencies
import { Button, HStack, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useOrganization } from 'services/api/lib/organization';
import { useUser } from 'services/api/lib/user';
import { HiChevronDown } from 'react-icons/hi';

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
                variant="solid"
                bg="gray.800"
                color="gray.50"
                colorScheme="basic"
                transitionProperty="background"
                transitionDuration="200ms"
                _hover={{
                    backgroundColor: 'gray.700',
                }}
                size={'md'}
                px="10px"
                py="5px"
                rounded="25px"
            >
                <HStack align="center">
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
                    <Icon w={6} h={10} color="gray.50" as={HiChevronDown} />
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
