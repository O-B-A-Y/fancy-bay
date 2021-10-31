import React from 'react';
import ContainerSize from '../../constants/containerSize';
import styles from './Container.module.scss';

interface ContainerProps {
  size?: ContainerSize;
}

const Container: React.FC<ContainerProps> = ({
  size = ContainerSize.ExtremeLarge,
  children,
  ...rest
}) => (
  <>
    <div className={styles[`container-${size}`]} {...rest}>
      {children}
    </div>
  </>
);

export default Container;
