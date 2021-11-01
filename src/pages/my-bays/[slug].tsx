import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Grid, GridItem } from '@chakra-ui/layout';
import moment from 'moment';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { currencyUtil } from 'src/utils';
import styles from './Bay.module.scss';

const myLoader = ({
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

const Bay: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const mockBayInfo = [
    {
      label: 'Total Fund',
      content: `${currencyUtil.formatByUnit(1521000, 'USD')} USD`,
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
  };

  return (
    <div>
      <Head>
        <title>{(slug as string)?.toUpperCase()}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box className={styles.container} paddingX={100} paddingY={50}>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={2}
            className={styles.inner}
          >
            <GridItem
              colSpan={2}
              rowSpan={2}
              bg="#1B1B1B"
              borderWidth="2"
              borderColor="#4A4A4A"
              borderRadius={10}
              className={styles.bayInfo}
              paddingX="10"
              paddingY="8"
            >
              <div className={styles.bayInfoInner}>
                <div className={styles.metaContainer}>
                  <Image
                    loader={myLoader as any}
                    src="https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy81YTc5NDA0YjQ2ZTYyNWFhYTFkYTBhNDJlMmU4Y2JiYy5qcGc=.jpg"
                    alt={slug as string}
                    width={2250}
                    height={1390}
                    layout="responsive"
                  />
                  <br />
                  <h1 className={styles.bayName}>{slug}</h1>
                  <p className={styles.bayAddress}>
                    0x460aDc7A9b5253A765e662A031D26C8743a2EbB6
                  </p>
                  {mockBayInfo.map(({ content, label }) => (
                    <RowItem label={label} content={content} />
                  ))}
                </div>
                <div className={styles.separator} />
                <div className={styles.bottomContainer}>
                  <div className={styles.rowItem}>
                    <p>
                      {`${'0x460aDc7A9b5253A765e662A031D26C8743a2EbB6'
                        .substring(0, 10)
                        .trim()}...`}
                    </p>
                    <p>100 OBAY</p>
                  </div>
                  <InputGroup size="md" marginBottom="4">
                    <Input
                      borderColor="#4E4E4E"
                      pr="4.5rem"
                      type="text"
                      background="#181818"
                      placeholder="Amount"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        bg="#373339"
                        h="1.75rem"
                        size="sm"
                        onClick={handler.Stake}
                      >
                        Stake
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <div className={styles.rowItem}>
                    <div className={styles.metaLabel}>Total</div>
                    <p className={styles.metaContent}>{0.00005867} OBAY</p>
                  </div>
                </div>
                <Button
                  bg="#303030"
                  borderWidth="2"
                  borderColor="#4E4E4E"
                  colorScheme="teal"
                  size="md"
                  width="full"
                >
                  Leave the bay
                </Button>
              </div>
            </GridItem>
            <GridItem
              colSpan={5}
              rowSpan={2}
              bg="#1B1B1B"
              borderWidth="2"
              borderColor="#4A4A4A"
              borderRadius={10}
              paddingX="10"
              paddingY="8"
            />
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Bay;
