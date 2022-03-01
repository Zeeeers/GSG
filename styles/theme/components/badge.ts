import { getColor } from '@chakra-ui/theme-tools';

const baseStyle = {
    px: 3,
    py: 1,
    borderRadius: 'full',
    textTransform: 'none',
    fontSize: 'md',
    fontWeight: 'medium',
};

function variantSolid({ colorScheme: c }: Record<string, any>) {
    return {
        bg: c === 'basic' ? `gray.200` : `${c}.500`,
        color: c === 'basic' ? `black.base` : `white.base`,
        shadow: c === 'basic' ? 'xs' : 'none',
    };
}

function variantSubtle({ colorScheme: c }: Record<string, any>) {
    return {
        bg: `${c}.alpha.8`,
        color: `${c}.500`,
    };
}

function variantOutline({ colorScheme: c, theme }: Record<string, any>) {
    return {
        bg: `${c}.alpha.8`,
        color: `${c}.500`,
        boxShadow: `inset 0 0 0px 1px ${getColor(theme, `${c}.500`)}`,
    };
}

const variants = {
    solid: variantSolid,
    subtle: variantSubtle,
    outline: variantOutline,
};

const defaultProps = {
    variant: 'subtle',
    colorScheme: 'primary',
};

const badgeTheme = {
    baseStyle,
    variants,
    defaultProps,
};

export default badgeTheme;
