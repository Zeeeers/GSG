// Dependencies
//@ts-nocheck
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { forwardRef } from '@chakra-ui/system';
import { Input } from '@chakra-ui/input';
import { Alert } from '@chakra-ui/alert';
import { Image } from '@chakra-ui/image';
import {
    Box,
    Flex,
    Heading,
    OrderedList,
    UnorderedList,
    Text,
    Code,
    ListItem,
    AspectRatio,
    VStack,
    Link,
    BoxProps,
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/modal';
import imageExtensions from 'image-extensions';
import ReactPlayer from 'react-player/youtube';
import { Editable, withReact, useSlate, Slate, ReactEditor, useSelected, useFocused } from 'slate-react';
import { Editor, Transforms, createEditor, Descendant, Element as SlateElement, BaseEditor, Range } from 'slate';
import { withHistory, HistoryEditor } from 'slate-history';
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaCode,
    FaHeading,
    FaFont,
    FaQuoteRight,
    FaListUl,
    FaListOl,
    FaImage,
    FaYoutube,
    FaFileImage,
    FaLink,
    FaUnlink,
} from 'react-icons/fa';
import isHotkey from 'is-hotkey';
import isUrl from 'is-url';
import { IconType } from 'react-icons/lib';
import { uploadImage, deleteImage } from 'services/api/lib/projectImages/projectImages.calls';
import { AuthManager } from '@clyc/next-route-manager';
import { useCreateGsgProjectStore } from '../../stores/createGsgProject';

// Dynamic
const CropperModal = dynamic(() => import('common/cropperModalBase64'));

interface IHOTKEYS {
    'mod+b': 'bold';
    'mod+i': 'italic';
    'mod+u': 'underline';
    'mod+`': 'code';
}

const HOTKEYS: IHOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

type CustomText = { text: string; bold?: boolean; italic?: boolean; code?: boolean; underline?: boolean };

type IFormat =
    | 'bold'
    | 'italic'
    | 'code'
    | 'paragraph'
    | 'list-item'
    | 'block-quote'
    | 'underline'
    | 'heading-one'
    | 'heading-two'
    | 'numbered-list'
    | 'bulleted-list'
    | 'link'
    | 'video'
    | 'image';

