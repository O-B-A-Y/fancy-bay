/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { BayLayout, DefaultLayout } from 'src/layouts';
import { LeftSidedContainerTab } from 'src/layouts/Bay';
import { NextPageWithLayout } from 'src/pages/_app';
import { toggleExchangeProposalModal } from 'src/states/modal/slice';
import useFetchTransferProposals from 'src/states/proposal/hooks/useFetchTransferProposals';
import styles from './Proposals.module.scss';
import colors from '../../../../styles/colors.module.scss';
import { ProposalType } from 'src/states/proposal/type';

const ProposalItem = ({
  proposal,
  onClick,
}: {
  proposal: ProposalType;
  onClick: () => void;
}) => (
  <div onClick={onClick} className={styles.proposal_item}>
    <p className={styles.proposal_item_header}>{proposal.title}</p>
    <p className={styles.proposal_item_subHeader}>
      {moment().format('DD-MM-YYYY')}
    </p>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Expired in</p>
      <p className={styles.proposal_item_time}>70 minutes</p>
    </div>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Oracle</p>
      <p className={styles.proposal_item_content}>Chainlink</p>
    </div>
    {proposal.type === 'TRANSFER' && (
      <div className={styles.rowItem}>
        <p className={styles.proposal_item_label}>Pool changed</p>
        <p className={styles.proposal_item_content}>
          {(proposal as any).amount}
        </p>
      </div>
    )}

    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Requested by</p>
      <p className={styles.proposal_item_content}>{`${proposal.creator
        .substring(0, 10)
        .trim()}...`}</p>
    </div>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Approval</p>
      <p className={styles.proposal_item_percent}>
        {proposal.checkApprovalStatus}%
      </p>
    </div>
  </div>
);

const BayProposals: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { address } = router.query;
  const { transferProposals, loading, error } = useFetchTransferProposals(
    address as string
  );
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  // eslint-disable-next-line no-nested-ternary
  return loading ? (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '300px',
        display: 'flex',
      }}
    >
      <Loader type="Rings" color="#49fdc0" height={80} width={80} />
    </div>
  ) : transferProposals.length > 0 ? (
    <>
      <div className={styles.proposal_container}>
        {transferProposals.map((proposal, index) => (
          <ProposalItem
            onClick={() => dispatch(toggleExchangeProposalModal(true))}
            key={index}
            proposal={proposal}
          />
        ))}
      </div>
    </>
  ) : (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p style={{ margin: 0, fontSize: 150, color: colors.dark500 }}>⚛︎</p>
      <h3 style={{ color: colors.dark500 }}>
        Treasure bay has no proposal, create one now!
      </h3>
    </div>
  );
};

BayProposals.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { address } = router.query;
  return (
    <DefaultLayout>
      <BayLayout
        selectedTab={LeftSidedContainerTab.Proposals}
        address={address as string}
      >
        {page}
      </BayLayout>
    </DefaultLayout>
  );
};

export default BayProposals;
