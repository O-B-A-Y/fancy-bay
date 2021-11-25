import IPFSUtils from './ipfs';

export default class URLUtils {
  public static processValidURL(url: string) {
    // If IPFS Scheme
    if (IPFSUtils.isValidIPFSScheme(url)) {
      return IPFSUtils.getGatewayURL(url);
    }
    // Else return normal HTTP/HTTPS url
    return url;
  }
}
