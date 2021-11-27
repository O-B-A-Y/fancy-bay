/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Button, Grid, Table } from 'src/components';
import GridItem from 'src/components/GridItem';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import useWeb3 from 'src/hooks/useWeb3';
import { useAppSelector } from 'src/states/hooks';
import { toggleTransferProposalModal } from 'src/states/modal/slice';
import useTransferProposalContract from 'src/states/proposal/hooks/useTransferProposalContract';
import useFetchMembers from 'src/states/treasureBay/hooks/useFetchMembers';
import useFetchTreasureBay from 'src/states/treasureBay/hooks/useFetchTreasureBay';
import useTreasureBayMutations from 'src/states/treasureBay/hooks/useTreasureBayMutations';
import { TransferProposal } from 'src/types/TransferProposal';
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
  const router = useRouter();
  const { address } = router.query;
  const { bay } = useFetchTreasureBay(address as any);
  const { voteTransferProposal, loading } = useTreasureBayMutations();
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { selectedTransferProposal },
  } = useAppSelector((state) => state.proposalSlice);
  const dispatch = useDispatch();
  const web3 = useWeb3();
  const fetchMembers = useFetchMembers(address as string);
  const transferProposalContract = useTransferProposalContract(
    address as string
  );
  const transferProposalMethods: TransferProposal =
    transferProposalContract.methods;

  // React.useEffect(() => {
  //   const hey = async () => {
  //     console.log(
  //       await transferProposalMethods
  //         .votedYes('0xD71E78E952D42474c0f77E96A3bD595b8bF314D5')
  //         .call()
  //     );
  //   };
  //   hey();
  // });

  const memberInfos = React.useMemo(
    () =>
      fetchMembers.members
        .filter(
          (member) =>
            member.contractAddress !== selectedTransferProposal.creator
        )
        .sort((memberA, memberB) =>
          memberA.balance > memberB.balance ? -1 : 1
        )
        .map((member, index) => [
          {
            value:
              index <= parseFloat(selectedTransferProposal.numberOfYesVotes)
                ? '👍'
                : index <= parseFloat(selectedTransferProposal.numberOfNoVotes)
                ? '👎'
                : '~',
            className: styles.member_item_rank,
            style: {
              borderStartStartRadius: 10,
              borderEndStartRadius: 10,
            },
          },
          {
            value: `${member.contractAddress.substring(0, 15).trim()}...`,
            className: styles.member_item_address,
            isHyperLink: true,
            link: `https://etherscan.io/address/${member.contractAddress}`,
          },
          {
            value: moment
              .unix(parseInt(member.joinedAt, 10))
              .format('DD-MM-YYYY'),
            className: styles.member_item_joinedAt,
          },
          {
            value: member.balance,
            className: styles.member_item_stakedAmount,
          },
          {
            value: `${(
              parseFloat(`${(member.balance as any) * 100}`) /
                parseFloat(
                  web3.utils.fromWei(`${(bay as any).totalValueLocked}`)
                ) || 0
            ).toFixed(2)}%`,
            className: styles.member_item_occupied,
          },
        ]),
    [fetchMembers.members, loading, data.transferProposal]
  );
  const handler = {
    VoteYes: () => voteTransferProposal(selectedTransferProposal.address, true),
    VoteNo: () => voteTransferProposal(selectedTransferProposal.address, false),
  };
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={data.transferProposal}
      onRequestClose={() => dispatch(toggleTransferProposalModal(false))}
      contentLabel="TransferProposalModal"
    >
      <div>
        <Grid
          cols={{
            xs: 1,
            md: 3,
            lg: 7,
          }}
          rows={{
            xs: 1,
            md: 1,
            lg: 1,
          }}
          rowGap="xs"
          colGap="lg"
        >
          <GridItem rowSpan={1} colSpan={2}>
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
              <p style={{ color: colors.green500, marginLeft: '30px' }}>
                {`${selectedTransferProposal.creator
                  .substring(0, 15)
                  .trim()}...`}
              </p>
            </div>
            <div className={styles.rowItem}>
              <p>Description</p>
              <p>{selectedTransferProposal.description}</p>
            </div>
            {/* <CurrencyContainer tokenName="OBAY" amount={200} type="From" />
        <CurrencyContainer tokenName="ETH" amount={1.25} type="To" /> */}
            <div
              className={clsx(styles.rowItem, styles.rowItem_meta)}
              style={{ fontSize: 14 }}
            >
              <p>Amount</p>
              <p>
                {web3.utils.fromWei(selectedTransferProposal.amount, 'ether')}{' '}
                ETH
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
                  fontWeight: 'bold',
                }}
              >
                {(
                  (parseFloat(selectedTransferProposal.numberOfYesVotes) *
                    100) /
                  ((bay?.members.length as any) - 1)
                ).toFixed(2)}
                %
              </p>
            </div>
            <div
              className={clsx(styles.rowItem, styles.rowItem_meta)}
              style={{ fontSize: 14 }}
            >
              <p>Disapproval</p>
              <p
                style={{
                  color: colors.green500,
                  fontWeight: 'bold',
                }}
              >
                {(parseFloat(selectedTransferProposal.numberOfNoVotes) * 100) /
                  (bay?.members.length as any)}
                %
              </p>
            </div>
            <div
              className={clsx(styles.rowItem, styles.rowItem_meta)}
              style={{ fontSize: 14 }}
            >
              <p>Number of votes</p>
              <p
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {parseFloat(selectedTransferProposal.numberOfYesVotes) +
                  parseFloat(selectedTransferProposal.numberOfNoVotes)}
                /{bay?.members.length as any}
              </p>
            </div>
            {selectedTransferProposal.creator !== environment.account && (
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
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={5}
            style={{ maxHeight: '430px', overflow: 'scroll' }}
          >
            <Table
              header={[
                { value: 'Vote' },
                { value: 'Address' },
                { value: 'Joined at' },
                { value: 'Staked amount' },
                { value: 'Occupied' },
              ]}
              rowStyle={{
                backgroundColor: colors.dark700,
                cursor: 'pointer',
              }}
              items={memberInfos.map((memberData) => ({
                data: memberData.map((d) => ({
                  value: d.value,
                  className: d.className,
                  style: d.style || {},
                  isHyperLink: d.isHyperLink,
                  link: d.link,
                })),
                href: '',
              }))}
            />
          </GridItem>
        </Grid>
      </div>
    </ReactModal>
  );
};

export default TransferProposalModal;
