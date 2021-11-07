class StringUtils {
  public static shortenAddress(s: string, length: number) {
    return `${s.slice(0, length - 1).trim()}...`;
  }
}

export default StringUtils;
