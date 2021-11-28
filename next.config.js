/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
  images: {
    domains: ['res.cloudinary.com', 'gateway.pinata.cloud'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    TREASURE_BAY_FACTORY_CONTRACT_ADDRESS:
      process.env.TREASURE_BAY_FACTORY_CONTRACT_ADDRESS,
    OBAY_TREASURY_CONTRACT_ADDRESS: process.env.OBAY_TREASURY_CONTRACT_ADDRESS,
    OBAY_TOKEN_CONTRACT_ADDRESS: process.env.OBAY_TOKEN_CONTRACT_ADDRESS,
    PINATA_GATEWAY_URL: process.env.PINATA_GATEWAY_URL,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_API_SECRET: process.env.PINATA_API_SECRET,
    PINATA_API_JWT_TOKEN: process.env.PINATA_API_JWT_TOKEN,
    DEFI_PULSE_DATA_API_KEY: process.env.DEFI_PULSE_DATA_API_KEY,
  },
};