interface CustomElement {
    type: IFormat;
    children: CustomText[];
    url?: string;
    id?: number;
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

interface Props extends BoxProps {
    initialValues?: Array<Descendant>;
    isSavingChanges?: boolean;
    placeholder?: string;
    handleSaveField(values: Array<Descendant>): void;
}

const SlateEditor = forwardRef<Props, 'div'>(
    ({ initialValues, handleSaveField, placeholder, isSavingChanges, ...props }, ref) => {
        const [value, setValue] = useState<Descendant[]>(
            initialValues ?? [
                {
                    type: 'paragraph',
                    children: [{ text: ' ' }],
                },
            ],
        );
        const images = useCreateGsgProjectStore((state) => state.images);
        const updateImages = useCreateGsgProjectStore((state) => state.updateImages);
        const renderElement = useCallback((props) => <Element {...props} />, []);
        const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
        const editor = useMemo(() => withLinks(withImages(withHistory(withReact(createEditor())))), []);
        const { isOpen: isOpenImage, onOpen: onOpenImage, onClose: onCloseImage } = useDisclosure();
        const { isOpen: isOpenCropper, onOpen: onOpenCropper, onClose: onCloseCropper } = useDisclosure();
        const { isOpen: isOpenVideo, onOpen: onOpenVideo, onClose: onCloseVideo } = useDisclosure();
        const [baseImg, setBaseImg] = useState<string>();
        const [videoUrl, setVideoUrl] = useState<string>();
        const [videoUrlError, setVideoUrlError] = useState<string | undefined>();
        const [croppedImg, setCroppedImg] = useState<string>();
        const [isUploadingImg, setIsUploadingImg] = useState<boolean>(false);

        useEffect(() => {
            if (!isOpenImage) {
                setBaseImg('');
                setCroppedImg('');
            }
        }, [isOpenImage]);

        return (
            <Box ref={ref} rounded="2xl" border="1px solid" borderColor="gray.alpha.48" overflow="hidden" {...props}>
                <Slate
                    editor={editor}
                    value={value}
                    onChange={(value) => {
                        setValue(value);
                    }}
                >
                    <Flex justify="center" align="flex-end" p={4} bg="background.alpha.75">
                        <MarkButton title="Negrita" format="bold" icon={FaBold} />
                        <MarkButton title="Cursiva" format="italic" icon={FaItalic} />
                        <MarkButton title="Subrayado" format="underline" icon={FaUnderline} />
                        <MarkButton title="Destacado" format="code" icon={FaCode} />
                        <BlockButton title="Título 1" format="heading-one" icon={FaHeading} />
                        <BlockButton title="Título 2" format="heading-two" icon={FaFont} />
                        <BlockButton title="Cita" format="block-quote" icon={FaQuoteRight} />
                        <BlockButton title="Lista Enumerada" format="numbered-list" icon={FaListOl} />
                        <BlockButton title="Lista con Viñetas" format="bulleted-list" icon={FaListUl} />
                        <LinkButton />
                        <RemoveLinkButton />
                        <InsertImageButton onOpen={onOpenImage} />
                        <InsertVideoButton onOpen={onOpenVideo} />
                    </Flex>
                    <Box p={4}>
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder={placeholder ?? ''}
                            spellCheck
                            autoFocus
                            onBlur={() => handleSaveField(value)}
                            onKeyDown={(event) => {
                                Object.keys(HOTKEYS).forEach((hotkey: 'mod+b' | 'mod+i' | 'mod+u' | 'mod+`') => {
                                    if (isHotkey(hotkey, event as any)) {
                                        event.preventDefault();
                                        const mark: 'bold' | 'italic' | 'underline' | 'code' = HOTKEYS[hotkey];
                                        toggleMark(editor, mark);
                                    }
                                });
                            }}
                        />
                    </Box>
                </Slate>

                <Modal isOpen={isOpenImage} onClose={onCloseImage}>
                    <ModalOverlay />

                    <ModalContent>
                        <ModalHeader>Insertar imagen</ModalHeader>

                        <ModalCloseButton />

                        <ModalBody py={4}>
                            {baseImg === '' && (
                                <Button variant="outline" w="full" h="fit-content" py={0}>
                                    <VStack w="full" spacing={3} align="center" py={6}>
                                        <Icon as={FaFileImage} fontSize="3xl" />

                                        <Flex>Sube o arrastra una imagen</Flex>
                                    </VStack>

                                    <Input
                                        w="inherit"
                                        h="full"
                                        cursor="pointer"
                                        type="file"
                                        opacity={0}
                                        position="absolute"
                                        left={0}
                                        onClick={(e) => {
                                            (e.target as HTMLInputElement).value = '';
                                        }}
                                        onChange={async (e) => {
                                            const { validateTypes, getBase64 } = await import('services/images');

                                            if (e.target?.files && validateTypes(e.target.files[0])) {
                                                const base = await getBase64(e.target.files![0]);
                                                setBaseImg(base);
                                                onOpenCropper();
                                            }
                                        }}
                                    />
                                </Button>
                            )}

                            {croppedImg && <Image src={croppedImg} alt="a" />}

                            {croppedImg !== '' && (
                                <Flex mt={4} w="full" justify="flex-end">
                                    <Button
                                        isLoading={isUploadingImg}
                                        loadingText="Subiendo imagen"
                                        onClick={async () => {
                                            setIsUploadingImg(true);

                                            const token = new AuthManager({
                                                cookieName: process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME!,
                                            }).token;

                                            const { data: imageData, ok: imageOk } = await uploadImage({
                                                image: baseImg!,
                                                token: token,
                                            });

                                            if (imageOk) {
                                                insertImage(
                                                    editor,
                                                    imageData?.data.image.image!,
                                                    imageData?.data.image.id,
                                                );
                                                updateImages([...images, imageData?.data.image.id!]);
                                                setBaseImg('');
                                                setCroppedImg('');
                                                onCloseImage();
                                                setIsUploadingImg(false);
                                            } else {
                                            }
                                        }}
                                    >
                                        Confirmar imagen
                                    </Button>
                                </Flex>
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>

                {isOpenVideo && (
                    <Modal isOpen={isOpenVideo} onClose={onCloseVideo}>
                        <ModalOverlay />

                        <ModalContent>
                            <ModalHeader>Insertar Video</ModalHeader>

                            <ModalCloseButton />

                            <ModalBody>
                                <FormControl id="video_url" isInvalid={!!videoUrlError} mb={4}>
                                    <FormLabel>Url del video</FormLabel>

                                    <Input
                                        variant="outline"
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        value={videoUrl}
                                    />

                                    <FormErrorMessage>{videoUrlError ?? ''}</FormErrorMessage>
                                </FormControl>

                                <Flex w="full" justify="flex-end">
                                    <Button
                                        mb={4}
                                        onClick={() => {
                                            if (videoUrl !== '') {
                                                insertVideo(editor, videoUrl!);
                                                onCloseVideo();
                                                setVideoUrl('');
                                                setVideoUrlError(undefined);
                                            } else {
                                                setVideoUrlError('Campo obligatorio.');
                                            }
                                        }}
                                    >
                                        Agregar video
                                    </Button>
                                </Flex>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}

                {baseImg && (
                    <CropperModal
                        title={'Recortar imagen'}
                        isOpen={isOpenCropper}
                        baseImg={baseImg}
                        onClose={onCloseCropper}
                        onCropSave={(img) => {
                            setCroppedImg(img);
                        }}
                    />
                )}
            </Box>
        );
    },
);

const withImages = (editor: Editor) => {
    const { insertData, isVoid } = editor;

    editor.isVoid = (element) => {
        return element.type === 'image' ? true : isVoid(element);
    };

    editor.insertData = (data) => {
        const text = data.getData('text/plain');
        const { files } = data;

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result;
                        insertImage(editor, url?.toString()!);
                    });

                    reader.readAsDataURL(file);
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

const withLinks = (editor: Editor) => {
    const { insertData, insertText, isInline } = editor;

    editor.isInline = (element) => {
        return element.type === 'link' ? true : isInline(element);
    };

    editor.insertText = (text) => {
        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertText(text);
        }
    };

    editor.insertData = (data) => {
        const text = data.getData('text/plain');

        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

const isImageUrl = (url: string) => {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop() ?? '';
    return imageExtensions.includes(ext);
};

const insertImage = (editor: Editor, url: string, id?: number) => {
    const text = { text: '' };
    const image: CustomElement = { type: 'image', url, id, children: [text] };
    Transforms.insertNodes(editor, image);
    // Space for edit after image
    const space: CustomElement = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, space);
};

const insertVideo = (editor: Editor, url: string) => {
    const text = { text: '' };
    const video: CustomElement = { type: 'video', url, children: [text] };
    Transforms.insertNodes(editor, video);
    // Space for edit after image
    const space: CustomElement = {
        type: 'paragraph',
        children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, space);
};

const insertLink = (editor: Editor, url: string) => {
    if (editor.selection) {
        wrapLink(editor, url);
    }
};

const isLinkActive = (editor: Editor) => {
    const [link] = Editor.nodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
    return !!link;
};

const wrapLink = (editor: Editor, url: string) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: CustomElement = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    };

    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    } else {
        Transforms.wrapNodes(editor, link, { split: true });
        Transforms.collapse(editor, { edge: 'end' });
    }
};

const unwrapLink = (editor: Editor) => {
    Transforms.unwrapNodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
};

const toggleBlock = (editor: ReactEditor, format: IFormat) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor as Editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
        split: true,
    });

    const newProperties: Partial<SlateElement> = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };

    Transforms.setNodes(editor as Editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor as Editor, block);
    }
};

