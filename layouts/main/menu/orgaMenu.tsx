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
    Stack,
    Text,
    Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { RiLogoutBoxRLine, RiUser3Fill } from 'react-icons/ri';
import { useOrganization } from 'services/api/lib/organization';

// Types
interface Props {
    onLogOut: () => Promise<void>;
}

// Component
const OrgaMenu: React.FC<Props> = ({ onLogOut }) => {
    // States
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { data: organization } = useOrganization(true);

    const router = useRouter();

    return (
        <Menu isLazy>
            <MenuButton
                as={Button}
                isLoading={isLoggingOut}
                loadingText="Cerrando sesión"
                transition="ease-in"
                variant="solid"
                bg={{ base: 'gray.900', md: 'gray.800' }}
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
                        name={organization?.name}
                        src={organization?.image}
                        h="32px"
                        w="32px"
                        mr="10px"
                        icon={<></>}
                        bgColor={organization?.image ? 'transparent' : 'blue.700'}
                        color={'white'}
                    />

                    <Text as="span" fontWeight="normal" fontSize="md" fontFamily="inter" color="white.base">
                        {organization?.name ?? 'GSG'}
                    </Text>
                    <Icon w={6} h={10} color="gray.50" as={HiChevronDown} />
                </HStack>
            </MenuButton>

            <MenuList w="230px" shadow="md" py="23px" px="15px" borderRadius="8px" bg="gray.700">
                <Stack w="full" align="center">
                    <Avatar
                        size="lg"
                        name={organization?.name ?? 'GSG'}
                        src={organization?.image}
                        h="48px"
                        w="48px"
                        mr="10px"
                        icon={<></>}
                        bgColor={organization?.image ? 'transparent' : 'blue.700'}
                        color={'white'}
                    />
                    <Text fontSize="16px" fontFamily="inter" fontWeight="medium">
                        {organization?.name ?? 'GSG'}
                    </Text>
                </Stack>

                <MenuDivider py="5px" />

                <MenuItem
                    fontWeight="normal"
                    fontSize="md"
                    fontFamily="inter"
                    onClick={() => {
                        router.push({ pathname: '/profile/organization' });
                    }}
                    _hover={{ bg: 'gray.600' }}
                    rounded="4px"
                >
                    <HStack spacing="14px">
                        <Icon w={5} h={5} color="gray.50" as={RiUser3Fill} />
                        <Text>Mi perfil</Text>
                    </HStack>
                </MenuItem>

                <MenuItem
                    mt="14px"
                    fontWeight="normal"
                    fontSize="md"
                    fontFamily="inter"
                    onClick={async () => {
                        setIsLoggingOut(true);
                        await onLogOut();
                        setIsLoggingOut(false);
                    }}
                    _hover={{ bg: 'gray.600' }}
                    rounded="4px"
                >
                    <HStack spacing="14px">
                        <Icon w={5} h={5} color="gray.50" as={RiLogoutBoxRLine} />
                        <Text>Cerrar Sesión</Text>
                    </HStack>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

// Export
export default OrgaMenu;
