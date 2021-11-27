declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    CLOUDINARY_CLOUD_NAME: string;
    TREASURE_BAY_FACTORY_CONTRACT_ADDRESS: string;
    OBAY_TOKEN_CONTRACT_ADDRESS: string;
    OBAY_TREASURY_CONTRACT_ADDRESS: string;
    PINATA_GATEWAY_URL: string;
    PINATA_API_KEY: string;
    PINATA_API_SECRET: string;
    PINATA_API_JWT_TOKEN: string;
  }
}
