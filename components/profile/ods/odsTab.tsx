// Dependencies
import { Stack, Text } from '@chakra-ui/react';
import SelectOds from 'common/selectOds';

// Components
const OdsTab: React.FC = () => {
    return (
        <Stack w={{ lg: '500px' }} spacing="40px">
            <Text fontSize={'md'} fontWeight={'normal'} lineHeight={6} mt="16px">
                Los intereses están basados en Objetivos y metas de desarrollo sostenible, selecciona cuales te
                interesan
            </Text>

            <SelectOds />
        </Stack>
    );
};

// Export
export default OdsTab;
