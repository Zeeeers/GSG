import { generateStripe, getColor } from '@chakra-ui/theme-tools';

type Dict = Record<string, any>;

const parts = ['track', 'filledTrack', 'label'];

function filledStyle({ colorScheme: c, theme: t, isIndeterminate, hasStripe }: Dict) {
    const stripeStyle = generateStripe();
    const bgColor = (c as string).includes('#') ? c : `${c}.500`;

    const gradient = `linear-gradient(to right, transparent 0%, ${getColor(t, bgColor)} 50%, transparent 100%)`;

    const addStripe = !isIndeterminate && hasStripe;

    return {
        ...(addStripe && stripeStyle),
        ...(isIndeterminate ? { bgImage: gradient } : { bgColor }),
    };
}

const baseStyleLabel = {
    lineHeight: '1',
    fontSize: '0.25em',
    fontWeight: 'bold',
    color: 'white.base',
};

const baseStyleTrack = {
    bg: `gray.100`,
};

function baseStyleFilledTrack(props: Dict) {
    return {
        transitionProperty: 'common',
        transitionDuration: 'slow',
        ...filledStyle(props),
    };
}

const baseStyle = (props: Dict) => ({
    label: baseStyleLabel,
    filledTrack: baseStyleFilledTrack(props),
    track: baseStyleTrack,
});

const sizes = {
    xs: {
        track: { h: '0.25rem' },
    },
    sm: {
        track: { h: '0.5rem' },
    },
    md: {
        track: { h: '0.75rem' },
    },
    lg: {
        track: { h: '1rem' },
    },
};

const defaultProps = {
    size: 'md',
    colorScheme: 'primary',
};

const progressTheme = {
    parts,
    sizes,
    baseStyle,
    defaultProps,
};

export default progressTheme;
