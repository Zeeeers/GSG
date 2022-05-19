const parts = ['item', 'command', 'list', 'button', 'groupTitle', 'divider'];

const baseStyleList = {
    bg: `gray.800`,
    boxShadow: `sm`,
    color: 'inherit',
    minW: '3xs',
    py: '2',
    zIndex: 1,
    borderRadius: '2xl',
    borderWidth: '1px',
    borderColor: 'gray.900',
};

const baseStyleItem = {
    py: '0.4rem',
    px: '0.8rem',
    transitionProperty: 'background',
    transitionDuration: 'ultra-fast',
    transitionTimingFunction: 'ease-in',
    _focus: {
        bg: `gray.500`,
    },
    _active: {
        bg: `gray.500`,
    },
    _expanded: {
        bg: `gray.500`,
    },
    _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
    },
};

const baseStyleGroupTitle = {
    mx: 4,
    my: 2,
    fontWeight: 'semibold',
    fontSize: 'sm',
};

const baseStyleCommand = {
    opacity: 0.6,
};

const baseStyleDivider = {
    border: 0,
    borderBottom: '1px solid',
    borderColor: 'gray.50',
    my: '0.5rem',
    opacity: 0.6,
};

const baseStyleButton = {
    transitionProperty: 'common',
    transitionDuration: 'normal',
};

const baseStyle = {
    button: baseStyleButton,
    list: baseStyleList,
    item: baseStyleItem,
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider,
};

const menuTheme = {
    parts,
    baseStyle,
};

export default menuTheme;
