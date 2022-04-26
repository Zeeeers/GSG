import { getColor, mode } from '@chakra-ui/theme-tools';

const parts = ['root', 'tablist', 'tab', 'tabpanels', 'tabpanel', 'indicator'];

type Dict = Record<string, any>;

function baseStyleRoot({ orientation }: Dict) {
    return {
        display: orientation === 'vertical' ? 'flex' : 'block',
    };
}

function baseStyleTab({ isFitted }: Dict) {
    return {
        flex: isFitted ? 1 : undefined,
        transitionProperty: 'common',
        transitionDuration: 'normal',
        _focus: {
            zIndex: 1,
            boxShadow: 'outline',
        },
    };
}

function baseStyleTablist({ align = 'start', orientation }: Dict) {
    const alignments = {
        end: 'flex-end',
        center: 'center',
        start: 'flex-start',
    };

    return {
        justifyContent: alignments[align as 'start' | 'center' | 'end'],
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
    };
}

const baseStyleTabpanel = { p: 4 };

const baseStyle = (props: Dict) => ({
    root: baseStyleRoot(props),
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel,
});

const sizes = {
    sm: {
        tab: {
            py: 1,
            px: 4,
            fontSize: 'sm',
        },
    },
    md: {
        tab: {
            fontSize: 'md',
            py: 2,
            px: 4,
        },
    },
    lg: {
        tab: {
            fontSize: 'lg',
            py: 3,
            px: 4,
        },
    },
};

function variantSolid({ colorScheme: c }: Dict) {
    return {
        tab: {
            borderRadius: 'lg',
            fontWeight: 'medium',
            color: 'gray.500',
            fontSize: 'md',

            _hover: {
                bg: 'gray.alpha.8',
            },

            _selected: {
                color: `white.base`,
                bg: c === 'black' ? `${c}.base` : `${c}.600`,
            },

            _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',

                _hover: {
                    bg: 'transparent',
                },
            },
        },
    };
}

const variantSquareSolid = ({ colorScheme: c }: Dict): unknown => {
    return {
        tab: {
            borderRadius: 'lg',
            fontWeight: 'semibold',
            color: 'black.base',
            fontSize: 'lg',
            bgColor: 'white.base',
            shadow: 'sm',

            _hover: {
                bgColor: `gray.100`,
            },

            _selected: {
                color: `white.base`,
                bg: `${c}.500`,
            },

            _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',

                _hover: {
                    bg: 'transparent',
                },
            },
        },
    };
};

function variantRoundedSolid({ colorScheme: c }: Dict) {
    return {
        tab: {
            borderRadius: 'full',
            fontWeight: 'medium',
            color: c === 'black' ? 'black.base' : 'gray.500',
            fontSize: 'md',
            bgColor: c === 'black' ? `gray.200` : 'none',

            _hover: {
                bg: c === 'black' ? 'gray.alpha.24' : 'gray.alpha.8',
            },

            _selected: {
                color: `white.base`,
                bg: c === 'black' ? `${c}.base` : `${c}.600`,
            },

            _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',

                _hover: {
                    bg: 'transparent',
                },
            },
        },
    };
}

function variantLine({ colorScheme: c, orientation }: Dict) {
    const isVertical = orientation === 'vertical';
    const borderProp = orientation === 'vertical' ? 'borderStart' : 'borderBottom';
    const marginProp = isVertical ? 'marginStart' : 'marginBottom';

    return {
        tablist: {
            [borderProp]: '2px solid',
            borderColor: 'inherit',
        },
        tab: {
            [borderProp]: '4px solid',
            borderColor: 'transparent',
            fontWeight: 'semibold',
            [marginProp]: '-2px',
            _hover: {
                bg: 'gray.alpha.8',
                borderTopRadius: '2xl',
            },
            _selected: {
                color: `${c}.200`,
                borderColor: 'currentColor',
            },
            _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',

                _hover: {
                    bg: 'transparent',
                },
            },
            _active: {
                bg: 'gray.200',
            },
        },
    };
}

function variantEnclosed(props: Dict) {
    const { colorScheme: c } = props;
    return {
        tab: {
            borderTopRadius: 'md',
            border: '1px solid',
            borderColor: 'transparent',
            mb: '-1px',
            _selected: {
                color: mode(`${c}.600`, `${c}.300`)(props),
                borderColor: 'inherit',
                borderBottomColor: mode(`white`, `gray.800`)(props),
            },
        },
        tablist: {
            mb: '-1px',
            borderBottom: '1px solid',
            borderColor: 'inherit',
        },
    };
}

function variantEnclosedColored(props: Dict) {
    const { colorScheme: c } = props;
    return {
        tab: {
            border: '1px solid',
            borderColor: 'inherit',
            bg: mode(`gray.50`, `whiteAlpha.50`)(props),
            mb: '-1px',
            _notLast: {
                marginEnd: '-1px',
            },
            _selected: {
                bg: mode(`white`, 'gray.800')(props),
                color: mode(`${c}.600`, `${c}.300`)(props),
                borderColor: 'inherit',
                borderTopColor: 'currentColor',
                borderBottomColor: 'transparent',
            },
        },
        tablist: {
            mb: '-1px',
            borderBottom: '1px solid',
            borderColor: 'inherit',
        },
    };
}

function variantSoftRounded({ colorScheme: c, theme }: Dict) {
    return {
        tab: {
            borderRadius: 'full',
            fontWeight: 'semibold',
            color: 'gray.600',
            _selected: {
                color: getColor(theme, `${c}.700`),
                bg: getColor(theme, `${c}.100`),
            },
        },
    };
}

function variantSolidRounded({ colorScheme: c }: Dict) {
    return {
        tab: {
            borderRadius: 'full',
            fontWeight: 'semibold',
            color: 'gray.600',
            _selected: {
                color: `white`,
                bg: `${c}.600`,
            },
        },
    };
}

const variantUnstyled = {};

const variants = {
    'rounded-solid': variantRoundedSolid,
    solid: variantSolid,
    line: variantLine,
    enclosed: variantEnclosed,
    'enclosed-colored': variantEnclosedColored,
    'soft-rounded': variantSoftRounded,
    'solid-rounded': variantSolidRounded,
    'square-solid': variantSquareSolid,
    unstyled: variantUnstyled,
};

const defaultProps = {
    size: 'md',
    variant: 'line',
    colorScheme: 'teal',
};

const tabsTheme = {
    parts,
    baseStyle,
    sizes,
    variants,
    defaultProps,
};

export default tabsTheme;
