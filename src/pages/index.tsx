import Head from 'next/head';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import ObayBanner from '../../public/images/obay-banner.gif';
import { DefaultLayout } from '../layouts';
import { NextPageWithLayout } from './_app';
import { Button, Container, Flex } from 'src/components';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import StatsCard from 'src/components/StatsCard';
import { FaChevronDown } from 'react-icons/fa';
import colors from '../styles/colors.module.scss';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import useFetchTreasury from 'src/states/treasureBay/hooks/useFetchTreasury';
import useFetchTreasuryProposals from 'src/states/proposal/hooks/useFetchTreasuryProposals';
import ButtonVariant from 'src/constants/buttonVariant';
import ButtonSize from 'src/constants/buttonConstant';
import TextAlign from 'src/constants/textAlign';

const Home: NextPageWithLayout = () => {
  const [expanded, setExpanded] = React.useState<any>(false);
  const handler = {
    ChangeAccordion: (panel: string) => (_: any, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    VoteYes: () => {},
    VoteNo: () => {},
  };
  const fetchTreasury = useFetchTreasury();
  const fetchTreasuryProposals = useFetchTreasuryProposals();
  return (
    <div style={{ marginBottom: '80px' }}>
      <Head>
        <title>OBAY</title>
        <meta key="description" name="description" content="OBAY" />
      </Head>
      {fetchTreasury.loading ||
      !fetchTreasury.treasury ||
      fetchTreasuryProposals.loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '80vh',
          }}
        >
          <Loader
            type="MutatingDots"
            color="#49fdc0"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          <div
            style={{
              width: '100%',
              marginBottom: '50px',
              height: '40.2vh',
              position: 'relative',
            }}
          >
            <Image
              src={ObayBanner}
              alt="OBAY Banner"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'rgb(0, 0, 0, 0.5)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginLeft: '20px' }}>
                  <h1 style={{ color: 'white', fontSize: '8vw', margin: 0 }}>
                    OBAY
                  </h1>
                  <h3 style={{ color: 'white', fontSize: 20, margin: 0 }}>
                    Where your treasures lies
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <Container>
            <h2>Governance Overview</h2>
            <Flex colGap="xl">
              <StatsCard
                title="Total Value Locked"
                stats={(fetchTreasury.treasury as any)?.totalValueLocked}
              />
              <StatsCard title="Votes Delegated" stats={0} />
              <StatsCard
                title="Number of Proposals"
                stats={fetchTreasury.treasury?.proposals.length as any}
              />
              <StatsCard
                title="Stakeholders"
                stats={fetchTreasury.treasury?.stakeholders.length as any}
              />
            </Flex>
            <h2>Recent Proposals</h2>
            {fetchTreasuryProposals.proposals.map((proposal, index) => (
              <Accordion
                // className={styles.proposal}
                style={{
                  backgroundColor: colors.dark800,
                  borderRadius: 10,
                  border: `1px solid ${colors.dark500}`,
                  color: 'white',
                  marginBottom: '10px',
                }}
                expanded={expanded === `${index}`}
                onChange={handler.ChangeAccordion(`${index}`)}
              >
                <AccordionSummary
                  expandIcon={<FaChevronDown color="white" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Flex
                    justifyContent="space-between"
                    style={{ width: '100%', paddingRight: '50px' }}
                  >
                    <p>{proposal.title}</p>
                    <p style={{ color: colors.dark400 }}>
                      {moment
                        .unix(parseFloat(proposal.votingDeadline))
                        .format('DD MMMM YYYY')}
                    </p>
                    <p>
                      👍{' '}
                      {(
                        parseFloat(proposal.numberOfYesVotes) /
                          parseFloat(
                            fetchTreasury.treasury?.stakeholders.length as any
                          ) || 0
                      ).toFixed(2)}
                      % ≍ 👎{' '}
                      {(
                        parseFloat(proposal.numberOfNoVotes) /
                          parseFloat(
                            fetchTreasury.treasury?.stakeholders.length as any
                          ) || 0
                      ).toFixed(2)}
                      %
                    </p>
                    <div
                      style={{
                        color: colors.green500,
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#49fdc0"
                        height={10}
                        width={20}
                      />
                      <span style={{ marginLeft: '10px' }}>In progress</span>
                    </div>
                  </Flex>
                </AccordionSummary>
                <AccordionDetails>
                  <p>{proposal.description}</p>
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
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </>
      )}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
