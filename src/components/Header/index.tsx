import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactDropdown from 'react-dropdown';
import ReactTooltip from 'react-tooltip';
import { chainNetworkMapping, connectors } from 'src/connectors';
import useEagerConnect from 'src/hooks/useEagerConnect';
import useInactiveListener from 'src/hooks/useInactiveListener';
import LogoIcon from '../../../public/icons/icon-74x68.png';
import colors from '../../styles/colors.module.scss';
import { formatEther } from '@ethersproject/units';
import NoSSR from '../NoSSR';
import styles from './Header.module.scss';
import useActiveWeb3React from 'src/hooks/useActiveWeb3React';
import { switchConnector } from 'src/states/wallet/slice';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import ConnectorImage from '../ConnectorImage';

// eslint-disable-next-line arrow-body-style
const Header: React.FC = () => {
  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  const { data } = useAppSelector((state) => state.walletSlice);
  const dispatch = useAppDispatch();
  const [activating, setActivating] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    connector,
    account,
    activate,
    library,
    chainId,
    deactivate,
    active,
    error,
  } = useActiveWeb3React();
  const [balance, setBalance] = React.useState<any>();

  React.useEffect((): any => {
    if (!!account && !!library) {
      setLoading(true);
      let stale = false;

      library
        .getBalance(account)
        .then((_balance: any) => {
          if (!stale) {
            setBalance(formatEther(_balance));
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
    return () => {};
  }, [account, library, chainId]);

  /** Handle logic to make sure the connector is connected */
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  /** Handle the authorized injected web3 by using the custom useEagerConnect hook */
  const triedEager = useEagerConnect();
  /** Handle the logic to connect in reaction to certain events on the injected ethereum provider */
  useInactiveListener(!triedEager || !!activatingConnector);

  let disabled =
    !triedEager || !!activatingConnector || !!error || activatingConnector;

  const handler = {
    SelectConnector: () => {},
    ChangeDropDownValue: (value: keyof typeof connectors) => {
      const currentConnector = connectors[value].core;
      setActivating(currentConnector === activatingConnector);
      const connected = currentConnector === connector;
      disabled = disabled || connected;
      setActivatingConnector(currentConnector);
      activate(currentConnector);
      dispatch(switchConnector(value));
    },
  };

  const RenderLeftSidedBoxesContainer = () => (
    <>
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
    </>
  );

  const RenderRightSidedBoxesContainer = () => (
    <>
      <li className={styles.headerItem}>
        {!active || !data.connector ? (
          <ReactDropdown
            options={Object.keys(connectors)}
            onChange={({ value }) => handler.ChangeDropDownValue(value as any)}
            placeholder="Connect to wallet"
            placeholderClassName={styles.dropdown_placeholder}
            menuClassName={styles.dropdown_menu}
            controlClassName={styles.dropdown_base}
            className={styles.dropdown_container}
            disabled={!!disabled}
          />
        ) : (
          <>
            {chainId && (
              <div className={styles.network}>
                <p style={{ color: '#49fdc0' }}>
                  {chainNetworkMapping[chainId]}
                </p>
              </div>
            )}
            <button
              type="button"
              className={styles.wallet}
              onClick={handler.SelectConnector}
            >
              <div className={styles.balance}>
                <span>{parseFloat(balance).toFixed(2)}</span>
                <span style={{ marginLeft: 5 }}>Ξ</span>
              </div>
              <div className={styles.balance}>
                <span>100</span>
                <Image src={LogoIcon} width={21} height={21} />
              </div>
              <div className={styles.address}>
                <p
                  data-tip={account}
                  data-for="address-tooltip"
                  data-place="bottom"
                >
                  {`${account?.slice(0, 16)}...`}
                </p>
                <NoSSR>
                  <ReactTooltip
                    id="address-tooltip"
                    textColor={colors.dark0}
                    backgroundColor={colors.dark800}
                  />
                </NoSSR>
              </div>
            </button>
          </>
        )}
      </li>
      {active && data.connector && (
        <li
          className={styles.headerItem}
          style={{
            marginRight: 56,
          }}
        >
          <ConnectorImage width={27} height={27} />
        </li>
      )}
    </>
  );

  return (
    <div>
      <ul className={styles.header}>
        <RenderLeftSidedBoxesContainer />
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
        <RenderRightSidedBoxesContainer />
      </ul>
    </div>
  );
};

export default Header;
