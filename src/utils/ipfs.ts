export default class IPFSUtils {
  static readonly ALLOWED_IPFS_PROTOCOLS = ['ipfs', 'ipns'];

  static readonly ALLOWED_CID_PREFIX_V0 = 'Qm';

  static readonly ALLOWED_CID_PREFIX_V1 = 'ba';

  /**
   * Retrieve artifacts of IPFS URL Scheme (Protocol, Content ID)
   *
   * @param url
   * @returns
   */
  public static getArtifacts(url: string) {
    if (this.isValidIPFSScheme(url) === false) {
      throw new Error('ERROR! Unexpected format of IPFS URL Scheme');
    }
    const [protocol, CID] = url.split('://');
    return {
      protocol,
      CID,
    };
  }

  public static getGatewayURL(url: string) {
    const { CID, protocol } = this.getArtifacts(url);
    return `${process.env.PINATA_GATEWAY_URL}/${protocol}/${CID}`;
  }

  public static isValidIPFSScheme(url: string) {
    const [protocol, CID] = url.split('://');
    // Check CID
    if (
      !CID.startsWith(this.ALLOWED_CID_PREFIX_V0) &&
      !CID.startsWith(this.ALLOWED_CID_PREFIX_V1)
    ) {
      return false;
    }
    // Check protocol
    if (!protocol || !this.ALLOWED_IPFS_PROTOCOLS.includes(protocol)) {
      return false;
    }
    return true;
  }
}
