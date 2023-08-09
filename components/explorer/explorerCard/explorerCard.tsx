// Dependencies
import { Avatar, Box, Button, HStack, Image, Img, Link, Stack, Text, Tooltip, VStack } from '@chakra-ui/react';
import Stage from 'components/projectDetail/formatText/stage';
import { Gsg } from 'services/api/types/Gsg';
import { User } from 'services/api/types/User';

// Types
interface Props {
    project: Gsg;
    user: User;
}

// Component
const ExplorerCard: React.FC<Props> = ({ project, user }) => {
    return (
        <Box
            w={{ base: 'full', lg: '332px' }}
            h="448px"
            roundedTop="18px"
            roundedBottom="8px"
            shadow="lg"
            bg="gray.800"
            overflow="hidden"
            _hover={{ bg: 'gray.700' }}
            transitionProperty="common"
            transitionDuration="normal"
        >
            <VStack pos="relative">
                <Image
                    src={project?.main_image ?? 'images/earth.jpg'}
                    alt="cover"
                    objectFit="cover"
                    w="full"
                    h="165px"
                    roundedTop="18px"
                />

                {user && project?.accelerator?.id && (
                    <HStack
                        pos="absolute"
                        bottom={0}
                        w="full"
                        h="49px"
                        bg="rgba(4, 145, 216, 0.5)"
                        roundedTop="12px"
                        zIndex={1}
                        backdropFilter="blur(2.5px)"
                        px="15px"
                        py="8px"
                        spacing="10px"
                    >
                        <Stack pos="relative">
                            <Avatar src={project?.accelerator?.icon} w="32px" h="32px" />
                            <Image
                                src="/images/icons/checked.svg"
                                alt="check"
                                pos="absolute"
                                right="-4px"
                                bottom="0"
                                w="13px"
                                h="13px"
                            />
                        </Stack>
                        <Text fontFamily="barlow" fontSize="14px" lineHeight="140%">
                            Recomendado por{' '}
                            <Text as="span" fontWeight="bold" textTransform="uppercase">
                                {project?.accelerator?.name ?? 'aceleradora'}
                            </Text>
                        </Text>
                    </HStack>
                )}
            </VStack>
            <Box display={'flex'} flexDirection="column" justifyContent={'space-between'} h="283px" px="20px" py="18px">
                <VStack align="flex-start">
                    <HStack w="full" justify="space-between">
                        <HStack>
                            {project?.capital_stage && (
                                <HStack
                                    display="flex"
                                    justifyContent="center"
                                    rounded="6px"
                                    px="8px"
                                    py="2px"
                                    fontSize="sm"
                                    fontWeight="medium"
                                    bg="green.100"
                                    color="green.800"
                                    fontFamily="inter"
                                >
                                    <Text>{Stage(project?.capital_stage)}</Text>
                                </HStack>
                            )}

                            {!project?.debt ||
                                (project?.debt !== 'other' && (
                                    <HStack
                                        display="flex"
                                        justifyContent="center"
                                        rounded="6px"
                                        px="8px"
                                        py="2px"
                                        fontSize="sm"
                                        fontWeight="medium"
                                        bg="green.100"
                                        color="green.800"
                                        fontFamily="inter"
                                    >
                                        <Text>{Stage(project?.debt)}</Text>
                                    </HStack>
                                ))}
                        </HStack>

                        {user && (
                            <Tooltip label="Inversionistas interesados" background="gray.600" hasArrow>
                                <HStack align="center" spacing="5px" userSelect="none">
                                    <Img src="/images/icons/interest.svg" />
                                    <Text fontSize="16px" color="gray.200" fontWeight="500" fontFamily="inter">
                                        {project?.relations?.interests}
                                    </Text>
                                </HStack>
                            </Tooltip>
                        )}
                    </HStack>

                    <Stack spacing="5px" mt="10px">
                        <Text fontSize="xl" fontWeight="semibold" noOfLines={2}>
                            {project?.title}
                        </Text>
                        <Text
                            as="p"
                            fontSize="15px"
                            fontFamily="inter"
                            fontWeight="normal"
                            lineHeight="20px"
                            noOfLines={5}
                        >
                            {project?.description}
                        </Text>
                    </Stack>
                </VStack>

                <Box display={'flex'} flexDirection="column" textAlign="center" w="full" mt="13px">
                    <Link
                        href={`/project/${project?.id}-${project?.title.toLowerCase().replaceAll(' ', '-')}`}
                        target="_blank"
                    >
                        <Button variant="solid" h="32px" w="full">
                            Ver proyecto
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

// Export
export default ExplorerCard;
