// Dependencies
import { Text, Box, Stack, Image, Button } from '@chakra-ui/react';
import Link from 'next/link';
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
            roundedTop="18px"
            roundedBottom="8px"
            shadow="lg"
            bg="gray.800"
            overflow="hidden"
        >
            <Image
                src={project.main_image ?? 'images/earth.jpg'}
                alt="cover"
                objectFit="cover"
                w="full"
                h="165px"
                roundedTop="18px"
            />
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
                        {currencyFormat(project.finance_goal)}
                    </Text>
                </Stack>
                <Box textAlign="center" mt="13px">
                    <Link href={`/projectDetail/${project.id}`} passHref>
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
