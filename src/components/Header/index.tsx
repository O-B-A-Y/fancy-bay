import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import LogoIcon from '../../../public/icons/icon-74x68.png';
import MetamaskIcon from '../../../public/icons/metamask-icon-54x56.png';
import colors from '../../styles/colors.module.scss';
import styles from './Header.module.scss';

const mockWallet = {
  balance: 100,
  address: '0x18f16080a71d5f67fd1524410401323f297de438',
};

// eslint-disable-next-line arrow-body-style
const Header: React.FC = () => {
  return (
    <div>
      <ul className={styles.header}>
        {/* Left-side boxes */}
        <li className={styles.headerItem}>
          <Link href="/">
            <a className={styles.headerLogo}>
              <Image src={LogoIcon} width={37} height={34} />
              <span>BAY</span>
            </a>
          </Link>
        </li>
        <li className={styles.headerItem}>
          <Link href="/browse">
            <a className={styles.headerLink}>Browse</a>
          </Link>
        </li>
        <li className={styles.headerItem}>
          <Link href="/mybay">
            <a className={styles.headerLink}>MyBay</a>
          </Link>
        </li>
        <li className={styles.headerItem}>
          <Link href="/exchange">
            <a className={styles.headerLink}>Exchange</a>
          </Link>
        </li>
        {/* Filler box */}
        <li
          className={styles.headerItem}
          style={{
            flexGrow: 1,
          }}
        >
          {}
        </li>
        {/* Right-side boxes */}
        <li className={styles.headerItem}>
          <div className={styles.wallet}>
            <div className={styles.balance}>
              <span>{mockWallet.balance}</span>
              <Image src={LogoIcon} width={21} height={21} />
            </div>
            <div className={styles.address}>
              <p
                data-tip={mockWallet.address}
                data-for="address-tooltip"
                data-place="bottom"
              >
                {`${mockWallet.address.slice(0, 12)}...`}
              </p>
              <ReactTooltip
                id="address-tooltip"
                textColor={colors.dark0}
                backgroundColor={colors.dark800}
              />
            </div>
          </div>
        </li>
        <li
          className={styles.headerItem}
          style={{
            marginRight: 56,
          }}
        >
          <Image src={MetamaskIcon} width={27} height={28} />
        </li>
      </ul>
    </div>
  );
};

export default Header;
