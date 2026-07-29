import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PopupIsh } from '@xod/mui-popupish';
import { AppProps as NextAppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import ErrorPresenter from '~/components/generics/error-presenter';
import DefaultLayout from '~/components/layouts/default';
import DefaultGuard from '~/guards/default-guard';
import defineComponent, {
  resolveDefinedComponentProps,
} from '~/helpers/define-component';
import theme from '~/theme';
import { RecordLike } from '~/types';
import createEmotionCache from '~/utils/create-emotion-cache';
import useConstant from '~/utils/use-constant';

type AppProps = Omit<NextAppProps, 'Component' | 'pageProps'> & {
  emotionCache: EmotionCache;
  Component: NextAppProps['Component'] & { Layout?: never; Guard?: never };
  pageProps: RecordLike<{
    __state__?: unknown;
  }>;
};

const __emotionCache = createEmotionCache(); // used on the client

const __queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

function App({ emotionCache = __emotionCache, ...props }: AppProps) {
  const queryClient = useConstant(() => new QueryClient(__queryClientConfig));

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <NextNProgress color={theme.palette.primary.main} />
        <QueryClientProvider client={queryClient}>
          <ErrorPresenter>
            <ActivePage {...props} />
          </ErrorPresenter>
          <PopupIsh />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

type ActivePageProps = Omit<AppProps, 'emotionCache'>;

function ActivePage({ Component, pageProps }: ActivePageProps) {
  const Layout = defineComponent(Component.Layout || DefaultLayout, {});
  const Guard = defineComponent(Component.Guard || DefaultGuard, {});
  const resolve = resolveDefinedComponentProps;

  return (
    <Guard.Component {...resolve(Guard.props, pageProps)}>
      <Layout.Component {...resolve(Layout.props, pageProps)}>
        <Component {...pageProps} />
      </Layout.Component>
    </Guard.Component>
  );
}

export default App;
