import Checkbox from './checkbox';

const parts = ['container', 'control', 'label'];

function baseStyleControl({ colorScheme: c }: Record<string, any>) {
    const filledStyles = {
        transition: 'all 250ms',
        bg: `${c === 'white' ? 'transparent' : 'white.base'}`,
        borderColor: `${c}.${c === 'white' ? 'base' : '500'}`,
        color: `${c === 'white' ? 'black' : 'white'}.base`,
        _before: {
            content: `""`,
            display: 'inline-block',
            pos: 'relative',
            w: '60%',
            h: '60%',
            borderRadius: '50%',
            bg: `${c}.${c === 'white' ? 'base' : '500'}`,
        },

        _hover: {
            bg: `transparent`,
            borderColor: `${c}.${c === 'white' ? 'base' : '400'}`,
            boxShadow: `${c === 'white' ? 'hoverOutline' : 'none'}`,
            _before: {
                content: `""`,
                display: 'inline-block',
                pos: 'relative',
                w: '60%',
                h: '60%',
                borderRadius: '50%',
                bg: `${c}.${c === 'white' ? 'alpha.48' : '400'}`,
            },
        },

        _focus: {
            bg: `gray.alpha.16`,
            boxShadow: 'outline',
        },

        _disabled: {
            bg: 'gray.gray.8',
            borderColor: 'gray.400',
            boxShadow: 'none',
            color: 'white',
            _before: {
                content: `""`,
                display: 'inline-block',
                pos: 'relative',
                w: '60%',
                h: '60%',
                borderRadius: '50%',
                bg: 'gray.alpha.48',
            },
        },
    };

    return {
        w: 'full',
        transition: 'all 250ms',
        border: '1px solid',
        borderRadius: 'full',
        borderColor: 'gray.400',
        color: 'white.base',
        bgColor: 'gray.alpha.16',
        fontWeight: 'medium',

        _hover: {
            borderColor: `${c}.${c === 'white' ? 'base' : '500'}`,
            bgColor: `${c}.alpha.${c === 'white' ? '32' : '16'}`,
            boxShadow: 'hoverOutline',
        },

        _invalid: {
            borderColor: 'danger.400',
        },

        _disabled: {
            bg: 'gray.alpha.8',
            borderColor: 'gray.400',
            boxShadow: 'none',
        },

        _checked: filledStyles,
    };
}

const baseStyle = (props: Record<string, any>) => ({
    label: Checkbox.baseStyle(props).label,
    control: baseStyleControl(props),
});

const sizes = {
    xl: {
        control: { w: 6, h: 6 },
        label: { fontSize: 'lg' },
    },

    md: {
        control: { w: 4, h: 4 },
        label: { fontSize: 'md' },
    },
    lg: {
        control: { w: 5, h: 5 },
        label: { fontSize: 'lg' },
    },
    sm: {
        control: { width: 3, height: 3 },
        label: { fontSize: 'sm' },
    },
};

const defaultProps = {
    size: 'md',
    colorScheme: 'primary',
};

const radioTheme = {
    parts,
    baseStyle,
    sizes,
    defaultProps,
};

export default radioTheme;
