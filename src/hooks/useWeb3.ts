import Web3 from 'web3';

const useWeb3 = () => {
  const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
  return web3;
};

export default useWeb3;
