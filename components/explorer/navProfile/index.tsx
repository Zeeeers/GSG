import { HStack, VStack, Box, IconButton, Icon } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { GetInterestListResponse } from 'services/api/lib/interest/interest.types';
import { InvestorResponse } from 'services/api/lib/user/user.types';
import ActiveMatch from './activeMatch';
import ProfileIncomplete from './profileIncomplete';

interface NewProfileProps {
    userResponse: InvestorResponse;
    getInterest: GetInterestListResponse;
    openPhone: () => void;
}

const NavProfile = ({ userResponse, getInterest, openPhone }: NewProfileProps) => {
    const [stepPage, setStepPage] = useState(0);

    const step = [
        <ActiveMatch key="stepActive" userResponse={userResponse} getInterest={getInterest} />,
        <ProfileIncomplete key="stepProfile" userResponse={userResponse} openPhone={openPhone} />,
    ];

    useEffect(() => {
        setTimeout(() => {
            if (stepPage === 0) {
                setStepPage(stepPage + 1);
            } else {
                setStepPage(0);
            }
        }, 5000);
    }, [stepPage]);

    return (
        <VStack align="start" justify="space-between" mb="32px" bg="gray.800" p="20px" rounded="8px">
            <HStack w="full" justify="space-between" align="start">
                <HStack spacing="4px">
                    {step.map((_item, index) => (
                        <Box
                            key={index}
                            w="12px"
                            h="12px"
                            rounded="full"
                            bg={index === stepPage ? '#3B5D89' : 'gray.600'}
                        ></Box>
                    ))}
                </HStack>

                <IconButton aria-label="Close" icon={<Icon as={MdClose} w="20px" h="20px" />} />
            </HStack>
            <AnimatePresence exitBeforeEnter>{step[stepPage]}</AnimatePresence>
        </VStack>
    );
};

export default NavProfile;
