import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Button } from 'src/components';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import useWeb3 from 'src/hooks/useWeb3';
import { useAppSelector } from 'src/states/hooks';
import { toggleTransferProposalModal } from 'src/states/modal/slice';
import useTreasureBayMutations from 'src/states/treasureBay/hooks/useTreasureBayMutations';
import colors from '../../styles/colors.module.scss';
import styles from './TransferProposalModal.module.scss';

enum ProposalGenre {
  Exchange = 'Exchange',
  Transfer = 'Transfer',
  Member = 'Member',
}

// const CurrencyContainer = ({
//   tokenName,
//   amount,
//   type,
// }: {
//   tokenName: string;
//   amount: number;
//   type: 'From' | 'To';
// }) => (
//   <div
//     style={{
//       backgroundColor: colors.dark700,
//       borderRadius: 10,
//       padding: '5px 20px',
//       marginBottom: 10,
//     }}
//   >
//     <p style={{ fontSize: 13, color: colors.dark300 }}>{type}</p>
//     <div
//       className={styles.rowItem}
//       style={{
//         fontSize: 20,
//       }}
//     >
//       <p
//         style={{
//           margin: 0,
//           marginBottom: 10,
//         }}
//       >
//         {tokenName}
//       </p>
//       <p
//         style={{
//           margin: 0,
//           marginBottom: 10,
//         }}
//       >
//         {amount}
//       </p>
//     </div>
//   </div>
// );

const TransferProposalModal = () => {
  const { data } = useAppSelector((state) => state.modalSlice);
  const { voteTransferProposal } = useTreasureBayMutations();
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { selectedTransferProposal },
  } = useAppSelector((state) => state.proposalSlice);
  const dispatch = useDispatch();
  const web3 = useWeb3();
  const handler = {
    VoteYes: () => voteTransferProposal(selectedTransferProposal.address, true),
    VoteNo: () => voteTransferProposal(selectedTransferProposal.address, false),
  };
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={data.transferProposal}
      onRequestClose={() => dispatch(toggleTransferProposalModal(false))}
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
      contentLabel="TransferProposalModal"
    >
      <div className={styles.container} style={{ width: 400, maxWidth: 400 }}>
        <div
          className={styles.rowItem}
          style={{
            fontSize: 18,
            borderBottom: `2px solid ${colors.dark600}`,
          }}
        >
          <p>{selectedTransferProposal.title}</p>
          <p style={{ color: colors.dark400 }}>
            {ProposalGenre.Transfer.toString()}
          </p>
        </div>
        <div className={styles.rowItem}>
          <p>Requested by</p>
          <p style={{ color: colors.green500 }}>
            {`${selectedTransferProposal.creator.substring(0, 15).trim()}...`}
          </p>
        </div>
        <div className={styles.rowItem}>
          <p>Description</p>
          <p>{selectedTransferProposal.description}</p>
        </div>
        {/* <CurrencyContainer tokenName="OBAY" amount={200} type="From" />
        <CurrencyContainer tokenName="ETH" amount={1.25} type="To" /> */}
        <div className={styles.metaContainer}>
          <div
            className={clsx(styles.rowItem, styles.rowItem_meta)}
            style={{ fontSize: 14 }}
          >
            <p>Amount</p>
            <p>
              {web3.utils.fromWei(selectedTransferProposal.amount, 'ether')} ETH
            </p>
          </div>
          <div
            className={clsx(styles.rowItem, styles.rowItem_meta)}
            style={{ fontSize: 14 }}
          >
            <p>Expired time</p>
            <p>
              {moment
                .unix(parseFloat(selectedTransferProposal.votingDeadline))
                .fromNow()}
            </p>
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
            <p>Approval</p>
            <p
              style={{
                color: colors.green500,
                fontSize: 25,
                fontWeight: 'bold',
              }}
            >
              {(selectedTransferProposal.numberOfYesVotes as any) /
                ((selectedTransferProposal.numberOfNoVotes +
                  selectedTransferProposal.numberOfYesVotes) as any) || 0}
              %
            </p>
          </div>
        </div>
        {selectedTransferProposal.creator === environment.account && (
          <div style={{ display: 'flex' }}>
            <Button
              backgroundColor="#303030"
              borderWidth={1.5}
              color="white"
              variant={ButtonVariant.filled}
              size={ButtonSize.full}
              textAlign={TextAlign.center}
              paddingVertical={10}
              onClick={handler.VoteYes}
            >
              Yes
            </Button>
            <div style={{ flexBasis: '15px' }} />
            <Button
              backgroundColor="#303030"
              borderWidth={1.5}
              color="white"
              variant={ButtonVariant.filled}
              size={ButtonSize.full}
              textAlign={TextAlign.center}
              paddingVertical={10}
              onClick={handler.VoteNo}
            >
              No
            </Button>
          </div>
        )}
      </div>
    </ReactModal>
  );
};

export default TransferProposalModal;
