// Dependencies
import {
    Avatar,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useUser } from 'services/api/lib/user';
import { useOrganization } from 'services/api/lib/organization';
import InfoSkeleton from './infoForm.skeleton';

// Components
const InfoForm: React.FC = () => {
    // States
    const { data: user } = useUser();
    const { data: organization } = useOrganization();

    return user ? (
        <>
            <Flex justifyContent={{ base: 'center', md: 'space-between' }} alignItems="center" mt="60px">
                <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" alignItems={'center'}>
                    <Avatar
                        size={'lg'}
                        name={organization?.name ?? 'GSG'}
                        src={organization?.image}
                        tHeight={100}
                        tWidth={100}
                        mr={2}
                        bgColor={organization?.image ? 'transparent' : 'primary.500'}
                        color={'white'}
                    />

                    <VStack alignItems={{ base: 'center', md: 'start' }} spacing={0}>
                        <Text fontSize={'xl'} fontWeight={'medium'}>
                            {user?.name}
                        </Text>
                        <Text fontSize={'md'} fontWeight={'normal'}>
                            {user?.email}
                        </Text>
                    </VStack>
                </Stack>
            </Flex>

            <VStack alignItems={{ base: 'center', md: 'start' }} mt="50px">
                <Text fontSize={'lg'} fontWeight={'medium'}>
                    Notificaciones
                </Text>
                <FormControl orientation="vertical">
                    <HStack alignItems={{ base: 'center', md: 'start' }}>
                        <Checkbox />
                        <FormLabel fontSize={'sm'} fontWeight="medium">
                            Deseo rercibir correos con proyectos relacionados con mis intereses
                        </FormLabel>
                    </HStack>
                </FormControl>
            </VStack>
        </>
    ) : (
        <InfoSkeleton />
    );
};

// Export
export default InfoForm;
