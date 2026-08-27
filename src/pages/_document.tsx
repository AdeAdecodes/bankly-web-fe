import { EmotionCache } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import NextDocument, {
  DocumentContext,
  DocumentProps as NextDocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import theme from '~/theme';
import createEmotionCache from '~/utils/create-emotion-cache';

type DocumentProps = NextDocumentProps & {
  // eslint-disable-next-line no-undef
  emotionStyleTags: JSX.Element[];
};

class Document extends NextDocument<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createEmotionCache();
    const originalRenderPageFn = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPageFn({
        enhanceApp: (App: any) =>
          function EnhancedApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      emotionStyleTags: getEmotionStyleTagsFromHTML(initialProps.html, cache),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/favicon-48.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="theme-color" content={theme.palette.primary.dark} />
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

function getEmotionStyleTagsFromHTML(html: string, cache: EmotionCache) {
  const emotionServer = createEmotionServer(cache);
  const extractedData = emotionServer.extractCriticalToChunks(html);

  return extractedData.styles.map((style) => (
    <style
      key={style.key}
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
}

export default Document;
