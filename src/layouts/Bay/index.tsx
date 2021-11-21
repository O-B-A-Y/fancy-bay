/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
// import { CurrencyUtils } from 'src/utils';
import { Button, Container, Flex, Grid, TextInput } from 'src/components';
import GridItem from 'src/components/GridItem';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import TextInputVariant from 'src/constants/textInputVariant';
import useFormValidation from 'src/hooks/useFormValidation';
import useTokenInfo from 'src/hooks/useTokenInfo';
import useWeb3 from 'src/hooks/useWeb3';
import { useAppSelector } from 'src/states/hooks';
import { toggleProposalCreationModal } from 'src/states/modal/slice';
import useFetchMember from 'src/states/treasureBay/hooks/useFetchMember';
import useFetchTreasureBay from 'src/states/treasureBay/hooks/useFetchTreasureBay';
import useTreasureBayMutations from 'src/states/treasureBay/hooks/useTreasureBayMutations';
import { setSelectedBay } from 'src/states/treasureBay/slice';
import { addToken } from 'src/states/wallet/slice';
import DateUtils from 'src/utils/date';
import NumberUtils from 'src/utils/number';
import StringUtils from 'src/utils/string';
import LogoIcon from '../../../public/icons/icon-74x68.png';
import MetamaskIcon from '../../../public/icons/metamask-icon-54x56.png';
import colors from '../../styles/colors.module.scss';
import styles from './Bay.module.scss';
// import useSendWyreAPI from 'src/hooks/useSendWyreAPI';

const ImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) => `${src}?w=${width}&q=${quality || 75}`;

const RowItem = ({ label, content }: { label: string; content: any }) => (
  <div className={styles.rowItem}>
    <h3 className={styles.metaLabel}>{label}</h3>
    <p className={styles.metaContent}>{content}</p>
  </div>
);

export enum LeftSidedContainerTab {
  Proposals = 'Proposals',
  Members = 'Members',
  Stakeholders = 'Stakeholders',
  Portfolio = 'Portfolio',
}

