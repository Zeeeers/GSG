import { Badge, Button, CircularProgress, CircularProgressLabel, HStack, Text, VStack } from '@chakra-ui/react';
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
        <HStack bg="gray.700" p="20px" rounded="8px" mb="40px" justifyContent="space-between">
            <VStack align="flex-start" w={{ base: 'full', sm: 'fit-content' }}>
                <Badge display={{ base: 'block', md: 'none' }} colorScheme="teal" variant="solid" py="8px" px="10px">
                    {status}
                </Badge>
                <HStack spacing="30px" justify="space-between" w="full">
                    <HStack w="full">
                        <Text fontSize="24px" fontWeight="bold" fontFamily="barlow" textTransform="uppercase">
                            Mi proyecto
                        </Text>
                        <Badge
                            display={{ base: 'none', md: 'block' }}
                            colorScheme="teal"
                            variant="solid"
                            py="8px"
                            px="10px"
                        >
                            {status}
                        </Badge>
                    </HStack>
                    <CircularProgress
                        //@ts-ignore
                        value={project?.progress ?? 0}
                        display={{ base: 'block', sm: 'none' }}
                        color="teal.500"
                        size="60px"
                        thickness="4px"
                    >
                        <CircularProgressLabel fontFamily="inter" fontSize="14px">
                            {
                                //@ts-ignore
                                project?.progress ?? 0
                            }
                            %
                        </CircularProgressLabel>
                    </CircularProgress>
                </HStack>
                <Text fontFamily="inter">{project?.title}</Text>
                {project?.status === 'sketch' ? (
                    <Button
                        display={{ base: 'block', sm: 'none' }}
                        w="full"
                        bg="blue.700"
                        _hover={{ bg: 'blue.600' }}
                        h="40px"
                        variant="solid"
                        onClick={() => {
                            router.push({
                                query: { id: project?.id },
                                pathname: '/creator',
                            });
                            //@ts-ignore
                            setProject(project);
                        }}
                    >
                        Editar mi postulación
                    </Button>
                ) : (
                    <Button
                        display={{ base: 'block', sm: 'none' }}
                        bg="blue.700"
                        _hover={{ bg: 'blue.600' }}
                        h="40px"
                        variant="solid"
                        onClick={() => router.push(`/projectDetail/${project?.id}`)}
                    >
                        Ver proyecto
                    </Button>
                )}
            </VStack>
            {project?.status === 'sketch' ? (
                <HStack spacing="30px">
                    <CircularProgress
                        //@ts-ignore
                        value={project?.progress ?? 0}
                        display={{ base: 'none', sm: 'block' }}
                        color="teal.500"
                        size="60px"
                        thickness="10px"
                    >
                        <CircularProgressLabel fontFamily="inter" fontSize="14px">
                            {
                                //@ts-ignore
                                project?.progress ?? 0
                            }
                            %
                        </CircularProgressLabel>
                    </CircularProgress>

                    <Button
                        display={{ base: 'none', sm: 'block' }}
                        bg="blue.700"
                        _hover={{ bg: 'blue.600' }}
                        h="40px"
                        variant="solid"
                        onClick={() => {
                            router.push({
                                query: { id: project?.id },
                                pathname: '/creator',
                            });
                            //@ts-ignore
                            setProject(project);
                        }}
                    >
                        Editar mi postulación
                    </Button>
                </HStack>
            ) : (
                <Button
                    display={{ base: 'none', sm: 'block' }}
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
