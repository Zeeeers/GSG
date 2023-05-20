import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ProgressProps {
    value: string;
}

const ProgressBar = ({ value }: ProgressProps) => {
    return (
        <Stack position="relative" w="full" h="10px" background="gray.100" rounded="20px">
            <Stack
                as={motion.div}
                animate={{
                    width: value,
                }}
                h="full"
                background="teal.400"
                rounded="20px"
            ></Stack>
        </Stack>
    );
};

export default ProgressBar;
