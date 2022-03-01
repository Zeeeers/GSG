import Input from './input';
import typography from '../foundations/typography';

const parts = ['root', 'field', 'stepper', 'stepperGroup'];

const { variants, defaultProps } = Input;

const baseStyleRoot = {
    '--number-input-stepper-width': '24px',
    '--number-input-field-padding': 'calc(var(--number-input-stepper-width) + 0.5rem)',
};

const baseStyleField = Input.baseStyle?.field;

const baseStyleStepperGroup = {
    width: 'var(--number-input-stepper-width)',
};

const baseStyleStepper = {
    borderStart: '1px solid',
    borderStartColor: 'inherit',
    color: 'inherit',
    _hover: {
        bg: 'gray.200',
    },
    _active: {
        bg: 'gray.300',
    },
    _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
    },
};

const baseStyle = {
    root: baseStyleRoot,
    field: baseStyleField,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper,
};

type fontSizesType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

function getSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    const sizeStyle = Input.sizes[size];

    const radius = {
        xl: 'lg',
        lg: 'lg',
        md: 'lg',
        sm: 'sm',
        xs: 'sm',
    };

    const resolvedFontSize = typography.fontSizes[sizeStyle.field.fontSize as fontSizesType];

    return {
        field: {
            ...sizeStyle.field,
            paddingInlineEnd: 'var(--number-input-field-padding)',
            verticalAlign: 'top',
        },
        stepper: {
            fontSize: `calc(${resolvedFontSize} * 0.75)`,
            _first: {
                borderTopEndRadius: radius[size],
            },
            _last: {
                borderBottomEndRadius: radius[size],
                mt: '-1px',
                borderTopWidth: 1,
            },
        },
    };
}

const sizes = {
    xs: getSize('xs'),
    sm: getSize('sm'),
    md: getSize('md'),
    lg: getSize('lg'),
    xl: getSize('xl'),
};

const numberInputTheme = {
    parts,
    baseStyle,
    sizes,
    variants,
    defaultProps,
};

export default numberInputTheme;
