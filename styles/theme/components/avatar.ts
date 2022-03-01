import { isDark, randomColor } from '@chakra-ui/theme-tools';

const parts = ['container', 'excessLabel', 'badge', 'label'];

const baseStyleBadge = {
    transform: 'translate(25%, 25%)',
    borderRadius: 'full',
    border: '0.2em solid',
    borderColor: 'white.base',
};

const baseStyleExcessLabel = {
    bg: 'gray.200',
};

function baseStyleContainer({ name, theme }: Record<string, any>) {
    const bg = name ? randomColor({ string: name }) : 'gray.400';
    const isBgDark = isDark(bg)(theme);

    let color = 'white.base';
    if (!isBgDark) color = 'gray.800';

    const borderColor = 'white.base';

    return {
        bg,
        color,
        borderColor,
        verticalAlign: 'top',
    };
}

const baseStyle = (props: Record<string, any>) => ({
    badge: baseStyleBadge,
    excessLabel: baseStyleExcessLabel,
    container: baseStyleContainer(props),
});

const defaultProps = {
    size: 'md',
};

const avatarTheme = {
    parts,
    baseStyle,
    defaultProps,
};

export default avatarTheme;
