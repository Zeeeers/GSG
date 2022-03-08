// Dependencies
import { NextPage } from 'next';
import { Text } from '@chakra-ui/react';
import Navbar from 'layouts/main/navbar';

// Page
const Index: NextPage = () => {
    return (
        <>
            <Navbar />

            <Text fontSize="6xl" fontWeight="bold">
                Index
            </Text>
        </>
    );
};

// Export
export default Index;
