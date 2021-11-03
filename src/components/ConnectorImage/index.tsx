/* eslint-disable react/prop-types */
import Image from 'next/image';
import { useAppSelector } from 'src/states/hooks';
import MetamaskIcon from '../../../public/icons/metamask-icon-54x56.png';

const ConnectorImage: React.FC<
  { width: number; height: number } & React.HTMLAttributes<HTMLDivElement>
> = ({ width, height }) => {
  const { data } = useAppSelector((state) => state.walletSlice);
  let image;
  switch (data.connector) {
    case 'Injected':
      image = MetamaskIcon;
      break;
    case 'WalletConnect':
    default:
      return <></>;
  }
  return <Image src={image} width={width} height={height} />;
};

export default ConnectorImage;
