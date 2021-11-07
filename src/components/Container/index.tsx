import React from 'react';
import ContainerSize from '../../constants/containerSize';
import styles from './Container.module.scss';

interface ContainerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = ContainerSize.ExtraLarge,
}) => (
  <>
    <div className={styles[`container-${size}`]}>{children}</div>
  </>
);

export default Container;