const toggleMark = (editor: ReactEditor, format: IFormat) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor as Editor, format);
    } else {
        Editor.addMark(editor as Editor, format, true);
    }
};

const isBlockActive = (editor: ReactEditor, format: IFormat) => {
    const [match] = Editor.nodes(editor as Editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });

    return !!match;
};

const isMarkActive = (editor: ReactEditor, format: IFormat) => {
    const marks = Editor.marks(editor as Editor);
    return marks ? marks[format as keyof Omit<CustomText, 'text'>] === true : false;
};

const Element = (props: { element: CustomElement; children: JSX.Element; attributes: any }) => {
    const { attributes, children, element } = props;
    switch (element.type) {
        case 'block-quote':
            return (
                <Alert
                    colorScheme="gray"
                    borderLeft="0.5rem solid"
                    borderColor="gray.500"
                    fontSize="md"
                    display="block"
                    p={2}
                    pl={6}
                    my={3}
                    {...attributes}
                >
                    {children}
                </Alert>
            );
        case 'bulleted-list':
            return (
                <UnorderedList {...attributes} ml={0} mb={3}>
                    {children}
                </UnorderedList>
            );
        case 'heading-one':
            return (
                <Heading as="h1" mb={3} fontSize="3xl" textColor="primary.500" {...attributes}>
                    {children}
                </Heading>
            );
        case 'heading-two':
            return (
                <Heading as="h2" mb={3} fontSize="2xl" textColor="secondary.500" {...attributes}>
                    {children}
                </Heading>
            );
        case 'list-item':
            return (
                <ListItem {...attributes} ml={4}>
                    {children}
                </ListItem>
            );
        case 'numbered-list':
            return (
                <OrderedList {...attributes} ml={0} mb={3}>
                    {children}
                </OrderedList>
            );
        case 'link':
            return (
                <Link {...attributes} fontWeight="bold" textColor="primary.400" href={element.url}>
                    {children}
                </Link>
            );
        case 'image':
            return <ImageCustomElement {...props} />;
        case 'video':
            return <VideoCustomElement {...props} />;
        default:
            return (
                <Text w="full" mb={1} {...attributes}>
                    {children}
                </Text>
            );
    }
};

