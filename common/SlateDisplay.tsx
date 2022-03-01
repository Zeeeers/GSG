// Dependencies
import React, { useCallback, useMemo } from 'react';
import { Editable, withReact, Slate, ReactEditor, useFocused, useSelected } from 'slate-react';
import { createEditor, Descendant, BaseEditor } from 'slate';
import { withHistory, HistoryEditor } from 'slate-history';
import {
    Alert,
    Box,
    Code,
    Heading,
    Image,
    ListItem,
    OrderedList,
    Text,
    UnorderedList,
    AspectRatio,
    Link,
    Flex,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player/youtube';

// Types
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
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

interface Props {
    value: Array<Descendant>;
}

const SlateDisplay: React.FC<Props> = ({ value }) => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate editor={editor} value={value} onChange={() => null}>
            <Box>
                <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly />
            </Box>
        </Slate>
    );
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
                <Link isExternal {...attributes} fontWeight="bold" textColor="primary.400" href={element.url}>
                    {children}
                </Link>
            );
        case 'image':
            return <ImageCustomElement {...props} />;
        case 'video':
            return <VideoCustomElement {...props} />;
        default:
            return (
                <Text mb={1} {...attributes}>
                    {children}
                </Text>
            );
    }
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
        <div {...attributes} contentEditable={false}>
            <div>
                <AspectRatio
                    ratio={16 / 9}
                    mx="auto"
                    position="relative"
                    zIndex={1}
                    boxShadow={selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}
                    maxW={{ base: '100%', md: '75%' }}
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
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <Image
                    src={element.url}
                    alt="al"
                    d="block"
                    maxW="100%"
                    maxH="20em"
                    my={'0.2rem'}
                    boxShadow={selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}
                />
            </div>
            {children}
        </div>
    );
};

const Leaf = ({ attributes, children, leaf }: { leaf: CustomText; children: JSX.Element; attributes: any }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
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

export default SlateDisplay;
