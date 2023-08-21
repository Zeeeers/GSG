// Dependencies
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider } from '@chakra-ui/react';
import TagManager from 'react-gtm-module';

// Styles
import theme from 'styles/theme';
import { useEffect } from 'react';

// CustomApp
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    // States

    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-TVKW5HK5' });
    }, []);

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
