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
            <Flex justifyContent={'space-between'} mt="60px">
                <Stack direction={'row'}>
                    <VStack>
                        <Avatar
                            size="lg"
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

                        <Text fontSize={'xs'} fontWeight={'semibold'}>
                            Cambiar foto perfil
                        </Text>
                    </VStack>

                    <VStack alignItems={'start'} spacing={0}>
                        <Text fontSize={'xl'} fontWeight={'medium'}>
                            {user?.name}
                        </Text>
                        <Text fontSize={'md'} fontWeight={'normal'}>
                            {user?.email}
                        </Text>
                    </VStack>
                </Stack>

                <Button>Editar mis datos</Button>
            </Flex>

            <VStack alignItems={'start'} mt="22px">
                <Text fontSize={'lg'} fontWeight={'medium'}>
                    Notificaciones
                </Text>
                <FormControl orientation="vertical">
                    <HStack>
                        <Checkbox />
                        <FormLabel fontSize={'sm'} fontWeight="medium">
                            Deseo rercibir correos con proyectos rerlacionados con mis intereses
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
