/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
import { formatEther } from '@ethersproject/units';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactDropdown from 'react-dropdown';
import { FaTimes } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import { chainNetworkMapping, connectors } from 'src/connectors';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import TextInputVariant from 'src/constants/textInputVariant';
import { TokenMapAddress } from 'src/constants/token';
import useActiveWeb3React from 'src/hooks/useActiveWeb3React';
import useEagerConnect from 'src/hooks/useEagerConnect';
import useInactiveListener from 'src/hooks/useInactiveListener';
import useTokenInfo from 'src/hooks/useTokenInfo';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import { toggleNoContractModal } from 'src/states/modal/slice';
import { addToken, switchConnector } from 'src/states/wallet/slice';
import NumberUtils from 'src/utils/number';
import { Button, TextInput } from '..';
import LogoIcon from '../../../public/icons/icon-74x68.png';
import colors from '../../styles/colors.module.scss';
import ConnectorImage from '../ConnectorImage';
import NoSSR from '../NoSSR';
import styles from './Header.module.scss';

// eslint-disable-next-line arrow-body-style
const Header: React.FC = () => {
  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  const { data } = useAppSelector((state) => state.walletSlice);
  const dispatch = useAppDispatch();
  const [activating, setActivating] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);
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
  const tokenInfo = useTokenInfo(TokenMapAddress.OBAY, (success) => {
    dispatch(toggleNoContractModal(!success));
  });

  React.useEffect(() => {
    if (tokenInfo) {
      dispatch(addToken(tokenInfo));
    }
  }, [tokenInfo]);

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

  let disabled = !!activatingConnector || !!error || activatingConnector;

  const handler = {
    ChangeDropDownValue: (value: keyof typeof connectors) => {
      const currentConnector = connectors[value].core;
      setActivating(currentConnector === activatingConnector);
      const connected = currentConnector === connector;
      disabled = disabled || connected;
      setActivatingConnector(currentConnector);
      activate(currentConnector).then(() => {
        dispatch(switchConnector(value));
      });
    },
    Deactivate: () => {
      deactivate();
      dispatch(switchConnector(null));
    },
    OpenModal: () => setToggleModal(true),
    CloseModal: () => setToggleModal(false),
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
        <Link href="/my-bays">
          <a className={styles.headerLink}>MyBays</a>
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
          <div style={{ marginRight: 45 }}>
            <ReactDropdown
              options={Object.keys(connectors)}
              onChange={({ value }) =>
                handler.ChangeDropDownValue(value as any)
              }
              placeholder="Connect to wallet"
              placeholderClassName={styles.dropdown_placeholder}
              menuClassName={styles.dropdown_menu}
              controlClassName={styles.dropdown_base}
              className={styles.dropdown_container}
              // disabled={!!disabled}
            />
          </div>
        ) : loading || activating ? (
          <Loader type="ThreeDots" color="#49fdc0" height={30} width={30} />
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
              onClick={handler.OpenModal}
            >
              {balance && (
                <div className={styles.balance}>
                  <span>{NumberUtils.truncate(balance, 3)}</span>
                  <span style={{ marginLeft: 5 }}>Ξ</span>
                </div>
              )}

              {data.tokens.OBAY && (
                <div className={styles.balance}>
                  <span>
                    {NumberUtils.truncate(data.tokens.OBAY.balance, 3)}
                  </span>
                  <Image src={LogoIcon} width={21} height={21} />
                </div>
              )}

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
      <Modal
        isOpen={toggleModal}
        onRequestClose={handler.CloseModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: colors.dark800,
            color: 'white',
            border: `1px solid ${colors.dark600}`,
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,.53)',
          },
        }}
        contentLabel="Account"
      >
        <div style={{ width: 300 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3>Account</h3>
            <FaTimes
              style={{ cursor: 'pointer' }}
              onClick={handler.CloseModal}
            />
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <ReactDropdown
            options={Object.keys(connectors)}
            onChange={({ value }) => handler.ChangeDropDownValue(value as any)}
            placeholder="Connect to wallet"
            value={data.connector?.toString()}
            placeholderClassName={styles.dropdown_placeholder}
            menuClassName={styles.dropdown_menu}
            controlClassName={styles.dropdown_base}
            className={styles.dropdown_container}
            // disabled={!!disabled}
          />
        </div>
        {account && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Network</p>
              <p style={{ color: '#49fdc0' }}>
                {chainNetworkMapping[chainId as any]}
              </p>
            </div>
            <TextInput
              hasButton
              buttonText="Injected"
              value={`${account?.substring(0, 10).trim()}...${account
                ?.substring(account.length - 5, account.length)
                .trim()}`}
              variant={TextInputVariant.filled}
              borderWidth={1}
              backgroundColor="#4E4E4E"
              buttonClassName={styles.inputButton}
              placeholderStyle={{
                color: 'white',
              }}
              disabled
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
              }}
            >
              <a
                href={`https://etherscan.io/address/${account}`}
                style={{ marginTop: 13 }}
              >
                <span style={{ color: colors.teal500 }}>View on Etherscan</span>
              </a>
              <p style={{ color: colors.teal500 }}>Copy address</p>
            </div>
          </>
        )}
        <Button
          backgroundColor="#303030"
          borderWidth={1.5}
          color="white"
          variant={ButtonVariant.filled}
          size={ButtonSize.full}
          textAlign={TextAlign.center}
          paddingVertical={10}
          onClick={handler.Deactivate}
        >
          Deactivate
        </Button>
      </Modal>
    </div>
  );
};

export default Header;
