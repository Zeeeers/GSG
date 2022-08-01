const baseStyle = {
    borderRadius: 'full',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    _hover: { bg: `gray.alpha.8` },
    _active: { bg: `black.alpha.16` },
    _focus: {
        boxShadow: 'none',
    },
};

const sizes = {
    lg: {
        w: '40px',
        h: '40px',
        fontSize: '16px',
    },
    md: {
        w: '32px',
        h: '32px',
        fontSize: '12px',
    },
    sm: {
        w: '24px',
        h: '24px',
        fontSize: '10px',
    },
};

const defaultProps = {
    size: 'md',
};

const closeButtonTheme = {
    baseStyle,
    sizes,
    defaultProps,
};

export default closeButtonTheme;
