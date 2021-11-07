/* eslint-disable no-param-reassign */
class NumberUtils {
  public static formatSeparators(n: number) {
    return n.toLocaleString();
  }

  public static formatPercentage(n: number) {
    return `${n}%`;
  }

  public static formatRank(n: number) {
    return `#${n}`;
  }

  public static truncate(num: number | string, unit: number) {
    num = num.toString(); // If it's not already a String
    num = num.slice(0, num.indexOf('.') + unit); // With 3 exposing the hundredths place
    return Number(num); // If you need it back as a Number
  }
}
export default NumberUtils;
