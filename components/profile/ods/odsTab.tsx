// Dependencies
import { Stack, Text } from '@chakra-ui/react';

// Components
const OdsTab: React.FC = () => {
    return (
        <Stack w={{ lg: '500px' }}>
            <Text fontSize={'md'} fontWeight={'normal'} lineHeight={6}>
                Los intereses están basados en Objetivos y metas de desarrollo sostenible, selecciona cuales te
                interesan
            </Text>
        </Stack>
    );
};

// Export
export default OdsTab;
