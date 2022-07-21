import { getColor } from '@chakra-ui/theme-tools';

const parts = ['field', 'addon'];

const baseStyle = {
    field: {
        width: '100%',
        color: 'gray.700',
        minWidth: 0,
        outline: 0,
        position: 'relative',
        appearance: 'none',
        transitionProperty: 'common',
        transitionDuration: 'normal',
    },
};

const size = {
    xl: {
        h: 14,
        fontSize: 'xl',
        px: 4,
        borderRadius: 'md',
    },

    lg: {
        h: 12,
        fontSize: 'lg',
        px: 4,
        borderRadius: 'md',
    },

    md: {
        h: 8,
        fontSize: 'md',
        px: '16px',
        borderRadius: 'md',
    },

    sm: {
        h: 8,
        fontSize: 'sm',
        px: 3,
        borderRadius: 'lg',
    },

    xs: {
        h: 6,
        fontSize: 'xs',
        px: 2,
        borderRadius: 'lg',
    },
};

const sizes = {
    xl: {
        field: size.xl,
        addon: size.xl,
    },

    lg: {
        field: size.lg,
        addon: size.lg,
    },

    md: {
        field: size.md,
        addon: size.md,
    },

    sm: {
        field: size.sm,
        addon: size.sm,
    },

    xs: {
        field: size.xs,
        addon: size.xs,
    },
};

function variantOutline({ theme, colorScheme: c }: Record<string, any>) {
    return {
        field: {
            border: '1px solid',
            borderColor: `gray.300`,
            bg: 'inherit',
            fontFamily: 'inter',

            _hover: {
                borderColor: `${c}.alpha.40`,
            },

            _focus: {
                zIndex: 1,
                borderColor: `${c}.500`,
                boxShadow: `0 0 0 1px ${getColor(theme, `${c}.500`)}`,
            },
            _readOnly: {
                boxShadow: 'none !important',
                userSelect: 'all',
            },
            _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',
            },
            _invalid: {
                borderColor: `danger.400`,
                boxShadow: `0 0 0 1px ${getColor(theme, `danger.400`)}`,
            },
        },
        addon: {
            border: '1px solid',
            borderColor: `gray.500`,
            bg: `gray.300`,
        },
    };
}

function variantFilled({ colorScheme: c }: Record<string, any>) {
    return {
        field: {
            border: '1px solid',
            borderColor: 'gray.300',
            bg: 'white',
            transitionProperty: 'common',
            transitionDuration: 'slower',
            color: 'gray.700',
            fontWeight: 'medium',
            _placeholder: {
                color: 'gray.500',
                fontWeight: 'regular',
            },
            _hover: {
                bg: 'gray.300',
            },

            _focus: {
                bg: 'white',
                borderColor: `${c}.500`,
            },

            _readOnly: {
                boxShadow: 'none !important',
                userSelect: 'all',
            },
            _disabled: {
                bg: 'gray.alpha.24',
                color: 'gray.500',
                cursor: 'not-allowed',
            },

            _invalid: {
                borderColor: `danger.400`,
            },
        },
        addon: {
            border: '2px solid',
            borderColor: 'transparent',
            bg: 'gray.300',
            textColor: 'gray.100',
            fontWeight: 'semibold',
        },
    };
}

function variantFlushed({ theme, colorScheme: c }: Record<string, any>) {
    return {
        field: {
            borderBottom: '2px solid',
            borderColor: 'inherit',
            borderRadius: 0,
            px: 0,
            bg: 'transparent',
            _readOnly: {
                boxShadow: 'none !important',
                userSelect: 'all',
            },
            _focus: {
                borderColor: `${c}.500`,
                boxShadow: `0px 1px 0px 0px ${getColor(theme, `${c}.500`)}`,
            },
            _invalid: {
                borderColor: 'danger.400',
                boxShadow: `0px 1px 0px 0px ${getColor(theme, 'danger.400')}`,
            },
        },

        addon: {
            borderBottom: '2px solid',
            borderColor: 'inherit',
            borderRadius: 0,
            px: 0,
            bg: 'transparent',
        },
    };
}

const variantControl = ({ theme, colorScheme: c }: Record<string, any>) => {
    return {
        field: {
            border: '1px solid',
            borderColor: `${c}.${c === 'white' ? 'base' : '500'}`,
            color: `${c}.${c === 'white' ? 'base' : '500'}`,
            bg: `${c}.alpha.24`,
            _placeholder: {
                color: `gray.500`,
            },
            _focus: {
                borderColor: `${c}.500`,
                boxShadow: `0px 1px 0px 0px ${getColor(theme, `${c}.500`)}`,
            },
            _invalid: {
                borderColor: 'danger.400',
                boxShadow: `0px 1px 0px 0px ${getColor(theme, 'danger.400')}`,
            },
            _readOnly: {
                boxShadow: 'none !important',
                userSelect: 'all',
            },
        },
        addon: {
            borderBottom: '2px solid',
            borderColor: 'inherit',
            borderRadius: 0,
            paddingX: 0,
            bg: 'transparent',
        },
    };
};

const variantUnstyled = {
    field: {
        bg: 'transparent',
        px: 0,
        height: 'auto',
    },
    addon: {
        bg: 'transparent',
        px: 0,
        height: 'auto',
    },
};

const variants = {
    outline: variantOutline,
    filled: variantFilled,
    flushed: variantFlushed,
    control: variantControl,
    unstyled: variantUnstyled,
};

const defaultProps = {
    size: 'md',
    variant: 'filled',
    colorScheme: 'teal',
};

const inputTheme = {
    parts,
    baseStyle,
    sizes,
    variants,
    defaultProps,
};

export default inputTheme;
