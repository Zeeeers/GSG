import { Badge, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const StatusProject = () => {
    return (
        <HStack bg="gray.700" p="20px" rounded="8px" w="full" mb="40px" justifyContent="space-between">
            <VStack align="flex-start">
                <HStack spacing="30px">
                    <Text fontSize="24px" fontWeight="bold" fontFamily="barlow" textTransform="uppercase">
                        Mi proyecto
                    </Text>
                    <Badge colorScheme="teal" variant="solid" py="8px" px="10px">
                        En borrador
                    </Badge>
                </HStack>
                <Text fontFamily="inter">Northstar Technologies Group, Inc.</Text>
            </VStack>
            <Button h="40px" variant="solid">
                Ver proyecto
            </Button>
        </HStack>
    );
};

export default StatusProject;
