const parts = ['text', 'icon'];

const baseStyleText = {
    color: 'red.400',
    mt: 2,
    fontSize: 'md',
    fontWeight: 'semibold',
};

const baseStyleIcon = {
    marginEnd: '0.5em',
    color: 'red.500',
};

const baseStyle = {
    text: baseStyleText,
    icon: baseStyleIcon,
};

const formErrorTheme = {
    parts,
    baseStyle,
};

export default formErrorTheme;
