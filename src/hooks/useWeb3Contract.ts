import Web3 from 'web3';

const useWeb3Contract = (
  address: string | undefined,
  ABI: any,
  options?: {
    from: any;
    to: any;
    value: any;
  }
) => {
  const web3 = new Web3(Web3.givenProvider || 'https://localhost:8545');
  const contract = new web3.eth.Contract(ABI, address, options);
  return contract;
};

export default useWeb3Contract;
