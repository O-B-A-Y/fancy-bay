import clsx from 'clsx';
import moment from 'moment';
import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import ReactModal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { chainNetworkMapping } from 'src/connectors';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import useWeb3 from 'src/hooks/useWeb3';
import { useAppSelector } from 'src/states/hooks';
import useFetchTreasureBay from 'src/states/treasureBay/hooks/useFetchTreasureBays';
import useTreasureBayMutations from 'src/states/treasureBay/hooks/useTreasureBayMutations';
import { TreasureBayType } from 'src/states/treasureBay/types';
import DateUtils from 'src/utils/date';
import BinanceIcon500x500 from '../../../public/icons/binance-icon-500x500.png';
// import FintechIcon500x500 from '../../../public/icons/fintech-icon-500x500.png';
import { Button, Container, Table } from '../../components';
import Flex from '../../components/Flex';
import StatsCard from '../../components/StatsCard';
import { DefaultLayout } from '../../layouts';
import colors from '../../styles/colors.module.scss';
import NumberUtils from '../../utils/number';
import StringUtils from '../../utils/string';
import { NextPageWithLayout } from '../_app';
import styles from './Browse.module.scss';

interface BrowseTableData {
  value: string | number | StaticImageData;
  className?: string;
  style?: React.CSSProperties;
  isImage?: boolean;
}

