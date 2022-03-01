const parts = ['requiredIndicator', 'helperText'];

const baseStyleRequiredIndicator = {
    marginStart: 1,
    color: 'danger.500',
};

const baseStyleHelperText = {
    mt: 2,
    color: 'gray.500',
    lineHeight: '3',
    fontSize: 'sm',
};

const baseStyle = {
    requiredIndicator: baseStyleRequiredIndicator,
    helperText: baseStyleHelperText,
};

const formTheme = {
    parts,
    baseStyle,
};

export default formTheme;
