import clsx from 'clsx';
import React from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Button } from 'src/components';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import { useAppSelector } from 'src/states/hooks';
import { toggleProposalModal } from 'src/states/modal/slice';
import colors from '../../styles/colors.module.scss';
import styles from './ProposalModal.module.scss';

enum ProposalGenre {
  Exchange = 'Exchange',
  Transfer = 'Transfer',
  Member = 'Member',
}

const CurrencyContainer = ({
  tokenName,
  amount,
  type,
}: {
  tokenName: string;
  amount: number;
  type: 'From' | 'To';
}) => (
  <div
    style={{
      backgroundColor: colors.dark700,
      borderRadius: 10,
      padding: '5px 20px',
      marginBottom: 10,
    }}
  >
    <p style={{ fontSize: 13, color: colors.dark300 }}>{type}</p>
    <div
      className={styles.rowItem}
      style={{
        fontSize: 20,
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: 10,
        }}
      >
        {tokenName}
      </p>
      <p
        style={{
          margin: 0,
          marginBottom: 10,
        }}
      >
        {amount}
      </p>
    </div>
  </div>
);

const ProposalModal = () => {
  const { data } = useAppSelector((state) => state.modalSlice);
  const dispatch = useDispatch();
  const handler = { Vote: () => {} };
  return (
    <ReactModal
      isOpen={data.proposal}
      onRequestClose={() => dispatch(toggleProposalModal(false))}
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
      contentLabel="ProposalModal"
    >
      <div className={styles.container} style={{ width: 400, maxWidth: 400 }}>
        <div
          className={styles.rowItem}
          style={{
            fontSize: 18,
            borderBottom: `2px solid ${colors.dark600}`,
          }}
        >
          <p>Buy SHIB 200</p>
          <p style={{ color: colors.dark400 }}>
            {ProposalGenre.Exchange.toString()}
          </p>
        </div>
        <div className={styles.rowItem}>
          <p>Requested by</p>
          <p style={{ color: colors.green500 }}>
            {`${'0x460aDc7A9b5253A765e662A031D26C8743a2EbB6'
              .substring(0, 15)
              .trim()}...`}
          </p>
        </div>
        <div className={styles.rowItem}>
          <p>Description</p>
          <p>Buy Shiba Inu</p>
        </div>
        <CurrencyContainer tokenName="OBAY" amount={200} type="From" />
        <CurrencyContainer tokenName="ETH" amount={1.25} type="To" />
        <div className={styles.metaContainer}>
          <div
            className={clsx(styles.rowItem, styles.rowItem_meta)}
            style={{ fontSize: 14 }}
          >
            <p>Price</p>
            <p>1 ETH ~ 1.25 OBAY</p>
          </div>
          <div
            className={clsx(styles.rowItem, styles.rowItem_meta)}
            style={{ fontSize: 14 }}
          >
            <p>Expired time</p>
            <p>70 minutes</p>
          </div>
          <div
            className={clsx(styles.rowItem, styles.rowItem_meta)}
            style={{ fontSize: 14 }}
          >
            <p>Oracle</p>
            <p>Chainlink</p>
          </div>
          <div
            className={clsx(styles.rowItem, styles.rowItem_meta)}
            style={{ fontSize: 14 }}
          >
            <p>Pool changed</p>
            <p>200 OBAY</p>
          </div>
          <div
            className={clsx(styles.rowItem, styles.rowItem_meta)}
            style={{ fontSize: 14 }}
          >
            <p>Approval</p>
            <p
              style={{
                color: colors.green500,
                fontSize: 25,
                fontWeight: 'bold',
              }}
            >
              35%
            </p>
          </div>
        </div>
        <Button
          backgroundColor="#303030"
          borderWidth={1.5}
          color="white"
          variant={ButtonVariant.filled}
          size={ButtonSize.full}
          textAlign={TextAlign.center}
          paddingVertical={10}
          onClick={handler.Vote}
        >
          Vote
        </Button>
      </div>
    </ReactModal>
  );
};

export default ProposalModal;
