// Dependencies

import { Skeleton } from '@chakra-ui/react';

// Components
const InfoFormSkeleton: React.FC = () => {
    // States

    return (
        <>
            <Skeleton h={2} w={40} mt={6} mb={4} rounded="16px" />
            <Skeleton h={12} w={{ base: 'full', lg: 8 / 12 }} rounded="16px" />
        </>
    );
};

// Export
export default InfoFormSkeleton;
