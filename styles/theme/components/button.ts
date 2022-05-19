type Dict = Record<string, any>;

const baseStyle = {
    lineHeight: '1.2',
    borderRadius: 'md',
    fontWeight: 'medium',
    fontFamily: 'inter',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _focus: {
        boxShadow: 'outline',
    },
    _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    _hover: {
        _disabled: {
            bg: 'initial',
        },
    },
};

function variantGhost({ colorScheme: c }: Dict) {
    const disabledStyles = {
        bg: 'gray.alpha.24',
        color: 'gray.600',
        borderColor: 'gray.alpha.24',
        cursor: 'not-allowed',
        boxShadow: 'none',
    };

    return {
        color: `${c}.600`,
        bg: 'transparent',
        _hover: {
            bg: `gray.alpha.8`,
            _disabled: disabledStyles,
        },
        _active: {
            bg: `gray.alpha.16`,
        },
        _focus: {
            border: `1px`,
            borderColor: `gray.alpha.40`,
            bg: `gray.alpha.24`,
        },
        _disabled: disabledStyles,
    };
}

function variantOutline({ colorScheme: c }: Dict) {
    const disabledStyles = {
        bg: 'gray.alpha.24',
        color: 'gray.600',
        borderColor: 'gray.alpha.24',
        cursor: 'not-allowed',
        boxShadow: 'none',
    };

    return {
        border: '1px solid',
        borderColor: `gray.300`,
        color: 'gray.50',
        bg: `transparent`,
        _hover: {
            borderColor: `${c}.500`,
            color: `${c}.500`,
            bgColor: `transparent`,
            _disabled: disabledStyles,
        },
        _active: {
            bg: `transparent`,
        },
        _disabled: disabledStyles,
    };
}

function variantSolid({ colorScheme: c }: Dict) {
    const disabledStyles = {
        bg: 'blackAlpha.32',
        color: 'gray.700',
        cursor: 'not-allowed',
        boxShadow: 'none',
    };

    if (c === 'basic') {
        return {
            bg: `gray.200`,
            color: `gray.700`,
            _hover: {
                bg: `blackAlpha.70`,
                _disabled: disabledStyles,
            },
            _active: {
                bg: `gray.alpha.16`,
            },
            _focus: {
                bg: `gray.alpha.24`,
            },
            _disabled: disabledStyles,
        };
    }

    if (c === 'control') {
        return {
            bg: `white`,
            color: `gray.700`,
            _hover: {
                bg: `gray.100`,
                _disabled: disabledStyles,
            },
            _active: {
                bg: `gray.300`,
            },
            _focus: {
                bg: `white`,
                boxShadow: 'outline',
            },
            _disabled: disabledStyles,
        };
    }

    return {
        bg: `${c}.500`,
        color: 'white',
        _hover: {
            bg: `${c}.400`,
            _disabled: disabledStyles,
        },
        _active: { bg: `${c}.600` },
        _focus: { bg: `${c}.700` },
        _disabled: disabledStyles,
    };
}

function variantLink({ colorScheme: c }: Dict) {
    return {
        padding: 0,
        height: 'auto',
        lineHeight: 'normal',
        verticalAlign: 'baseline',
        color: `${c}.500`,
        fontWeight: 'semibold',
        _hover: {
            textDecoration: 'none',
            _disabled: {
                textDecoration: 'none',
            },
        },
        _active: {
            color: `${c}.700`,
        },
        _focus: {
            boxShadow: 'none',
        },
    };
}

const variantUnstyled = {
    bg: 'none',
    color: 'inherit',
    display: 'inline',
    lineHeight: 'inherit',
    m: 0,
    p: 0,
};

const variants = {
    ghost: variantGhost,
    outline: variantOutline,
    solid: variantSolid,
    link: variantLink,
    unstyled: variantUnstyled,
};

const sizes = {
    xl: {
        h: 14,
        minW: 14,
        fontSize: 'xl',
        px: 8,
    },
    lg: {
        h: 12,
        minW: 12,
        fontSize: 'lg',
        px: 6,
    },
    md: {
        h: '32px',
        minW: 10,
        fontSize: 'md',
        py: '5px',
        px: '12px',
    },
    sm: {
        h: 8,
        minW: 8,
        fontSize: 'sm',
        px: 3,
    },
    xs: {
        h: 6,
        minW: 6,
        fontSize: 'xs',
        px: 2,
    },
};

const defaultProps = {
    variant: 'outline',
    sizes: 'md',
    colorScheme: 'teal',
    fontFamily: 'inter',
};

const buttonTheme = {
    baseStyle,
    variants,
    sizes,
    defaultProps,
};

export default buttonTheme;
