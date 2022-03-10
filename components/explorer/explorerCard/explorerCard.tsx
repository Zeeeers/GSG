// Dependencies
import { Text, Box, Stack, Image, Button } from '@chakra-ui/react';
// Types
interface Props {}

// Component
const ExplorerCard: React.FC<Props> = ({}) => {
    return (
        <Box w="332px" rounded="8px" shadow="lg" overflow="hidden">
            <Image
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80"
                alt="cover"
                objectFit="cover"
                w="full"
                h="165px"
                roundedTop="18px"
            />
            <Box px="20px" py="18px">
                <Stack spacing="5px">
                    <Text fontSize="md" fontWeight="medium">
                        Unum Health
                    </Text>
                    <Text fontSize="sm" fontWeight="normal" lineHeight="5">
                        Unum Health is a Software-as-a-Service (SaaS) company offering innovative solutions to simplify
                        operations, communications, and experience in the home care industry.
                    </Text>
                </Stack>
                <Stack spacing="5px" mt="10px">
                    <Text fontSize="xs" fontWeight="normal" color="gray.400">
                        Levantamiento buscado
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                        $100.000.000
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
