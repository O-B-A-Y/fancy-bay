import React, { ReactElement } from 'react';
import { Container, TextInput } from '../../components';
import Flex from '../../components/Flex';
import FlexItem from '../../components/FlexItem';
import ContainerSize from '../../constants/containerSize';
import TextInputVariant from '../../constants/textInputVariant';
import { DefaultLayout } from '../../layouts';
import colors from '../../styles/colors.module.scss';
import { NextPageWithLayout } from '../_app';
import styles from './MyBays.module.scss';

// eslint-disable-next-line arrow-body-style
const MyBays: NextPageWithLayout = () => {
  return (
    <Container size={ContainerSize.ExtraLarge}>
      <div className={styles.container}>
        {/* MyBay Header section */}
        <Flex
          className={styles.myBaysHeaderSection}
          direction="row"
          alignItems="baseline"
        >
          <FlexItem className={styles.firstItem}>
            <span
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            >
              MyBays
            </span>
          </FlexItem>
          <FlexItem>
            <TextInput
              hasButton
              variant={TextInputVariant.outlined}
              borderWidth={1}
              backgroundColor={colors.dark500}
              placeholder="Search for your Bays"
              inputClassName={styles.baySearchInput}
              placeholderStyle={{
                color: 'white',
              }}
              buttonClassName={styles.inputButton}
              buttonText="Search"
            />
          </FlexItem>
        </Flex>
        {/* Divider */}
        <div className={styles.divider} />
      </div>
    </Container>
  );
};

MyBays.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyBays;
