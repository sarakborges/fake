import Document, { Html, Head, Main, NextScript } from "next/document";

import { getLangFromReq } from "Helpers";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = getLangFromReq(ctx.req);
    return { ...initialProps, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <meta
            name='Description'
            content='Build a PWA with Next.js to achieve 100 lighthouse score.'
          />

          <meta name='theme-color' content='#317EFB' />

          <link rel='icon' href='/icons/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

          <link
            href='/icons/favicon-16x16.png'
            rel='icon'
            type='image/png'
            sizes='16x16'
          />

          <link
            href='/icons/favicon-32x32.png'
            rel='icon'
            type='image/png'
            sizes='32x32'
          />

          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap'
            rel='stylesheet'
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

export default MyDocument;
