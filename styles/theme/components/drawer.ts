import Modal from './modal';

const parts = Modal.parts;

function getSize(value: string) {
    if (value === 'full') {
        return { dialog: { maxW: '100vw', h: '100vh' } };
    }
    return { dialog: { maxW: value } };
}

const baseStyleOverlay = {
    bg: 'black.alpha.32',
    zIndex: 'overlay',
};

const baseStyleDialogContainer = {
    display: 'flex',
    zIndex: 'modal',
    justifyContent: 'center',
};

function baseStyleDialog({ isFullHeight }: Record<string, any>) {
    return {
        ...(isFullHeight && { height: '100vh' }),
        zIndex: 'modal',
        maxH: '100vh',
        bg: 'white.base',
        color: 'inherit',
        boxShadow: 'lg',
    };
}

const baseStyleHeader = {
    px: 6,
    py: 4,
    fontSize: 'xl',
    fontWeight: 'semibold',
};

const baseStyleCloseButton = {
    position: 'absolute',
    top: 2,
    insetEnd: 3,
};

const baseStyleBody = {
    px: 6,
    py: 2,
    flex: 1,
    overflow: 'auto',
};

const baseStyleFooter = {
    px: 6,
    py: 4,
};

const baseStyle = (props: Record<string, any>) => ({
    overlay: baseStyleOverlay,
    dialogContainer: baseStyleDialogContainer,
    dialog: baseStyleDialog(props),
    header: baseStyleHeader,
    closeButton: baseStyleCloseButton,
    body: baseStyleBody,
    footer: baseStyleFooter,
});

const sizes = {
    xs: getSize('xs'),
    sm: getSize('md'),
    md: getSize('lg'),
    lg: getSize('2xl'),
    xl: getSize('4xl'),
    full: getSize('full'),
};

const defaultProps = {
    size: 'xs',
};

const drawerTheme = {
    parts,
    baseStyle,
    sizes,
    defaultProps,
};

export default drawerTheme;
