// Dependencies
import {
    Button,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { HiChevronDown } from 'react-icons/hi';
import { RiLogoutBoxRLine, RiUser3Fill } from 'react-icons/ri';
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
    const { data: user } = useUser();
    const { data: orga } = useOrganization(true);

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
                        //@ts-ignore
                        src={user?.user?.organization?.image ?? orga?.image}
                        name={user?.user?.name ?? 'GSG'}
                        height="32px"
                        width="32px"
                        mr="10px"
                        icon={<></>}
                        //@ts-ignore
                        bgColor={user?.user?.organization?.image ? 'transparent' : 'teal.400'}
                        color={'white'}
                    />

                    <Text
                        as="span"
                        fontWeight="normal"
                        fontSize="md"
                        fontFamily="inter"
                        color="white.base"
                        overflow="hidden"
                        maxW={{ base: '55px', sm: 'full' }}
                    >
                        {user?.user?.name}
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
                        router.push({ pathname: '/profile', query: { tab: 0 } });
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
                    onClick={() => {
                        router.push({ pathname: '/profile', query: { tab: 1 } });
                    }}
                >
                    <HStack spacing="14px">
                        <Icon w={5} h={5} color="gray.50" as={BsHeartFill} />
                        <Text>Mis intereses</Text>
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
