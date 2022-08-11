// Dependencies
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

// Document Component
class CustomDocument extends Document {
    static getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        return Document.getInitialProps(ctx);
    }

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/favicon.png" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// Export
export default CustomDocument;
