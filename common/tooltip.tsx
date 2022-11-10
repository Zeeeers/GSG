import { Stack, VStack, Icon } from '@chakra-ui/react';
import { IoMdInformationCircle } from 'react-icons/io';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
    children: JSX.Element;
};

const TooltipPrettie: React.FC<Props> = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <Stack position={{ base: 'static', md: 'relative' }} spacing="30px">
            <Icon
                as={IoMdInformationCircle}
                cursor="pointer"
                onClick={() => setIsActive(!isActive)}
                w={{ base: '27px', sm: '20px' }}
                h={{ base: '27px', sm: '20px' }}
            />

            {isActive && (
                <>
                    <VStack
                        display={{ base: 'none', md: 'block' }}
                        as={motion.div}
                        initial={{ scale: 0, top: -130, right: -170 }}
                        animate={{ scale: 1, top: 0, right: -400, transition: { type: 'spring', duration: 0.7 } }}
                        rounded="16px"
                        align="flex-start"
                        position="absolute"
                        background="gray.800"
                        py="30px"
                        px="20px"
                        w="380px"
                        zIndex={10}
                        top={0}
                        spacing="15px"
                    >
                        {children}
                    </VStack>

                    <VStack
                        display={{ base: 'block', md: 'none' }}
                        rounded="16px"
                        align="flex-start"
                        position="absolute"
                        background="gray.800"
                        py="30px"
                        px="20px"
                        w={{ base: 'full', sm: '380px' }}
                        zIndex={10}
                        top={0}
                        right={0}
                        spacing="15px"
                    >
                        {children}
                    </VStack>
                </>
            )}
        </Stack>
    );
};

export default TooltipPrettie;
