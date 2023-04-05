// Dependencies
import {
    Editable,
    EditableInput,
    EditablePreview,
    EditableProps,
    forwardRef,
    HStack,
    IconButton,
    Stack,
    Tooltip,
} from '@chakra-ui/react';
import { FaCheck, FaPen, FaTimes } from 'react-icons/fa';

// Component
const EditableTitle = forwardRef<EditableProps, any>(({ fontSize, ...props }, ref) => (
    <Editable ref={ref} {...props} isPreviewFocusable={false} submitOnBlur={false} mt={2}>
        {({ isEditing, onEdit, onCancel, onSubmit }) => (
            <Stack
                direction={{ base: isEditing ? 'column' : 'row', lg: 'row' }}
                justifyContent="space-between"
                spacing={{ base: 3, lg: 6 }}
                shouldWrapChildren
                alignItems={'center'}
                w="full"
            >
                <>
                    <EditablePreview fontSize={fontSize} fontWeight="normal" />
                    <EditableInput fontSize={fontSize} fontWeight="normal" minW={{ lg: 'full' }} />
                </>

                {!props.isDisabled && (
                    <HStack spacing={4} align="flex-end" justify="flex-end" w="full">
                        {isEditing ? (
                            <>
                                <Tooltip hasArrow placement="bottom" label="Guardar" aria-label="Guardar">
                                    <IconButton
                                        aria-label="Guardar"
                                        rounded="full"
                                        icon={<FaCheck />}
                                        onClick={onSubmit}
                                    />
                                </Tooltip>

                                <Tooltip hasArrow placement="bottom" label="Cancelar" aria-label="Cancelar">
                                    <IconButton
                                        aria-label="Cancelar"
                                        rounded="full"
                                        icon={<FaTimes />}
                                        onClick={onCancel}
                                    />
                                </Tooltip>
                            </>
                        ) : (
                            <IconButton aria-label="Editar" rounded="full" icon={<FaPen />} onClick={onEdit} />
                        )}
                    </HStack>
                )}
            </Stack>
        )}
    </Editable>
));

// Export
export default EditableTitle;
