/* eslint-disable no-nested-ternary */
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useMemo } from 'react';
import { BayLayout, DefaultLayout } from 'src/layouts';
import { NextPageWithLayout } from 'src/pages/_app';
import styles from './Members.module.scss';
import colors from '../../../../styles/colors.module.scss';
import { Table } from 'src/components';
import { LeftSidedContainerTab } from 'src/layouts/Bay';
import useFetchMembers from 'src/states/treasureBay/hooks/useFetchMembers';
import useFetchTreasureBay from 'src/states/treasureBay/hooks/useFetchTreasureBay';
import Loader from 'react-loader-spinner';
import useWeb3 from 'src/hooks/useWeb3';

const BayMembers: NextPageWithLayout = () => {
  const router = useRouter();
  const web3 = useWeb3();
  const { address } = router.query;
  const fetchTreasureBay = useFetchTreasureBay(address as string);
  const fetchMembers = useFetchMembers(address as string);
  const memberInfos: Partial<{
    value: any;
    className: string;
    style: React.CSSProperties;
    isHyperLink: boolean;
    link: string;
  }>[][] = useMemo(
    () =>
      fetchMembers.members.map((member) => [
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
          value: `${
            parseFloat(`${(member.balance as any) * 100}`) /
              parseFloat(
                web3.utils.fromWei(
                  `${(fetchTreasureBay.bay as any).totalValueLocked}`
                )
              ) || 0
          }%`,
          className: styles.member_item_occupied,
        },
      ]),
    [fetchMembers]
  );
  return fetchMembers.loading || fetchTreasureBay.loading ? (
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
  ) : fetchMembers.members.length > 0 ? (
    <Table
      header={[
        { value: 'Rank' },
        { value: 'Address' },
        { value: 'Joined at' },
        { value: 'Staked amount' },
        { value: 'Occupied' },
      ]}
      rowStyle={{
        backgroundColor: colors.dark700,
        cursor: 'pointer',
      }}
      items={memberInfos.map((memberData, index) => ({
        data: [
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
        })),
        href: '',
      }))}
    />
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
      <p style={{ margin: 0, fontSize: 150, color: colors.dark500 }}>☹︎</p>
      <h3 style={{ color: colors.dark500 }}>
        Treasure bay has no member, something wrong!
      </h3>
    </div>
  );
};
BayMembers.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { address } = router.query;
  return (
    <DefaultLayout>
      <BayLayout
        selectedTab={LeftSidedContainerTab.Members}
        address={address as string}
      >
        {page}
      </BayLayout>
    </DefaultLayout>
  );
};

export default BayMembers;
