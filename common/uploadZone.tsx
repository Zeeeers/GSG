// Dependencies
import { Button, ButtonProps } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

// Types
type Merge<P, T> = Omit<P, keyof T> & T;
type Props = Merge<ButtonProps, DropzoneOptions>;

// Component
const UploadZone: React.FC<Props> = ({ onDrop, accept, ...props }) => {
    // States
    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        multiple: false,
        onDrop,
        accept,
        ...props,
    });

    return (
        <Box {...getRootProps()}>
            <input {...getInputProps()} />

            <Button
                {...(props as ButtonProps)}
                onClick={(e) => {
                    props.onClick && props.onClick(e);
                    open();
                }}
            />
        </Box>
    );
};

// Export
export default UploadZone;
