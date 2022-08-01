import { extendTheme } from '@chakra-ui/react';
import components from './components';
import foundations from './foundations';
import styles from './styles';
import { ThemeConfig, ThemeDirection } from './theme.types';

const direction = 'ltr' as ThemeDirection;

const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    cssVarPrefix: 'skala',
};

export const theme = {
    direction,
    ...foundations,
    components,
    styles,
    config,
};

export type Theme = typeof theme;

/**
 * @deprecated
 * Duplicate theme type. Please use `Theme`
 */
export type DefaultChakraTheme = Theme;

export * from './theme.types';

export default extendTheme(theme as any);
