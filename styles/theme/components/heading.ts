const baseStyle = {
    fontFamily: 'heading',
    fontWeight: 'bold',
};

const sizes = {
    '6xl': { fontSize: '6xl', lineHeight: '13' },
    '5xl': { fontSize: '5xl', lineHeight: '11' },
    '4xl': { fontSize: '4xl', lineHeight: '11' },
    '3xl': { fontSize: '3xl', lineHeight: '9' },
    '2xl': { fontSize: '2xl', lineHeight: '9' },
    xl: { fontSize: 'xl', lineHeight: '7' },
    lg: { fontSize: 'lg', lineHeight: '8' },
    md: { fontSize: 'md', lineHeight: '7' },
};

const defaultProps = {
    size: 'xl',
};

const headingTheme = {
    baseStyle,
    sizes,
    defaultProps,
};

export default headingTheme;
