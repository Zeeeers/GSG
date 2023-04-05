import { HStack, VStack, IconButton, Icon, Button } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { isValidPhoneNumber } from 'libphonenumber-js';
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
    reloadUser: () => void;
    setVisible: (show: boolean) => void;
}

const NavProfile = ({ userResponse, getInterest, openPhone, reloadUser, setVisible }: NewProfileProps) => {
    const [stepPage, setStepPage] = useState(0);
    const [step, setStep] = useState<any>([]);

    const handleClose = async () => {
        const userApi = import('services/api/lib/user');
        const manager = import('@clyc/next-route-manager/libs/AuthManager');

        const { update: userUpdate } = await userApi;
        const AuthManager = (await manager).default;

        const { ok } = await userUpdate({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: {
                // @ts-ignore
                onboarding: false,
            },
        });

        if (ok) {
            reloadUser();
        }
    };

    useEffect(() => {
        const stepSteps = [
            {
                name: 'Match',
                component: <ActiveMatch key="stepActive" userResponse={userResponse} getInterest={getInterest} />,
            },
            {
                name: 'Perfil',
                component: <ProfileIncomplete key="stepProfile" userResponse={userResponse} openPhone={openPhone} />,
            },
        ];

        setStep([]);

        if (!userResponse.user.newsletter) {
            setStep([
                {
                    name: 'Match',
                    component: <ActiveMatch key="stepActive" userResponse={userResponse} getInterest={getInterest} />,
                },
            ]);
        }

        if (!isValidPhoneNumber(userResponse?.user?.organization?.legal_representative_phone)) {
            setStep([
                {
                    name: 'Perfil',
                    component: (
                        <ProfileIncomplete key="stepProfile" userResponse={userResponse} openPhone={openPhone} />
                    ),
                },
            ]);
        }

        if (
            !isValidPhoneNumber(userResponse?.user?.organization?.legal_representative_phone) &&
            !userResponse?.user?.newsletter
        ) {
            setStep(stepSteps);
        }

        if (
            isValidPhoneNumber(userResponse?.user?.organization?.legal_representative_phone) &&
            userResponse?.user?.newsletter
        ) {
            setVisible(false);
        }
    }, [userResponse, openPhone, getInterest, setVisible]);

    /*useEffect(() => {
        setTimeout(() => {
            if (stepPage === 0 && step.length === 2) {
                setStepPage(stepPage + 1);
            } else {
                setStepPage(0);
            }
        }, 10000);
    }, [step.length, stepPage]);*/

    return (
        <VStack align="start" justify="space-between" mb="32px" bg="gray.800" p="20px" rounded="8px">
            <HStack w="full" justify="space-between" align="start">
                <HStack spacing="4px">
                    {step.map((item: any, index: number) => (
                        <HStack key={index} align="center" spacing="8px">
                            <Button
                                variant="unstyled"
                                color={index === stepPage ? 'gray.300' : 'gray.400'}
                                borderBottom={index === stepPage ? '2px' : 'none'}
                                borderColor="blue.700"
                                fontSize="13px"
                                fontFamily="inter"
                                padding={0}
                                rounded={0}
                                h="fit-content"
                                onClick={() => setStepPage(index)}
                            >
                                {item?.name}
                            </Button>
                        </HStack>
                    ))}
                </HStack>

                <IconButton aria-label="Close" icon={<Icon as={MdClose} w="20px" h="20px" />} onClick={handleClose} />
            </HStack>
            <AnimatePresence exitBeforeEnter>{step[stepPage]?.component}</AnimatePresence>
        </VStack>
    );
};

export default NavProfile;