const Bay = ({
  address,
  selectedTab,
  children,
}: {
  address: string;
  children: React.ReactNode;
  selectedTab: LeftSidedContainerTab;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const web3 = useWeb3();
  // const { rates } = useSendWyreAPI();
  const { formValues, handleSetFieldValue } = useFormValidation({
    stakedAmount: '',
    searchProposalInput: '',
  });
  const { account } = useAppSelector(
    (state) => state.walletSlice.data.environment
  );
  const treasureBayMutations = useTreasureBayMutations();
  const fetchMember = useFetchMember(address as string, account as string);
  const walletSlice = useAppSelector((state) => state.walletSlice);
  const tokenInfo = useTokenInfo('OBAY');
  const { bay, error, loading } = useFetchTreasureBay(address);
  if (!bay || error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  React.useEffect(() => {
    if (tokenInfo) {
      dispatch(addToken(tokenInfo));
    }
  }, [tokenInfo]);

  const bayInfo = useMemo(
    () =>
      bay
        ? [
            {
              label: 'Total ETH',
              content: `${web3.utils.fromWei(
                bay?.totalValueLocked,
                'ether'
              )} ETH`,
            },
            {
              label: 'Creator',
              content: `${StringUtils.shortenAddress(bay.address, 10).trim()}`,
            },
            {
              label: 'Treasure hunters',
              content: bay.members.length,
            },
            {
              label: 'Stakeholders',
              content: bay.stakeholders.length,
            },
          ]
        : [],
    [bay]
  );

  const handler = {
    Stake: () => treasureBayMutations.stake(address, formValues.stakedAmount),
    Leave: () => {
      treasureBayMutations.leaveTreasureBay(address, (success) => {
        if (success) {
          router.push('/my-bays');
        }
      });
    },
    SearchProposal: () => {},
    ChangeSearchProposalInput: (e: ChangeEvent) => {
      handleSetFieldValue('searchProposalInput', (e.target as any).value);
    },
    ChangeStakedAmount: (e: ChangeEvent) => {
      handleSetFieldValue('stakedAmount', (e.target as any).value, {
        isNumeric: true,
      });
    },
    AddNewProposal: () => {
      if (bay) {
        dispatch(setSelectedBay(bay));
        dispatch(toggleProposalCreationModal(true));
      } else {
        alert(error);
      }
    },
  };

  /** Render meta information of a bay */
  const RenderMetaContainer = React.memo(() => (
    <div className={styles.metaContainer}>
      <Image
        loader={ImageLoader as any}
        src="https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy81YTc5NDA0YjQ2ZTYyNWFhYTFkYTBhNDJlMmU4Y2JiYy5qcGc=.jpg"
        alt={bay?.name as string}
        width={2250}
        height={1390}
        layout="responsive"
      />
      <br />
      <h1 className={styles.bayName}>{bay?.name}</h1>
      <p
        data-tip={bay?.address}
        data-for="address-tooltip"
        data-place="bottom"
        className={styles.bayAddress}
      >
        {`${bay?.address?.substring(0, 30).trim()}...`}
      </p>

      {bayInfo.map(({ content, label }) => (
        <RowItem key={label} label={label} content={content} />
      ))}
    </div>
  ));

  return (
    <div>
      <Head>
        <title>{(bay?.name as string)?.toUpperCase()}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading || treasureBayMutations.loading ? (
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '300px',
            display: 'flex',
          }}
        >
          <Loader type="Grid" color="#49fdc0" height={60} width={60} />
        </div>
      ) : (
        <Container>
          <div className={styles.container}>
            <Grid
              cols={{
                xs: 1,
                md: 2,
                lg: 7,
              }}
              rows={{
                xs: 1,
                md: 1,
                lg: 1,
              }}
              rowGap="xs"
              colGap="md"
            >
              <GridItem rowSpan={1} colSpan={2}>
                <div className={clsx(styles.bayInfoInner, styles.subContainer)}>
                  <RenderMetaContainer />
                  <div className={styles.separator} />

                  {account && walletSlice.data.tokens.OBAY ? (
                    <>
                      <div className={styles.bottomContainer}>
                        <div className={styles.rowItem}>
                          <p
                            data-tip={account}
                            data-for="address-tooltip"
                            data-place="bottom"
                          >
                            <Image src={MetamaskIcon} width={15} height={15} />
                            <span style={{ marginLeft: 10 }}>{`${account
                              .substring(0, 10)
                              .trim()}...`}</span>
                          </p>
                          <div style={{ alignItems: 'center' }}>
                            <span>
                              {NumberUtils.truncate(
                                walletSlice.data.tokens.OBAY.balance,
                                3
                              )}{' '}
                            </span>
                            <Image src={LogoIcon} width={15} height={15} />
                          </div>
                        </div>
                        <TextInput
                          hasButton
                          variant={TextInputVariant.filled}
                          borderWidth={1}
                          backgroundColor={colors.$dark500}
                          placeholder="Enter the amount"
                          placeholderStyle={{
                            color: 'white',
                          }}
                          buttonClassName={styles.inputButton}
                          buttonText="Stake"
                          onButtonClicked={handler.Stake}
                          onValueChanged={handler.ChangeStakedAmount}
                          value={formValues.stakedAmount}
                        />
                        <div className={styles.rowItem}>
                          <div className={styles.metaLabel}>Total</div>
                          <p className={styles.metaContent}>
                            {fetchMember.member?.balance || 0} ETH
                          </p>
                        </div>
                      </div>
                      {bay?.members.some(
                        (member) => member.contractAddress === account
                      ) && (
                        <>
                          {DateUtils.isNotReachDay(
                            parseInt(
                              bay.members
                                .filter(
                                  (member) => member.contractAddress === account
                                )
                                .map((member) => member.joinedAt)[0],
                              10
                            ),
                            3
                          ) ? (
                            <div
                              style={{ color: colors.dark500, fontSize: 15 }}
                            >
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
                              onClick={handler.Leave}
                            >
                              Leave the bay
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          height: 250,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          color: colors.dark500,
                        }}
                      >
                        <p style={{ fontSize: 55, margin: 0 }}>☻</p>
                        <p>Wallet is not connected</p>
                      </div>
                    </div>
                  )}
                </div>
              </GridItem>
              <GridItem rowSpan={1} colSpan={5}>
                <div className={styles.subContainer}>
                  {/* Flex Header */}
                  <Flex
                    direction={{
                      na: 'column',
                      md: 'row',
                    }}
                    wrap="nowrap"
                    colGap="xs"
                    className={styles.header}
                  >
                    {/* Header Left */}
                    {[
                      LeftSidedContainerTab.Proposals,
                      LeftSidedContainerTab.Members,
                      LeftSidedContainerTab.Portfolio,
                    ].map((tab) => (
                      <Link
                        key={tab}
                        href={`/my-bays/${bay?.address}/${tab.toLowerCase()}`}
                      >
                        <div
                          className={clsx({
                            [styles.tab]: true,
                            [styles.tab_active]: selectedTab === tab,
                          })}
                        >
                          <p className={styles.tabText}>{tab}</p>
                        </div>
                      </Link>
                    ))}
                    {/* Header Right */}
                    <TextInput
                      hasButton
                      variant={TextInputVariant.outlined}
                      borderWidth={1}
                      backgroundColor={colors.dark500}
                      placeholder="Search for proposal"
                      placeholderStyle={{
                        color: 'white',
                      }}
                      buttonClassName={styles.inputButton}
                      buttonText="Search"
                      onButtonClicked={handler.SearchProposal}
                      onValueChanged={handler.ChangeSearchProposalInput}
                      value={formValues.searchProposalInput}
                      style={{
                        minWidth: 0,
                      }}
                    />
                    <Button
                      backgroundColor="#303030"
                      borderWidth={1.5}
                      color="white"
                      variant={ButtonVariant.filled}
                      size={ButtonSize.fit}
                      textAlign={TextAlign.center}
                      paddingVertical={10}
                      paddingHorizontal={15}
                      onClick={handler.AddNewProposal}
                    >
                      Add Proposal +
                    </Button>
                  </Flex>
                  <div className={styles.subContainer_separator} />
                  <div className={styles.meta}>
                    <div className={styles.meta_leftSide}>
                      <p>
                        Personal Return on Investment (PROI):{' '}
                        <span>
                          {(
                            (parseFloat(fetchMember.member?.balance as string) *
                              100) /
                              parseFloat(
                                web3?.utils?.fromWei(
                                  (
                                    bay?.totalValueLocked as string
                                  )?.toString() || '0',
                                  'ether'
                                )
                              ) || 0
                          ).toFixed(2)}
                          %
                        </span>
                      </p>
                    </div>
                    <div className={styles.meta_rightSide}>
                      <p>
                        Next run: <span>22: 10: 30</span>
                      </p>
                    </div>
                  </div>
                  {children}
                </div>
              </GridItem>
            </Grid>
          </div>
        </Container>
      )}

      <ReactTooltip
        id="address-tooltip"
        textColor={colors.dark0}
        backgroundColor={colors.dark800}
      />
    </div>
  );
};

export default Bay;
