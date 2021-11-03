import { Currency, CurrencyAmount, Token } from '@sushiswap/sdk';
import { useMemo } from 'react';
import { TokenBalancesMap } from './types';

export const useETHBalances = (
  addresses: (string | undefined)[]
): {
  [address: string]: CurrencyAmount<Currency>;
} => {
  return {};
};

export const useTokenBalances = (
  address?: string,
  tokens?: (Token | undefined)[]
): TokenBalancesMap => {
  const balances = {};
  /** Handle get balance of list of tokens */
  return balances;
};

/** Get the balance for a single token/account combo */
export const useTokenBalance = (
  address: string | undefined,
  tokens: (Token | undefined)[]
): TokenBalancesMap => {
  const balances = useTokenBalances(address, tokens);
  return balances;
};

export const useCurrencyBalances = (
  account?: string,
  currencies?: (Currency | undefined)[]
) => {
  /** Check if the currency is valid as token */
  const tokens = useMemo(
    () =>
      currencies?.filter(
        (currency): currency is Token => currency?.isToken ?? false
      ) ?? [],
    currencies
  );

  /** Get the balance of list of tokens */
  const tokenBalances = useTokenBalance(account, tokens);
  /** Check if there are any native token (ETH) */
  const containsETH: boolean = useMemo(
    () => currencies?.some((currency) => currency?.isNative) ?? false,
    [currencies]
  );
  /** Get the balance of list of native tokens */
  const ethBalance = useETHBalances(containsETH ? [account] : []);
  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined;
        if (currency.isToken) return tokenBalances[currency.address];
        if (currency.isNative) return ethBalance[account];
        return undefined;
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  );
};

export const useCurrencyBalance = (account: string, currency: Currency) => {
  useCurrencyBalances(account, [currency])[0];
};

export default useCurrencyBalance;
