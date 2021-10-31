import React from 'react';
import Header from '../../components/Header';

interface DefaultLayoutProps {}

// eslint-disable-next-line arrow-body-style
const Default: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Default;
