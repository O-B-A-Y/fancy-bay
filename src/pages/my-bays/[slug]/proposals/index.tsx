/* eslint-disable react/no-array-index-key */
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';
import { BayLayout, DefaultLayout } from 'src/layouts';
import { LeftSidedContainerTab } from 'src/layouts/Bay';
import { NextPageWithLayout } from 'src/pages/_app';
import styles from './Proposals.module.scss';

interface Proposal {
  header: string;
  oracle: string;
  poolChanged: string;
  requestBy: string;
  percent: number;
}

const ProposalItem = ({ proposal }: { proposal: Proposal }) => (
  <div className={styles.proposal_item}>
    <p className={styles.proposal_item_header}>{proposal.header}</p>
    <p className={styles.proposal_item_subHeader}>
      {moment().format('DD-MM-YYYY')}
    </p>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Expired in</p>
      <p className={styles.proposal_item_time}>70 minutes</p>
    </div>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Oracle</p>
      <p className={styles.proposal_item_content}>{proposal.oracle}</p>
    </div>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Pool changed</p>
      <p className={styles.proposal_item_content}>{proposal.poolChanged}</p>
    </div>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Requested by</p>
      <p className={styles.proposal_item_content}>{`${proposal.requestBy
        .substring(0, 10)
        .trim()}...`}</p>
    </div>
    <div className={styles.rowItem}>
      <p className={styles.proposal_item_label}>Approval</p>
      <p className={styles.proposal_item_percent}>{proposal.percent}%</p>
    </div>
  </div>
);

const BayProposals: NextPageWithLayout = () => {
  const mockProposal = {
    header: 'Buy 2000 SHIB',
    oracle: 'Chainlink',
    poolChanged: '200 OBAY',
    requestBy: '0x460aDc7A9b5253A765e662A031D26C8743a2EbB6',
    percent: 35,
  };
  return (
    <div className={styles.proposal_container}>
      {Array(10)
        .fill(mockProposal)
        .map((proposal, index) => (
          <ProposalItem key={index} proposal={proposal} />
        ))}
    </div>
  );
};

BayProposals.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <DefaultLayout>
      <BayLayout
        selectedTab={LeftSidedContainerTab.Proposals}
        slug={slug as string}
      >
        {page}
      </BayLayout>
    </DefaultLayout>
  );
};

export default BayProposals;
