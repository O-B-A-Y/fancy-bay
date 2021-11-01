import React from 'react';
import ContainerSize from '../../constants/containerSize';
import styles from './Container.module.scss';

interface ContainerProps {
  size?: ContainerSize;
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = ContainerSize.ExtremeLarge,
}) => (
  <>
    <div className={styles[`container-${size}`]}>{children}</div>
  </>
);

export default Container;
