import { HStack, VStack, Icon } from '@chakra-ui/react';
import { IoMdInformationCircle } from 'react-icons/io';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
    children: JSX.Element;
};

const TooltipPrettie: React.FC<Props> = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <HStack position="relative" spacing="30px">
            <Icon
                as={IoMdInformationCircle}
                cursor="pointer"
                onClick={() => setIsActive(!isActive)}
                w="20px"
                h="20px"
            />

            {isActive && (
                <VStack
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
            )}
        </HStack>
    );
};

export default TooltipPrettie;
