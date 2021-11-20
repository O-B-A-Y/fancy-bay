import { Web3ReactProvider } from '@web3-react/core';
import { setConfig } from 'cloudinary-build-url';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import 'react-dropdown/style.css';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import BayCreationModal from 'src/modals/BayCreationModal';
import ExchangeProposalModal from 'src/modals/ExchangeProposalModal';
import NoContractModal from 'src/modals/NoContractModal';
import ProposalCreationModal from 'src/modals/ProposalCreationModal';
import TransferProposalModal from 'src/modals/TransferProposalModal';
import { Web3ReactUtils } from 'src/utils';
import { store } from '../states/store';
import '../styles/globals.scss';

setConfig({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
});

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
        <ExchangeProposalModal />
        <TransferProposalModal />
        <NoContractModal />
        <BayCreationModal />
        <ProposalCreationModal />
      </Provider>
    </Web3ReactProvider>
  );
};

export default MyApp;
