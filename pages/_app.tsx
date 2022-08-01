// Dependencies
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider } from '@chakra-ui/react';

// Styles
import theme from 'styles/theme';

// CustomApp
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    // States

    return (
        <>
            <Head>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>

            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
};

// Export
export default appWithTranslation(App);
