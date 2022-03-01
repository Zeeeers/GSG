type Dict = Record<string, any>;

const parts = ['container', 'title', 'description', 'icon'];

const baseStyle = {
    container: {
        px: 4,
        py: 3,
    },
    title: {
        fontWeight: 'bold',
        lineHeight: 6,
        mr: 2,
    },
    description: {
        lineHeight: 6,
    },
    icon: {
        flexShrink: 0,
        marginEnd: 3,
        w: 5,
        h: 6,
    },
};

function variantSubtle({ colorScheme: c }: Dict) {
    return {
        container: { bg: `${c}.100` },
        icon: { color: `${c}.500` },
    };
}

function variantLeftAccent({ colorScheme: c }: Dict) {
    return {
        container: {
            paddingStart: 3,
            borderStartWidth: '6px solid',
            borderStartColor: `${c}.500`,
            bg: `${c}.100`,
        },
        icon: {
            color: `${c}.500`,
        },
    };
}

function variantTopAccent({ colorScheme: c }: Dict) {
    return {
        container: {
            pt: 2,
            borderTopWidth: '6px solid',
            borderTopColor: `${c}.500`,
            bg: `${c}.100`,
        },
        icon: {
            color: `${c}.500`,
        },
    };
}

function variantSolid({ colorScheme: c }: Dict) {
    return {
        container: {
            bg: `${c}.500`,
            color: `white.base`,
        },
    };
}

const variants = {
    subtle: variantSubtle,
    'left-accent': variantLeftAccent,
    'top-accent': variantTopAccent,
    solid: variantSolid,
};

const defaultProps = {
    variant: 'subtle',
    colorScheme: 'blue',
};

const alertTheme = {
    parts,
    baseStyle,
    variants,
    defaultProps,
};

export default alertTheme;
