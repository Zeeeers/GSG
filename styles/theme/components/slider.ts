import { orient } from '@chakra-ui/theme-tools';

const parts = ['container', 'thumb', 'track', 'filledTrack'];

type Dict = Record<string, any>;

function thumbOrientation({ orientation }: Dict) {
    return orient({
        orientation,
        vertical: {
            left: '50%',
            transform: `translateX(-50%)`,
            _active: {
                transform: `translateX(-50%) scale(1.15)`,
            },
        },
        horizontal: {
            top: '50%',
            transform: `translateY(-50%)`,
            _active: {
                transform: `translateY(-50%) scale(1.15)`,
            },
        },
    });
}

const baseStyleContainer = ({ orientation }: Dict) => {
    return {
        _disabled: {
            opacity: 0.6,
            cursor: 'default',
            pointerEvents: 'none',
        },
        ...orient({
            orientation,
            vertical: { h: '100%' },
            horizontal: { w: '100%' },
        }),
    };
};

const baseStyleTrack = {
    borderRadius: 'sm',
    bg: 'gray.200',
    _disabled: {
        bg: 'gray.300',
    },
};

function baseStyleThumb(props: Dict) {
    return {
        zIndex: 1,
        borderRadius: 'full',
        bg: 'white.base',
        boxShadow: 'base',
        border: '1px solid',
        borderColor: 'transparent',
        transitionProperty: 'transform',
        transitionDuration: 'normal',
        _focus: { boxShadow: 'outline' },
        _disabled: { bg: 'gray.300' },
        ...thumbOrientation(props),
    };
}

function baseStyleFilledTrack({ colorSchema: c }: Dict) {
    return {
        bg: `${c}.500`,
    };
}

const baseStyle = (props: Dict) => ({
    container: baseStyleContainer(props),
    track: baseStyleTrack,
    thumb: baseStyleThumb(props),
    filledTrack: baseStyleFilledTrack(props),
});

function sizeLg(props: Dict) {
    return {
        thumb: { w: '16px', h: '16px' },
        track: orient({
            orientation: props.orientation,
            horizontal: { h: '4px' },
            vertical: { w: '4px' },
        }),
    };
}

function sizeMd(props: Dict) {
    return {
        thumb: { w: '14px', h: '14px' },
        track: orient({
            orientation: props.orientation,
            horizontal: { h: '4px' },
            vertical: { w: '4px' },
        }),
    };
}

function sizeSm(props: Dict) {
    return {
        thumb: { w: '10px', h: '10px' },
        track: orient({
            orientation: props.orientation,
            horizontal: { h: '2px' },
            vertical: { w: '2px' },
        }),
    };
}

const sizes = {
    lg: sizeLg,
    md: sizeMd,
    sm: sizeSm,
};

const defaultProps = {
    size: 'md',
    colorScheme: 'primary',
};

const sliderTheme = {
    parts,
    sizes,
    baseStyle,
    defaultProps,
};

export default sliderTheme;