const handleDeleteImage = async (id: number) => {
    await deleteImage({
        imageId: id,
        token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
    });
};

const ImageCustomElement = ({
    attributes,
    children,
    element,
}: {
    element: CustomElement;
    children: JSX.Element;
    attributes: any;
}) => {
    const selected = useSelected();
    const focused = useFocused();
    const images = useCreateGsgProjectStore((state) => state.images);
    const updateImages = useCreateGsgProjectStore((state) => state.updateImages);

    useEffect(() => {
        return () => {
            updateImages(images.filter((image) => image !== element.id));
            handleDeleteImage(element.id!);
        };
    }, [element, images, updateImages]);

    return (
        <figure {...attributes} contentEditable={false}>
            <Image
                src={element.url}
                alt="a"
                d="block"
                maxW="100%"
                maxH="20em"
                boxShadow={selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}
            />
            {children}
        </figure>
    );
};

const VideoCustomElement = ({
    attributes,
    children,
    element,
}: {
    element: CustomElement;
    children: JSX.Element;
    attributes: any;
}) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <AspectRatio
                    ratio={16 / 9}
                    position="relative"
                    boxShadow={selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}
                    maxW={{ base: '100%', md: '75%' }}
                    mx="auto"
                >
                    <>
                        <Flex position="relative" zIndex={1}>
                            <ReactPlayer url={element.url} width="100%" height="100%" controls />
                        </Flex>

                        {children}
                    </>
                </AspectRatio>
            </div>
        </div>
    );
};

const Leaf = ({ attributes, children, leaf }: { leaf: CustomText; children: JSX.Element; attributes: any }) => {
    if (leaf.bold) {
        children = (
            <Text as="span" d="inline" fontWeight="bold">
                {children}
            </Text>
        );
    }

    if (leaf.code) {
        children = (
            <Code bg="primary.700" textColor="white.base" p={1} {...attributes}>
                {children}
            </Code>
        );
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon, title }: { format: IFormat; icon: IconType; title: string }) => {
    const editor = useSlate();
    return (
        <Button
            isActive={isBlockActive(editor, format)}
            variant="ghost"
            textColor="primary.400"
            size="md"
            mr={2}
            title={title}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon as={icon} />
        </Button>
    );
};

const MarkButton = ({ format, icon, title }: { format: IFormat; icon: IconType; title: string }) => {
    const editor = useSlate();
    return (
        <Button
            isActive={isMarkActive(editor, format)}
            variant="ghost"
            textColor="primary.400"
            size="md"
            title={title}
            mr={2}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon as={icon} />
        </Button>
    );
};

const InsertImageButton = ({ onOpen }: { onOpen(): void }) => {
    return (
        <Button
            title="Agregar Imagen"
            variant="ghost"
            textColor="primary.400"
            size="md"
            mr={2}
            onClick={() => onOpen()}
        >
            <Icon as={FaImage} />
        </Button>
    );
};

const InsertVideoButton = ({ onOpen }: { onOpen(): void }) => {
    return (
        <Button title="Agregar Video" variant="ghost" textColor="primary.400" size="md" mr={2} onClick={() => onOpen()}>
            <Icon as={FaYoutube} />
        </Button>
    );
};

const LinkButton = () => {
    const editor = useSlate();
    return (
        <Button
            variant="ghost"
            textColor="primary.400"
            size="md"
            mr={2}
            isActive={isLinkActive(editor)}
            title="Agregar Link"
            onMouseDown={(event) => {
                event.preventDefault();
                const url = window.prompt('Ingresa el Link:');
                if (!url) return;
                insertLink(editor, url);
            }}
        >
            <Icon as={FaLink} />
        </Button>
    );
};

const RemoveLinkButton = () => {
    const editor = useSlate();

    return (
        <Button
            variant="ghost"
            textColor="primary.400"
            size="md"
            mr={2}
            isActive={isLinkActive(editor)}
            title="Quitar Link"
            onMouseDown={() => {
                if (isLinkActive(editor)) {
                    unwrapLink(editor);
                }
            }}
        >
            <Icon as={FaUnlink} />
        </Button>
    );
};

export default SlateEditor;
