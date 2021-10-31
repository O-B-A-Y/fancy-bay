import Link from 'next/link';
import React from 'react';
// import styles from 'Navbar.module.scss'

// eslint-disable-next-line arrow-body-style
const Header: React.FC = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">
            <a>LOGO</a>
          </Link>
        </li>

        <li>
          <Link href="/browse">
            <a>Browse</a>
          </Link>
        </li>
        <li>
          <Link href="/mybay">
            <a>MyBay</a>
          </Link>
        </li>
        <li>
          <Link href="/exchange">
            <a>Exchange</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
