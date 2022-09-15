// Dependencies

//@ts-nocheck
import { Box, Button, HStack, Image, Link, Stack, Text, VStack } from '@chakra-ui/react';
import Stage from 'components/projectDetail/formatText/stage';
import { Gsg } from 'services/api/types/Gsg';

// Types
interface Props {
    project: Gsg;
}

// Component
const ExplorerCard: React.FC<Props> = ({ project }) => {
    const currencyFormat = (num: number) => {
        return '$' + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };

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
            <Image
                src={project.main_image ?? 'images/earth.jpg'}
                alt="cover"
                objectFit="cover"
                w="full"
                h="165px"
                roundedTop="18px"
            />
            <Box display={'flex'} flexDirection="column" justifyContent={'space-between'} h="283px" px="20px" py="18px">
                <VStack align="flex-start">
                    <HStack>
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
                            <Text>{Stage(project.capital_stage)}</Text>
                        </HStack>

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

                    <Stack spacing="5px" mt="10px">
                        <Text fontSize="xl" fontWeight="semibold" noOfLines={2}>
                            {project.title}
                        </Text>
                        <Text
                            as="p"
                            fontSize="15px"
                            fontFamily="inter"
                            fontWeight="normal"
                            lineHeight="20px"
                            noOfLines={5}
                        >
                            {project.description}
                        </Text>
                    </Stack>
                </VStack>

                <Box display={'flex'} flexDirection="column" textAlign="center" w="full" mt="13px">
                    <Link href={`/projectDetail/${project.id} `} target="_blank" passHref>
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
