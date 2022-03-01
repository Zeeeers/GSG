// Types
import { Area } from 'react-easy-crop/types';

// Create Image
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

// GET Cropped Image
export const getCroppedImgBase64 = async (originalImage: string, crop: Area): Promise<string> => {
    // Create Image Element
    const image = await createImage(originalImage);

    // Set up Canvas
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );

    // Get Base 64
    const base64Image = canvas.toDataURL('image/jpeg');

    return base64Image;
};
