/* eslint-disable no-nested-ternary */
import getSymbolFromCurrency from 'currency-symbol-map';
import currency from 'currency.js';

export default class CurrencyUtils {
  public static abbreviator = (num: number, dec: number) => {
    // 2 decimal places => 100, 3 => 1000, etc
    const decPlaces = 10 ** dec;
    let number = num;
    // Enumerate number abbreviations
    const abbrev = ['K', 'M', 'B', 'T'];

    let i = abbrev.length - 1;
    while (i >= 0) {
      const size = 10 ** ((i + 1) * 3);

      if (size <= number) {
        number = Math.round(number * (decPlaces / size)) / decPlaces;
        if (number === 1000 && i < abbrev.length - 1) {
          number = 1;
          i += 1;
        }
        number += abbrev[i] as any;
        break;
      }
      i -= 1;
    }
    return number;
  };

  public static formatByUnit = (
    value: number,
    unit: string | null,
    isCompacted = false,
    hasSymbol = true
  ) => {
    const showSign = unit !== 'BTC' && unit !== 'USDt' && unit !== 'BUSD';
    const symbol = unit ? `${unit} ` : '';
    if (value >= 1000000 && isCompacted) {
      // eslint-disable-next-line max-len
      return `${
        showSign && unit ? getSymbolFromCurrency(unit) : symbol
      } ${this.abbreviator(value, 2)}`;
    }
    switch (unit as any) {
      case 'VND':
        return currency(Math.round(value), {
          symbol:
            showSign && unit
              ? hasSymbol
                ? getSymbolFromCurrency(unit)
                : ''
              : symbol,
          separator: ',',
          decimal: '.',
          precision: 0,
        }).format();

      default:
        return currency(value, {
          symbol:
            showSign && unit
              ? hasSymbol
                ? getSymbolFromCurrency(unit)
                : ''
              : symbol,
          separator: ',',
          decimal: '.',
          precision: 2,
        }).format();
    }
  };

  public static getListCurrency() {
    return ['USD', 'VND', 'CAD'];
  }

  public static translateCurrency() {
    return {
      USD: { symbol: 'USD', text: 'US Dollar' },
      VND: { symbol: 'VND', text: 'Vietnamese Dong' },
      CAD: { symbol: 'CAD', text: 'Canadian Dollar' },
    };
  }
}
