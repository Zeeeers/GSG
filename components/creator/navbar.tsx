import { HStack, Container, Image, Button } from '@chakra-ui/react';
import { IProjectForm } from 'forms/project';
import { IoMdEye } from 'react-icons/io';

interface NavbarProps {
    handleDraft: (data: IProjectForm | Object, isPreview: boolean) => void;
    saveDraft: boolean;
}

const Navbar = ({ handleDraft, saveDraft }: NavbarProps) => {
    return (
        <HStack
            align="flex-start"
            justify="flex-start"
            position="fixed"
            bg="gray.800"
            w="full"
            py={{ base: '15px', md: '14px' }}
            zIndex={20}
        >
            <Container
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                maxWidth="1250px"
                px={{ base: '16px', xl: '50px' }}
                marginLeft={{ base: '0px', lg: 'auto' }}
            >
                <HStack spacing="10px">
                    <Image
                        alt="match_logo"
                        src="https://skala-chile.s3.us-east-2.amazonaws.com/production/match_logo_V.2.png"
                        w="133px"
                        h="35px"
                    />
                </HStack>

                <Button
                    onClick={() => handleDraft({}, true)}
                    variant="solid"
                    background="blue.700"
                    leftIcon={<IoMdEye />}
                    fontSize="14px"
                    _hover={{ background: 'blue.600' }}
                    isLoading={saveDraft}
                    loadingText="Cargando vista previa"
                >
                    Vista previa
                </Button>
            </Container>
        </HStack>
    );
};

export default Navbar;
