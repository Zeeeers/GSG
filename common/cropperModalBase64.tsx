// Dependencies
import useCropperBase64 from 'hooks/useCropperBase64';
import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal';
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';
import { Button } from '@chakra-ui/button';

// Types
interface Props {
    title: string;
    baseImg: string;
    isOpen: boolean;
    onClose: () => void;
    onCropSave: (img: string) => void;
}

// Component
const CropperModalBase64: React.FC<Props> = ({ title, baseImg, isOpen, onClose, onCropSave }) => {
    // States
    const { image, crop, zoom, getCroppedImage } = useCropperBase64(baseImg);
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
                            onCropChange={crop.set}
                            onZoomChange={zoom.set}
                            onCropComplete={crop.onComplete}
                        />
                    </Box>

                    <HStack py={4} px={4}>
                        <Text size="sm" fontWeight="medium" mr={4}>
                            Zoom
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
                    <Flex w="full" justify="flex-end">
                        <Button
                            variant="outline"
                            size="sm"
                            mr={2}
                            onClick={async () => {
                                setIsSavingChanges(true);

                                onCropSave(baseImg);

                                setIsSavingChanges(false);
                                onClose();
                            }}
                        >
                            Omitir recorte
                        </Button>
                        <Button
                            isLoading={isSavingChanges}
                            loadingText={'Recortando...'}
                            size="sm"
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
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

// Export
export default CropperModalBase64;
