import { Web3ReactProvider } from '@web3-react/core';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import 'react-dropdown/style.css';
import { Provider } from 'react-redux';
import BayCreationModal from 'src/modals/BayCreationModal';
import NoContractModal from 'src/modals/NoContractModal';
import ProposalModal from 'src/modals/ProposalModal';
import { Web3ReactUtils } from 'src/utils';
import { store } from '../states/store';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

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
    <Web3ReactProvider getLibrary={Web3ReactUtils.getLibrary}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <ProposalModal />
        <NoContractModal />
        <BayCreationModal />
      </Provider>
    </Web3ReactProvider>
  );
};

export default MyApp;
