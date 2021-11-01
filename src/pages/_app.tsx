import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../states/store';
import '../styles/globals.scss';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use layout defined at top-level if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
};

export default MyApp;
