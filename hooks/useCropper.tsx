// Dependencies
import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop/types';
import { getCroppedImg } from 'services/cropper';

// Hook
const useCropper = (baseImage?: string) => {
    // States
    const [image, setImage] = useState(baseImage);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedPixels, setCroppedPixels] = useState<Area>();

    // Handlers
    const handleCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedPixels(croppedAreaPixels);
    }, []);

    const getImageFromCroppedArea = async () => {
        const img = await getCroppedImg(image!, croppedPixels!);

        return img;
    };

    return {
        image: {
            get: image,
            set: setImage,
        },
        crop: {
            get: crop,
            set: setCrop,
            onComplete: handleCropComplete,
        },
        zoom: {
            get: zoom,
            set: setZoom,
        },
        getCroppedImage: getImageFromCroppedArea,
    };
};

// Export
export default useCropper;
