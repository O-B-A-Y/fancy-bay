import React from 'react';
import styles from './StatsCard.module.scss';

interface StatsCardProps {
  title: string;
  stats: number | string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stats }) => (
  <div className={styles.container}>
    <div className={styles.title}>{title}</div>
    <div className={styles.stats}>{stats}</div>
  </div>
);

export default StatsCard;
