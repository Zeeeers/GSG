import { Badge, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { GsgFormated } from 'services/api/types/Gsg';
import { useDraftStore } from 'stores/draftProject';

type StatusProps = {
    project: GsgFormated;
};
const StatusProject: React.FC<StatusProps> = ({ project }) => {
    let status = undefined;
    switch (project?.status) {
        case 'in-review':
            status = 'En revisión';
            break;

        case 'sketch':
            status = 'En borrador';
            break;

        case 'published':
            status = 'Publicado';
            break;

        case 'canceled':
            status = 'Finalizado';
            break;

        default:
            status;
            break;
    }

    const setProject = useDraftStore((s) => s.setProject);

    const router = useRouter();
    return (
        <HStack bg="gray.700" p="20px" rounded="8px" w="full" mb="40px" justifyContent="space-between">
            <VStack align="flex-start">
                <HStack spacing="30px">
                    <Text fontSize="24px" fontWeight="bold" fontFamily="barlow" textTransform="uppercase">
                        Mi proyecto
                    </Text>
                    <Badge colorScheme="teal" variant="solid" py="8px" px="10px">
                        {status}
                    </Badge>
                </HStack>
                <Text fontFamily="inter">{project?.title}</Text>
            </VStack>
            {project?.status === 'sketch' ? (
                <Button
                    bg="blue.700"
                    _hover={{ bg: 'blue.600' }}
                    h="40px"
                    variant="solid"
                    onClick={() => {
                        router.push(`/`);
                        //@ts-ignore
                        setProject(project);
                    }}
                >
                    Editar mi postulación
                </Button>
            ) : (
                <Button
                    bg="blue.700"
                    _hover={{ bg: 'blue.600' }}
                    h="40px"
                    variant="solid"
                    onClick={() => router.push(`/projectDetail/${project?.id}`)}
                >
                    Ver proyecto
                </Button>
            )}
        </HStack>
    );
};

export default StatusProject;
