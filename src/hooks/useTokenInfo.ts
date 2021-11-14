import {
  ENVIRONMENT,
  Token,
  TokenAllowed,
  TokenMapAddress,
} from 'src/constants/token';
import { Erc20 } from 'src/constants/abis/erc20';
import React from 'react';
import Web3Utils from 'src/utils/web3';
import { useAppSelector } from 'src/states/hooks';
import useWeb3Contract from './useWeb3Contract';
import ERC20_ABI from '../constants/abis/erc20.json';

export default function useTokenInfo(
  tokenName: TokenAllowed,
  callback?: (success: boolean, error: any) => void
): Token | undefined {
  const { data } = useAppSelector((state) => state.walletSlice);
  const tokenAddress =
    TokenMapAddress[
      data.environment.isDevelopment
        ? ENVIRONMENT.DEVELOPMENT
        : ENVIRONMENT.PRODUCTION
    ]?.[tokenName];
  const [tokenInfo, setTokenInfo] = React.useState<Token>();
  const { account, chainId } = data.environment;
  const TokenContract = useWeb3Contract(tokenAddress, ERC20_ABI);
  React.useEffect(() => {
    const fetchBalance = async (): Promise<any> => {
      try {
        if (TokenContract) {
          const [balance, name, decimals, symbol] = await Promise.all<any>([
            (TokenContract.methods as Erc20)
              .balanceOf(account as string)
              .call(),
            (TokenContract.methods as Erc20).name().call(),
            (TokenContract.methods as Erc20).decimals().call(),
            (TokenContract.methods as Erc20).symbol().call(),
          ]);
          if (balance && name && decimals) {
            setTokenInfo({
              address: tokenAddress as any,
              balance: Web3Utils.convertFromWei(balance?.toString()),
              decimals,
              name,
              symbol,
            });
          }
        } else {
          return callback?.(false, '');
        }
        return callback?.(true, null);
      } catch (error: any) {
        console.log(error.message);
        return callback?.(false, error);
      }
    };
    fetchBalance();
  }, [account, chainId, tokenAddress]);

  return tokenInfo;
}
