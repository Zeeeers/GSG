// Dependencies
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
} from '@chakra-ui/react';
import useCropper from 'hooks/useCropper';
import Cropper from 'react-easy-crop';

// Types
interface Props {
    title: string;
    baseImg: string;
    isOpen: boolean;
    onClose: () => void;
    onCropSave: (img: string) => void;
}

// Component
const CropperModal: React.FC<Props> = ({ title, baseImg, isOpen, onClose, onCropSave }) => {
    // States
    const { image, crop, zoom, getCroppedImage } = useCropper(baseImg);
    const [isSavingChanges, setIsSavingChanges] = useState(false);

    // Effects
    useEffect(() => {
        image.set(baseImg);
    }, [baseImg, image]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
            <ModalOverlay />

            <ModalContent borderRadius={'16px'}>
                <ModalHeader>
                    <Heading as="h1" size="2xl" fontWeight="semibold">
                        {title}
                    </Heading>
                </ModalHeader>

                <ModalCloseButton size="xl" />

                <ModalBody p={0}>
                    <Box w={'full'} position="relative" paddingBottom="50%" bg="gray.600">
                        <Cropper
                            image={image.get}
                            crop={crop.get}
                            zoom={zoom.get}
                            aspect={1 / 1}
                            onCropChange={crop.set}
                            onZoomChange={zoom.set}
                            onCropComplete={crop.onComplete}
                        />
                    </Box>

                    <HStack py={4} px={4}>
                        <Text size="sm" fontWeight="medium" mr={4}>
                            Zoom:
                        </Text>

                        <Slider
                            min={1}
                            max={2}
                            step={0.01}
                            defaultValue={zoom.get}
                            value={zoom.get}
                            onChange={(value) => zoom.set(value)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack bg="primary.500" />
                            </SliderTrack>

                            <SliderThumb />
                        </Slider>
                    </HStack>
                </ModalBody>

                <ModalFooter borderTop="1px" borderColor="gray.200">
                    <Button
                        isLoading={isSavingChanges}
                        loadingText={'Guardando selección'}
                        variant="solid"
                        onClick={async () => {
                            setIsSavingChanges(true);
                            const image = await getCroppedImage();

                            onCropSave(image);

                            setIsSavingChanges(false);
                            onClose();
                        }}
                    >
                        Confirmar selección
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

// Export
export default CropperModal;
