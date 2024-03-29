const baseStyle = {
    transitionProperty: 'common',
    transitionDuration: 'fast',
    transitionTimingFunction: 'ease-out',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    _hover: {
        textDecoration: 'underline',
    },
    _focus: {
        boxShadow: 'outline',
    },
};

const linkTheme = {
    baseStyle,
};

export default linkTheme;
