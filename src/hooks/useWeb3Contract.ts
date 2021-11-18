import useWeb3 from './useWeb3';

const useWeb3Contract = (
  address: string,
  ABI: any,
  options?: {
    from: any;
    to: any;
    value: any;
  }
) => {
  const web3 = useWeb3();
  const contract = new web3.eth.Contract(ABI, address, options);
  return contract;
};

export default useWeb3Contract;
