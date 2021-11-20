import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Flex from '../Flex';
import FlexItem from '../FlexItem';
import styles from './SwitchNavigationButton.module.scss';

interface SwitchLabel {
  name: string;
  path: string;
}

interface SwitchButtonProps {
  labels: SwitchLabel[];
}

const SwitchNavigationButton: React.FC<SwitchButtonProps> = ({ labels }) => {
  const router = useRouter();
  return (
    <>
      {/* Switch Mode (Swap | Liquidity) */}
      <Flex direction="row" className={styles.switchBox}>
        {labels.map((l, index) => (
          <FlexItem
            key={index.toString()}
            className={clsx([
              styles.switchButton,
              {
                [styles.active]: l.path === router.pathname,
              },
            ])}
            flex="one"
            alignSelf="stretch"
          >
            <Link href={l.path} passHref>
              <a>{l.name}</a>
            </Link>
          </FlexItem>
        ))}
        {/* Swap Switch */}
      </Flex>
    </>
  );
};

export default SwitchNavigationButton;
