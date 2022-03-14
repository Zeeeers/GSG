// Dependencies
import { Text, Box, Stack, Image, Button } from '@chakra-ui/react';
import { Gsg } from 'services/api/types/Gsg';
// Types
interface Props {
    project: Gsg;
}

// Component
const ExplorerCard: React.FC<Props> = ({ project }) => {
    return (
        <Box w="332px" rounded="8px" shadow="lg" overflow="hidden">
            <Image src={project.main_image} alt="cover" objectFit="cover" w="full" h="165px" roundedTop="18px" />
            <Box px="20px" py="18px">
                <Stack spacing="5px">
                    <Text fontSize="md" fontWeight="medium">
                        {project.title}
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" lineHeight="5">
                        {project.description}
                    </Text>
                </Stack>
                <Stack spacing="5px" mt="10px">
                    <Text fontSize="xs" fontWeight="normal" color="gray.400">
                        {project.business_name}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                        {project.finance_goal}
                    </Text>
                </Stack>
                <Box textAlign="center" mt="13px">
                    <Button variant="solid" colorScheme="basic" h="32px" w="full">
                        Ver proyecto
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

// Export
export default ExplorerCard;
