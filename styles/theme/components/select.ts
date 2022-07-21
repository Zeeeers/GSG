import { mergeWith as merge } from '@chakra-ui/utils';
import Input from './input';

const parts = ['field', 'icon'];

function baseStyleField() {
    return {
        ...Input.baseStyle.field,
        appearance: 'none',
        paddingBottom: '1px',
        lineHeight: 'normal',
        bg: 'white',
        color: 'gray.200',
        height: '40px',
    };
}

const baseStyleIcon = {
    width: '1.5rem',
    height: '100%',
    insetEnd: '0.5rem',
    position: 'relative',
    color: 'gray.200',
    fontSize: '1.25rem',
    _disabled: {
        opacity: 0.5,
    },
};

const baseStyle = () => ({
    field: baseStyleField(),
    icon: baseStyleIcon,
});

const sizes = merge({}, Input.sizes, {
    xs: {
        icon: {
            insetEnd: '0.25rem',
        },
    },
});

const selectTheme = {
    parts,
    baseStyle,
    sizes,
    variants: Input.variants,
    defaultProps: Input.defaultProps,
};

export default selectTheme;
