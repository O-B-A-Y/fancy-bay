import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import { Web3Provider } from '@ethersproject/providers';

class Web3ReactUtils {
  public static getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
      return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    }
    if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    }
    if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect ||
      error instanceof UserRejectedRequestErrorFrame
    ) {
      return 'Please authorize this website to access your Ethereum account.';
    }
    return 'An unknown error occurred. Check the console for more details.';
  }

  public static getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }
}

export default Web3ReactUtils;
