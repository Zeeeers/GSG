const parts = ['text', 'icon'];

const baseStyleText = {
    color: 'danger.400',
    mt: 2,
    fontSize: 'md',
};

const baseStyleIcon = {
    marginEnd: '0.5em',
    color: 'danger.500',
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
