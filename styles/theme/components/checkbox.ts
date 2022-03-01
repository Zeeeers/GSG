const parts = ['container', 'control', 'label', 'icon'];

function baseStyleControl({ colorScheme: c }: Record<string, any>) {
    const filledStyles = {
        bg: `${c}.${c === 'white' ? 'base' : '500'}`,
        borderColor: `${c}.${c === 'white' ? 'base' : '500'}`,
        color: `${c === 'white' ? 'black' : 'white'}.base`,

        _hover: {
            bg: `${c}.${c === 'white' ? 'alpha.48' : '400'}`,
            borderColor: `${c}.400`,
            boxShadow: `${c}.${c === 'white' ? 'hoverOutline' : 'none'}`,
        },

        _focus: {
            borderColor: `${c}.${c === 'white' ? 'base' : '700'}`,
            bgColor: `${c}.${c === 'white' ? 'base' : '500'}`,
            boxShadow: 'outline',
        },

        _disabled: {
            bg: 'gray.alpha.48',
            borderColor: 'gray.400',
            boxShadow: 'none',
            color: 'white.base',
        },
    };

    return {
        w: '100%',
        transitionProperty: 'box-shadow',
        transitionDuration: 'normal',
        border: '1px solid',
        borderRadius: '3px',
        borderColor: 'gray.400',
        color: 'white.base',
        bgColor: 'gray.alpha.16',
        fontWeight: 'medium',

        _hover: {
            borderColor: `${c}.${c === 'white' ? 'base' : '500'}`,
            bgColor: `${c}.alpha.${c === 'white' ? '32' : '16'}`,
            boxShadow: 'hoverOutline',
        },

        _focus: {
            borderColor: `${c === 'white' ? 'white' : 'gray'}.500`,
            bgColor: `${c === 'white' ? 'white' : 'gray'}.alpha.40`,
            boxShadow: 'outline',
        },

        _invalid: {
            borderColor: 'danger.500',
        },

        _disabled: {
            bg: 'gray.alpha.8',
            borderColor: 'gray.400',
            boxShadow: 'none',
        },

        _checked: filledStyles,

        _indeterminate: filledStyles,
    };
}

const baseStyleLabel = ({ colorScheme: c }: Record<string, any>) => {
    return {
        userSelect: 'none',
        _disabled: { opacity: 0.4 },
        fontWeight: 'medium',
        color: `${c === 'white' ? 'white' : 'black'}.base`,
    };
};

const baseStyleIcon = {
    transitionProperty: 'transform',
    transitionDuration: 'normal',
};

const baseStyle = (props: Record<string, any>) => ({
    icon: baseStyleIcon,
    control: baseStyleControl(props),
    label: baseStyleLabel(props),
});

const sizes = {
    sm: {
        control: { h: 3, w: 3 },
        label: { fontSize: 'sm' },
        icon: { fontSize: '0.45rem' },
    },
    md: {
        control: { w: 4, h: 4 },
        label: { fontSize: 'md' },
        icon: { fontSize: '0.625rem' },
    },
    lg: {
        control: { w: 5, h: 5 },
        label: { fontSize: 'lg' },
        icon: { fontSize: '0.625rem' },
    },
};

const defaultProps = {
    size: 'md',
    colorScheme: 'primary',
};

const checkboxTheme = {
    parts,
    baseStyle,
    sizes,
    defaultProps,
};

export default checkboxTheme;
