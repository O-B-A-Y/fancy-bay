import React from 'react';
import Header from '../../components/Header';
import styles from './Default.module.scss';

const Default: React.FC = ({ children }) => (
  <div className={styles.imgBg}>
    <Header />
    {children}
  </div>
);

export default Default;
