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
                        alt="impact_logo"
                        src="https://bucket-company-pitch.s3.amazonaws.com/img/logo_impact_matching.png"
                        w="170px"
                        h="45px"
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
