import React from 'react';
import ReactModal from 'react-modal';
import { chainNetworkMapping } from 'src/connectors';
import { CompatibleNetworks } from 'src/constants/network';
import { useAppSelector } from 'src/states/hooks';
import colors from '../../styles/colors.module.scss';
import styles from './NoContractModal.module.scss';

const NoContractModal = () => {
  const { data } = useAppSelector((state) => state.modalSlice);
  const {
    data: {
      environment: { chainId },
    },
  } = useAppSelector((state) => state.walletSlice);
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={data.noContract}
      contentLabel="NoContractModal"
    >
      <div className={styles.modal}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>Warning</h3>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          You are using
          <div
            className={styles.network}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <p style={{ color: '#49fdc0' }}>
              {chainNetworkMapping[chainId as any] || 'Unknown'}
            </p>
          </div>
          network.
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 100, margin: '25px auto' }}>😢</p>
        </div>
        <p style={{ color: colors.dark300 }}>
          The network that you are using is not supported by OBAY at this
          moment. There is no contract matched.
        </p>
        <p style={{ color: colors.dark300 }}>
          Consider using these compatible Ethereum networks
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {CompatibleNetworks.map((networkName) => (
            <div
              key={networkName}
              className={styles.network}
              style={{ marginRight: 10 }}
            >
              <p style={{ color: '#49fdc0' }}>{networkName}</p>
            </div>
          ))}
        </div>
      </div>
    </ReactModal>
  );
};

export default NoContractModal;
