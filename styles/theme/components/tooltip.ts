const baseStyle = {
    '--tooltip-bg': `colors.black.base`,
    px: 2,
    py: 2,
    bg: 'var(--tooltip-bg)',
    '--popper-arrow-bg': 'var(--tooltip-bg)',
    color: 'white.base',
    borderRadius: 'lg',
    fontWeight: 'medium',
    pointerEvents: 'none',
    fontSize: 'md',
    boxShadow: 'md',
    maxW: '320px',
    zIndex: 'tooltip',
};

const tooltipTheme = {
    baseStyle,
};

export default tooltipTheme;
