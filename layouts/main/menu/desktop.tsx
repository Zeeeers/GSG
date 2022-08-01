// Dependencies
import { Button, HStack, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Avatar from '@clyc/optimized-image/components/chakraAvatar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useOrganization } from 'services/api/lib/organization';
import { useUser } from 'services/api/lib/user';
import { HiChevronDown } from 'react-icons/hi';
import { RiLogoutBoxRLine, RiUser3Fill } from 'react-icons/ri';

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
                h="42px"
                rounded="25px"
            >
                <HStack align="center" spacing={0} py="10px">
                    <Avatar
                        size="sm"
                        name={organization?.name ?? 'GSG'}
                        src={organization?.image}
                        alt={organization?.name ?? ''}
                        tHeight={32}
                        tWidth={32}
                        mr="10px"
                        icon={<></>}
                        bgColor={organization?.image ? 'transparent' : 'primary.500'}
                        color={'white.base'}
                    />

                    <Text as="span" fontWeight="normal" fontSize="md" fontFamily="inter" color="white.base">
                        {user?.name}
                    </Text>
                    <Icon w={6} h={10} color="gray.50" as={HiChevronDown} />
                </HStack>
            </MenuButton>

            <MenuList w="full" shadow="md" py="23px" px="15px">
                <MenuItem
                    fontWeight="normal"
                    fontSize="md"
                    fontFamily="inter"
                    onClick={() => {
                        router.push('/profile');
                    }}
                >
                    <HStack spacing="14px">
                        <Icon w={6} h={6} color="gray.50" as={RiUser3Fill} />
                        <Text>Mi perfil</Text>
                    </HStack>
                </MenuItem>

                <MenuDivider />

                <MenuItem
                    fontWeight="normal"
                    fontSize="md"
                    fontFamily="inter"
                    onClick={async () => {
                        setIsLoggingOut(true);
                        await onLogOut();
                        setIsLoggingOut(false);
                    }}
                >
                    <HStack spacing="14px">
                        <Icon w={6} h={6} color="gray.50" as={RiLogoutBoxRLine} />
                        <Text>Cerrar Sesión</Text>
                    </HStack>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

// Export
export default UserMenu;
