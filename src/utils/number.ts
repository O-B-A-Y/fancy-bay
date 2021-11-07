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
}
export default NumberUtils;
