const parts = ['container', 'button', 'panel', 'icon'];

const baseStyleContainer = {
    borderTopWidth: '1px',
    borderColor: 'inherit',
    _last: {
        borderBottomWidth: '1px',
    },
};

const baseStyleButton = {
    transitionProperty: 'common',
    transitionDuration: 'normal',
    fontSize: '1rem',
    _focus: {
        boxShadow: 'none',
    },
    _hover: {
        bg: 'black.alpha.8',
    },
    _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
    },
    px: 4,
    py: 2,
};

const baseStylePanel = {
    pt: 2,
    px: 4,
    pb: 5,
};

const baseStyleIcon = {
    fontSize: '1.25em',
};

const baseStyle = {
    container: baseStyleContainer,
    button: baseStyleButton,
    panel: baseStylePanel,
    icon: baseStyleIcon,
};

const accordionTheme = {
    parts,
    baseStyle,
};

export default accordionTheme;
