// Dependencies
import { Skeleton } from '@chakra-ui/react';
import { range } from 'services/arrays';

// Component
const OrgInfoFormSkeleton: React.FC = () => {
    return (
        <>
            {range(4, 1).map((_) => (
                <>
                    <Skeleton h={2} w={40} mt={6} mb={4} rounded="16px" />
                    <Skeleton h={24} w={8 / 12} rounded="16px" />
                </>
            ))}

            <Skeleton h={8} w={12} mt={6} mb={4} rounded="16px" />
        </>
    );
};

// Export
export default OrgInfoFormSkeleton;
