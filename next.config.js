/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    TREASURE_BAY_FACTORY_CONTRACT_ADDRESS:
      process.env.TREASURE_BAY_FACTORY_CONTRACT_ADDRESS,
    OBAY_TOKEN_CONTRACT_ADDRESS: process.env.OBAY_TOKEN_CONTRACT_ADDRESS,
  },
};
