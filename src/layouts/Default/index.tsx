import React from 'react';
import Header from '../../components/Header';

const Default: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Default;
