class StringUtils {
  public static shortenAddress(s: string, length: number) {
    return `${s.slice(0, length - 1).trim()}...`;
  }

  public static convertToSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}

export default StringUtils;