const Browse: NextPageWithLayout = () => {
  const web3 = useWeb3();
  const [bayDetail, setBayDetail] = React.useState<TreasureBayType>();
  const [toggleModal, setToggleModal] = useState(false);
  const { bays, error, loading, retries } = useFetchTreasureBay();
  const { join } = useTreasureBayMutations();
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const convertedBays: {
    data: BrowseTableData[];
    href: string;
    onClick: () => void;
  }[] = bays.map((bay, index) => ({
    data: [
      {
        value: NumberUtils.formatRank(index + 1),
        className: clsx(styles['bay-item']),
      },
      {
        value: bay.name,
        className: clsx(styles['bay-item'], styles['bay-item-name']),
      },
      {
        value: BinanceIcon500x500,
        isImage: true,
      },
      {
        value: StringUtils.shortenAddress(bay.address, 10),
        className: clsx(styles['bay-item'], styles['bay-item-address']),
      },

      {
        value: NumberUtils.formatSeparators(bay.members.length),
        className: clsx(styles['bay-item']),
      },
      {
        value: NumberUtils.formatSeparators(
          parseFloat(web3.utils.fromWei(bay.totalValueLocked, 'ether'))
        ),
        className: clsx(styles['bay-item']),
      },
      {
        value: StringUtils.shortenAddress(bay.creator, 10),
        className: clsx(styles['bay-item'], styles['bay-item-address']),
      },
      {
        value: NumberUtils.formatSeparators(
          bay.transferProposals.length + bay.exchangeProposals.length
        ),
        className: clsx(styles['bay-item']),
      },
    ],
    onClick: () => {
      setBayDetail(bay);
      setToggleModal(true);
    },
    href: '#',
  }));
  const handler = {
    JoinBay: () => {
      if (bayDetail?.address) {
        join(bayDetail.address, true);
        setToggleModal(false);
      }
    },
    LeaveBay: () => {},
  };
  if (error && retries === 0) {
    toast.error(`ERROR! Cannot retrieve list of MyBays! (${error})`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <Head>
        <title>Browse | OBAY</title>
        <meta key="description" name="description" content="Browse OBAY" />
      </Head>
      <Container>
        {/* Title section */}
        <div className={styles.infoTitleSection}>Platform Information</div>
        {/* Stats Card section */}
        <Flex colGap="xl">
          <StatsCard title="Number of Bays" stats={bays.length} />
          <StatsCard title="Epoch" stats={0} />
          <StatsCard title="Avg. Bay ROI" stats={0} />
          <StatsCard
            title="Number of Proposals"
            stats={
              bays.map(
                (bay) =>
                  bay.exchangeProposals.length + bay.transferProposals.length
              ).length > 0
                ? bays
                    .map(
                      (bay) =>
                        bay.exchangeProposals.length +
                        bay.transferProposals.length
                    )
                    .reduce((a, b) => a + b)
                : 0
            }
          />
        </Flex>
        {/* Bay Title section */}
        <div className={styles.bayTitleSection}>Bays</div>
        {/* Table of Bays */}
        <div className={styles.tableContainer}>
          {loading && (
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '600px',
                display: 'flex',
              }}
            >
              <Loader type="Grid" color="#49fdc0" height={100} width={100} />
            </div>
          )}
          {bays.length > 0 && !loading ? (
            <Table
              header={[
                { value: 'Rank' },
                {
                  value: 'Name',
                },
                { value: 'Logo' },
                { value: 'Address' },
                { value: 'Members' },
                { value: 'Total staked amount' },
                { value: 'Creator' },
                { value: 'Number of proposals' },
              ]}
              headerRowClassName={styles.headerRow}
              rowStyle={{
                cursor: 'pointer',
              }}
              items={convertedBays}
            />
          ) : (
            !loading && (
              <div
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '600px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p style={{ margin: 0, fontSize: 150, color: colors.dark500 }}>
                  ☹︎
                </p>
                <h3 style={{ color: colors.dark500 }}>
                  There are no Treasure Bay on the network
                </h3>
              </div>
            )
          )}
        </div>
        <ToastContainer />
        <ReactModal
          onRequestClose={() => setToggleModal(false)}
          ariaHideApp={false}
          isOpen={toggleModal}
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
          contentLabel="BayDetailModal"
        >
          <div
            className={styles.container}
            style={{ width: 350, maxWidth: 300 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3>{bayDetail?.name}</h3>
              <a
                href={
                  chainNetworkMapping[
                    environment.chainId as any
                  ]?.toLowerCase() === 'mainnet'
                    ? `https://etherscan.io/address/${environment.account}`
                    : `https://${chainNetworkMapping[
                        environment.chainId as any
                      ]?.toLowerCase()}.etherscan.io/address/${
                        bayDetail?.address
                      }`
                }
                style={{ fontSize: 'smaller', justifyContent: 'center' }}
              >
                View on Etherscan <FaShare style={{ marginLeft: '5px' }} />
              </a>
            </div>
            <p style={{ color: colors.dark300 }}>
              <span>Address: </span>
              <a style={{ color: colors.green500, cursor: 'pointer' }}>
                {StringUtils.shortenAddress(
                  (bayDetail?.address as string) || ' ',
                  20
                )}
              </a>
            </p>

            <p style={{ color: colors.dark300 }}>
              <span>Treasure hunters: </span>
              <span style={{ color: colors.dark400 }}>
                {bayDetail?.members.length}
              </span>
            </p>
            <p style={{ color: colors.dark300 }}>
              <span>Stakeholders: </span>
              <span style={{ color: colors.dark400 }}>
                {bayDetail?.stakeholders.length}
              </span>
            </p>
            <p style={{ color: colors.dark300 }}>
              <span>Total staked amount: </span>
              <span style={{ color: colors.green500 }}>
                {bayDetail?.totalValueLocked &&
                  web3.utils.fromWei(
                    (bayDetail?.totalValueLocked as any) || 0,
                    'ether'
                  )}{' '}
                ETH
              </span>
            </p>
            <p style={{ color: colors.dark300 }}>
              <span>Transfer proposals: </span>
              <span style={{ color: colors.dark400 }}>
                {(bayDetail?.transferProposals.length as any) > 0
                  ? `${bayDetail?.transferProposals.length} proposals`
                  : `${bayDetail?.transferProposals.length} proposal`}
              </span>
            </p>
            <p style={{ color: colors.dark300 }}>
              <span>Exchange proposals: </span>
              <span style={{ color: colors.dark400 }}>
                {(bayDetail?.exchangeProposals.length as any) > 0
                  ? `${bayDetail?.exchangeProposals.length} proposals`
                  : `${bayDetail?.exchangeProposals.length} proposal`}
              </span>
            </p>
            <p style={{ color: colors.dark300 }}>
              <span>Creator: </span>
              <a style={{ color: colors.green500, cursor: 'pointer' }}>
                {StringUtils.shortenAddress(
                  (bayDetail?.creator as string) || '',
                  20
                )}
              </a>
            </p>
            {bayDetail?.members.some(
              (member) => member.contractAddress === environment.account
            ) ? (
              <>
                {DateUtils.isNotReachDay(
                  parseInt(
                    bayDetail.members
                      .filter(
                        (member) =>
                          member.contractAddress === environment.account
                      )
                      .map((member) => member.joinedAt)[0],
                    10
                  ),
                  3
                ) ? (
                  <div style={{ color: colors.dark500, fontSize: 15 }}>
                    You must in the bay for more than 3 days to leave
                  </div>
                ) : (
                  <Button
                    backgroundColor="#303030"
                    borderWidth={1.5}
                    color="white"
                    variant={ButtonVariant.filled}
                    size={ButtonSize.full}
                    textAlign={TextAlign.center}
                    paddingVertical={10}
                    onClick={handler.LeaveBay}
                  >
                    Leave bay
                  </Button>
                )}

                <p
                  style={{
                    margin: 0,
                    marginTop: 15,
                    fontSize: 13,
                    color: colors.dark300,
                  }}
                >
                  Joined{' '}
                  {bayDetail?.members.some(
                    (member) => member.contractAddress === environment.account
                  ) &&
                    moment
                      .unix(
                        parseInt(
                          bayDetail.members
                            .filter(
                              (member) =>
                                member.contractAddress === environment.account
                            )
                            .map((member) => member.joinedAt)[0],
                          10
                        )
                      )
                      .fromNow()}
                </p>
              </>
            ) : (
              <Button
                backgroundColor="#303030"
                borderWidth={1.5}
                color="white"
                variant={ButtonVariant.filled}
                size={ButtonSize.full}
                textAlign={TextAlign.center}
                paddingVertical={10}
                onClick={handler.JoinBay}
              >
                Join
              </Button>
            )}
          </div>
        </ReactModal>
      </Container>
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: colors.dark800,
        }}
      />
    </>
  );
};

Browse.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Browse;
