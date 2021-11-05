import Image from 'next/image';
import clsx from 'clsx';
import React, { ChangeEvent, ReactElement } from 'react';
import styles from './Bay.module.scss';
import Head from 'next/head';
import moment from 'moment';
import { CurrencyUtils } from 'src/utils';
import { NextPageWithLayout } from '../_app';
import { DefaultLayout } from 'src/layouts';
import { useRouter } from 'next/dist/client/router';
import { Button, Container, Grid, TextInput } from 'src/components';
import LogoIcon from '../../../public/icons/icon-74x68.png';
import MetamaskIcon from '../../../public/icons/metamask-icon-54x56.png';
import ReactTooltip from 'react-tooltip';
import colors from '../../styles/colors.module.scss';
import useFormValidation from 'src/hooks/useFormValidation';
import ButtonSize from 'src/constants/buttonConstant';
import TextAlign from 'src/constants/textAlign';
import ButtonVariant from 'src/constants/buttonVariant';
import TextInputVariant from 'src/constants/textInputVariant';
import GridItem from 'src/components/GridItem';

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

enum LeftSidedContainerTab {
  Proposal = 'Proposal',
  Members = 'Members',
  Portfolio = 'Portfolio',
}

const Bay: NextPageWithLayout = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState<LeftSidedContainerTab>(
    LeftSidedContainerTab.Proposal
  );
  const { formValues, handleSetFieldValue } = useFormValidation({
    stakedAmount: '',
    searchProposalInput: '',
  });
  const { slug } = router.query;

  const mockProposal = {
    header: 'Buy 2000 SHIB',
    oracle: 'Chainlink',
    poolChanged: '200 OBAY',
    requestBy: '0x460aDc7A9b5253A765e662A031D26C8743a2EbB6',
    percent: 35,
  };

  const mockBayInfo = [
    {
      label: 'Total Fund',
      content: `${CurrencyUtils.formatByUnit(1521000, 'USD')} USD`,
    },
    {
      label: 'Member',
      content: 120,
    },
    {
      label: 'Created at',
      content: moment().format('DD-MM-YYYY'),
    },
  ];

  const handler = {
    Stake: () => {},
    Leave: () => {},
    SearchProposal: () => {},
    ChangeSearchProposalInput: (e: ChangeEvent) => {
      handleSetFieldValue('searchProposalInput', (e.target as any).value);
    },
    SwitchTab: (tab: LeftSidedContainerTab) => {
      setSelectedTab(tab);
    },
    ChangeStakedAmount: (e: ChangeEvent) => {
      handleSetFieldValue('stakedAmount', (e.target as any).value);
    },
  };

  const mockAddress = '0x460aDc7A9b5253A765e662A031D26C8743a2EbB6';

  const RenderMetaContainer = React.memo(() => (
    <div className={styles.metaContainer}>
      <Image
        loader={ImageLoader as any}
        src="https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy81YTc5NDA0YjQ2ZTYyNWFhYTFkYTBhNDJlMmU4Y2JiYy5qcGc=.jpg"
        alt={slug as string}
        width={2250}
        height={1390}
        layout="responsive"
      />
      <br />
      <h1 className={styles.bayName}>{slug}</h1>
      <p
        data-tip={mockAddress}
        data-for="address-tooltip"
        data-place="bottom"
        className={styles.bayAddress}
      >
        {`${mockAddress.substring(0, 30).trim()}...`}
      </p>

      {mockBayInfo.map(({ content, label }) => (
        <RowItem key={label} label={label} content={content} />
      ))}
    </div>
  ));

  return (
    <div>
      <Head>
        <title>{(slug as string)?.toUpperCase()}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                <div className={styles.bottomContainer}>
                  <div className={styles.rowItem}>
                    <p
                      data-tip={mockAddress}
                      data-for="address-tooltip"
                      data-place="bottom"
                    >
                      <Image src={MetamaskIcon} width={15} height={15} />
                      <span style={{ marginLeft: 10 }}>{`${mockAddress
                        .substring(0, 10)
                        .trim()}...`}</span>
                    </p>
                    <div style={{ alignItems: 'center' }}>
                      <span>100 </span>
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
                    onValueChanged={handler.ChangeStakedAmount}
                    value={formValues.stakedAmount}
                  />
                  <div className={styles.rowItem}>
                    <div className={styles.metaLabel}>Total</div>
                    <p className={styles.metaContent}>{0.00005867} OBAY</p>
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
                  onClick={handler.Leave}
                >
                  Leave the bay
                </Button>
              </div>
            </GridItem>
            <GridItem rowSpan={1} colSpan={5}>
              <div className={styles.subContainer}>
                <div className={styles.header}>
                  <div className={styles.header_left}>
                    {[
                      LeftSidedContainerTab.Proposal,
                      LeftSidedContainerTab.Members,
                      LeftSidedContainerTab.Portfolio,
                    ].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handler.SwitchTab(tab)}
                        className={clsx({
                          [styles.tab]: true,
                          [styles.tab_active]: selectedTab === tab,
                        })}
                      >
                        <p className={styles.tabText}>{tab}</p>
                      </button>
                    ))}
                  </div>
                  <TextInput
                    style={{ width: '100%' }}
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
                    onValueChanged={handler.SearchProposal}
                    value={formValues.searchProposalInput}
                  />
                </div>
                <div className={styles.subContainer_separator} />
                <div className={styles.meta}>
                  <div className={styles.meta_leftSide}>
                    <p>
                      Personal Return on Investment (PROI): <span>5%</span>
                    </p>
                  </div>
                  <div className={styles.meta_rightSide}>
                    <p>
                      Next run: <span>22: 10: 30</span>
                    </p>
                  </div>
                </div>
                <div className={styles.proposal_container}>
                  {Array(4)
                    .fill(mockProposal)
                    .map((proposal) => (
                      <ProposalItem proposal={proposal} />
                    ))}
                </div>
              </div>
            </GridItem>
          </Grid>
        </div>
      </Container>
      <ReactTooltip
        id="address-tooltip"
        textColor={colors.dark0}
        backgroundColor={colors.dark800}
      />
    </div>
  );
};

Bay.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Bay;
