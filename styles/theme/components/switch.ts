const parts = ['container', 'track', 'thumb'];

function baseStyleTrack({ colorScheme: c }: Record<string, any>) {
    return {
        borderRadius: 'full',
        p: '2px',
        width: 'var(--slider-track-width)',
        height: 'var(--slider-track-height)',
        transitionProperty: 'common',
        transitionDuration: 'fast',
        bg: 'gray.alpha.16',
        borderColor: 'gray.500',
        _hover: {
            borderColor: `${c}.400`,
            bg: `${c}.alpha.16`,
        },
        _focus: {
            boxShadow: 'outline',
            bg: `gray.alpha.40`,
        },
        _disabled: {
            bg: `gray.alpha.24`,
            cursor: 'not-allowed',
        },
        _checked: {
            bg: `${c}.500`,
        },
    };
}

const baseStyleThumb = {
    bg: 'white.base',
    transitionProperty: 'transform',
    transitionDuration: 'normal',
    borderRadius: 'inherit',
    width: 'var(--slider-track-height)',
    height: 'var(--slider-track-height)',
    borderColor: 'gray.800',
    _checked: {
        transform: 'translateX(var(--slider-thumb-x))',
    },
};

const baseStyle = (props: Record<string, any>) => ({
    container: {
        '--slider-track-diff': 'calc(var(--slider-track-width) - var(--slider-track-height))',
        '--slider-thumb-x': 'var(--slider-track-diff)',
        _rtl: {
            '--slider-thumb-x': 'calc(-1 * var(--slider-track-diff))',
        },
    },
    track: baseStyleTrack(props),
    thumb: baseStyleThumb,
});

const sizes = {
    sm: {
        container: {
            '--slider-track-width': '1.375rem',
            '--slider-track-height': '0.75rem',
        },
    },
    md: {
        container: {
            '--slider-track-width': '1.875rem',
            '--slider-track-height': '1rem',
        },
    },
    lg: {
        container: {
            '--slider-track-width': '2.875rem',
            '--slider-track-height': '1.5rem',
        },
    },
};

const defaultProps = {
    size: 'lg',
    colorScheme: 'primary',
};

const switchTheme = {
    parts,
    baseStyle,
    sizes,
    defaultProps,
};

export default switchTheme;
