import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export enum DevelopmentChainId {
  OPTION_1 = 5777,
  OPTION_2 = 1337,
}

export const supportedChainIds = [
  // ChainId.MAINNET, // mainnet
  ChainId.KOVAN, // kovan test net
  ChainId.MAINNET, // ropsten test net
  ChainId.ROPSTEN, // rinkeby test net
  ChainId.GÖRLI, // GÖRLI test net
];

const DevChainName = 'Devnet';

export const chainNetworkMapping: any = {
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.MAINNET]: 'Mainnet',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.GÖRLI]: 'Goerli',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MATIC]: 'MATIC',
  [DevelopmentChainId.OPTION_1]: DevChainName,
  [DevelopmentChainId.OPTION_2]: DevChainName,
};

const RPC = {
  [ChainId.MAINNET]:
    'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  [ChainId.ROPSTEN]:
    'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
  [ChainId.RINKEBY]:
    'https://eth-rinkeby.alchemyapi.io/v2/cd8f-av3Rvio5lLPzkpdcnLmMjISIl5n',
  [ChainId.KOVAN]:
    'https://eth-rinkeby.alchemyapi.io/v2/cd8f-av3Rvio5lLPzkpdcnLmMjISIl5n',
};

export default class Connector {
  // private static POLLING_INTERVAL = 12000;

  /** Metamask and other browser wallets */
  public static Injected = new InjectedConnector({
    supportedChainIds,
  });

  // mainnet only
  public static WalletConnect = new WalletConnectConnector({
    rpc: RPC,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    supportedChainIds,
    // pollingInterval: 15000,
  });
}

export const connectors = {
  Injected: {
    name: 'INJECTED',
    core: Connector.Injected,
  },
  WalletConnect: {
    name: 'WALLETCONNECT',
    core: Connector.WalletConnect,
  },
};
