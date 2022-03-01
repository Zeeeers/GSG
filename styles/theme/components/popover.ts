const parts = ['popper', 'content', 'header', 'body', 'footer', 'arrow'];

const baseStylePopper = {
    zIndex: 10,
};

const baseStyleContent = {
    '--popover-bg': `colors.white.base`,
    bg: 'var(--popover-bg)',
    '--popper-arrow-bg': 'var(--popover-bg)',
    '--popper-arrow-shadow-color': `colors.gray.200`,
    width: 'xs',
    border: '1px solid',
    borderColor: 'inherit',
    borderRadius: 'md',
    boxShadow: 'sm',
    zIndex: 'inherit',
    _focus: {
        outline: 0,
        boxShadow: 'outline',
    },
};

const baseStyleHeader = {
    px: 3,
    py: 2,
    borderBottomWidth: '1px',
};

const baseStyleBody = {
    px: 3,
    py: 2,
};

const baseStyleFooter = {
    px: 3,
    py: 2,
    borderTopWidth: '1px',
};

const baseStyle = {
    popper: baseStylePopper,
    content: baseStyleContent,
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
    arrow: {},
};

const popoverTheme = {
    parts,
    baseStyle,
};

export default popoverTheme;
