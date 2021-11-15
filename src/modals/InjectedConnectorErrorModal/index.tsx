import React from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/states/hooks';
import { toggleInjectedConnectorErrorModal } from 'src/states/modal/slice';
import colors from '../../styles/colors.module.scss';
import styles from './InjectedConnectorModal.module.scss';

const InjectedConnectorModal = () => {
  const dispatch = useDispatch();
  const { data } = useAppSelector((state) => state.modalSlice);
  return (
    <ReactModal
      ariaHideApp={false}
      onRequestClose={() => dispatch(toggleInjectedConnectorErrorModal(false))}
      isOpen={data.injectedConnectorError}
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
      contentLabel="InjectedConnectorModal"
    >
      <div className={styles.container} style={{ width: 350, maxWidth: 300 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>Notice</h3>
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
            <p style={{ color: '#49fdc0' }}>Injected</p>
          </div>
          connector.
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 100, margin: '25px auto' }}>🥲</p>
        </div>
        <p style={{ color: colors.dark300 }}>
          There is an error occuredd. Please check your connection again.
        </p>
        <p style={{ color: colors.dark300 }}>
          Make sure your web3 wallet on browser is allowed to use on this
          website.
        </p>
      </div>
    </ReactModal>
  );
};

export default InjectedConnectorModal;
