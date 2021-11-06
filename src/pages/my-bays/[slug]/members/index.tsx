import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';
import { BayLayout, DefaultLayout } from 'src/layouts';
import { NextPageWithLayout } from 'src/pages/_app';
import styles from './Members.module.scss';
import colors from '../../../../styles/colors.module.scss';
import { Table } from 'src/components';
import { LeftSidedContainerTab } from 'src/layouts/Bay';

const BayMembers: NextPageWithLayout = () => {
  const mockMembers: Partial<{
    value: any;
    className: string;
    style: React.CSSProperties;
    isHyperLink: boolean;
    link: string;
  }>[][] = [
    [
      {
        value: `${'0x460aDc7A9b5253A765e662A031D26C8743a2EbB6'
          .substring(0, 15)
          .trim()}...`,
        className: styles.member_item_address,
        isHyperLink: true,
        link: `https://etherscan.io/address/0x460aDc7A9b5253A765e662A031D26C8743a2EbB6`,
      },
      {
        value: moment().format('DD-MM-YYYY'),
        className: styles.member_item_joinedAt,
      },
      {
        value: 1000,
        className: styles.member_item_stakedAmount,
      },
      {
        value: '20%',
        className: styles.member_item_occupied,
      },
      {
        value: 1000,
        className: styles.member_item_contribution,
        style: {
          borderEndEndRadius: 10,
          borderStartEndRadius: 10,
        },
      },
    ],
  ];
  return (
    <Table
      header={[
        { value: 'Rank' },
        { value: 'Address' },
        { value: 'Joined at' },
        { value: 'Staked amount' },
        { value: 'Occupied' },
        { value: 'Contribution' },
      ]}
      rowStyle={{
        backgroundColor: colors.dark700,
        cursor: 'pointer',
      }}
      data={mockMembers.map((memberData, index) =>
        [
          {
            value: index + 1,
            className: styles.member_item_rank,
            style: {
              borderStartStartRadius: 10,
              borderEndStartRadius: 10,
            },
          },
          ...memberData,
        ].map((d) => ({
          value: d.value,
          className: d.className,
          style: d.style || {},
          isHyperLink: d.isHyperLink,
          link: d.link,
        }))
      )}
    />
  );
};
BayMembers.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <DefaultLayout>
      <BayLayout
        selectedTab={LeftSidedContainerTab.Members}
        slug={slug as string}
      >
        {page}
      </BayLayout>
    </DefaultLayout>
  );
};

export default BayMembers;
