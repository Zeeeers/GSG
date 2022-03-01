// Utils
export const getBase64 = async (file: File): Promise<string> => {
    const image: Promise<string> = new Promise((resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            resolve(fileReader.result as string);
        };

        fileReader.readAsDataURL(file as File);
    });

    const result = await image;

    return result;
};

export const validateTypes = (file: File): boolean => {
    return file && (file.type === 'image/jpeg' || file.type === 'image/png');
};

export const isPDF = (file: File): boolean => {
    return file.type === 'application/pdf';
};
