import { Fragment } from 'react'
import { CssBaseline } from '@geist-ui/core'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()
    return {
      ...initialProps,
      styles: [
        <Fragment key="1">
          {initialProps.styles}
          {styles}
        </Fragment>,
      ],
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body className="flex w-full flex-col items-center font-display">
          <div className="flex min-h-screen w-full max-w-4xl flex-col">
            <Main />
          </div>
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if (!window.localStorage) return;
                  if (window.localStorage.getItem('theme') === 'dark') {
                    document.documentElement.style.background = '#000';
                    document.body.style.background = '#000';
                  } else {
                    document.documentElement.style.background = '#fff';
                    document.body.style.background = '#fff';
                  }
                })()
              `,
            }}
          />
        </body>
      </Html>
    )
  }
}
