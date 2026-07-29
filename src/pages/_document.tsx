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
import Script from 'next/script';
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
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="emotion-insertion-point" content="" />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <Script
            strategy="beforeInteractive"
            src="https://static.simpu.co/widgets/v1/simpu-widget.js"
          />
          <Script id="simpu-script" strategy="afterInteractive">
            {`
              let widget = window.Simpu.default.init({
                app_id: '927b4098',
                public_key:
                  'spk__ypCa5wmrTXdF2dcKpbSaKl4yIM3tdmmjyPiLYtGyH38BvMySt2',
              });

              widget.render();
            `}
          </Script> */}
          <Script
            id="zoho-salesiq-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              var $zoho = $zoho || {};
              $zoho.salesiq = $zoho.salesiq || {
                widgetcode: "siq13b051be319dcb1e1c1cc2540333b378203dafa28f04096a6f97e4865021caaa",
                values: {},
                ready: function() {}
              };
              (function() {
                var d = document;
                var s = d.createElement("script");
                s.type = "text/javascript";
                s.id = "zsiqscript";
                s.defer = true;
                s.src = "https://salesiq.zoho.com/widget";
                var t = d.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(s, t);
                d.write("<div id='zsiqwidget'></div>");
              })();
            `,
            }}
          />
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
