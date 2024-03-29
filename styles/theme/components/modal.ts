const parts = ['overlay', 'dialogContainer', 'dialog', 'header', 'closeButton', 'body', 'footer'];

const baseStyleOverlay = {
    bg: 'blackAlpha.100',
    zIndex: 'modal',
};

type Dict = Record<string, any>;

function baseStyleDialogContainer({ isCentered, scrollBehavior }: Dict) {
    return {
        display: 'flex',
        zIndex: 'modal',
        justifyContent: 'center',
        alignItems: isCentered ? 'center' : 'flex-start',
        overflow: scrollBehavior === 'inside' ? 'hidden' : 'auto',
    };
}

function baseStyleDialog({ scrollBehavior }: Dict) {
    return {
        borderRadius: 'md',
        bg: 'gray.700',
        color: 'inherit',
        my: '3.75rem',
        zIndex: 'modal',
        maxH: scrollBehavior === 'inside' ? 'calc(100vh - 7.5rem)' : undefined,
        boxShadow: 'lg',
    };
}

const baseStyleHeader = {
    fontSize: 'xl',
    fontWeight: 'semibold',
};

const baseStyleCloseButton = {
    position: 'absolute',
    top: 2,
    insetEnd: 3,
};

function baseStyleBody({ scrollBehavior }: Dict) {
    return {
        px: 0,
        py: 0,
        flex: 1,
        overflow: scrollBehavior === 'inside' ? 'auto' : undefined,
    };
}

const baseStyleFooter = {
    px: 6,
    py: 4,
};

const baseStyle = (props: Dict) => ({
    overlay: baseStyleOverlay,
    dialogContainer: baseStyleDialogContainer(props),
    dialog: baseStyleDialog(props),
    header: baseStyleHeader,
    closeButton: baseStyleCloseButton,
    body: baseStyleBody(props),
    footer: baseStyleFooter,
});

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
    if (value === 'full') {
        return { dialog: { maxW: '100vw', minH: '100vh' } };
    }
    return { dialog: { maxW: value } };
}

const sizes = {
    xs: getSize('xs'),
    sm: getSize('sm'),
    md: getSize('md'),
    lg: getSize('lg'),
    xl: getSize('xl'),
    '2xl': getSize('2xl'),
    '3xl': getSize('3xl'),
    '4xl': getSize('4xl'),
    '5xl': getSize('5xl'),
    '6xl': getSize('6xl'),
    full: getSize('full'),
};

const defaultProps = {
    size: 'md',
};

const modalTheme = {
    parts,
    baseStyle,
    sizes,
    defaultProps,
};

export default modalTheme;
