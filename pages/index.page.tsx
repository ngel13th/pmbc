import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Wallet from './wallet.page';
import Link from 'next/link';
import AdminComponent from './adminCtrl.page';
import { useAccount } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { AdminCheck } from './readContract';

const Home: NextPage = () => {
  const { address } = useAccount();
  const isAdmin = AdminCheck(address);
  const mounted = useIsMounted();
  return (
    <div className={styles.container}>
      <Head>
        <title>Prime Mates Board Club Mint</title>
        <meta name="description" content="" />
        <link href="/icon.png" rel="icon" type="image/x-icon"/>
      </Head>

      <main className={styles.main}>

        <Wallet />
        {mounted ? isAdmin && <AdminComponent /> : null}
        
      </main>

      <img src="/bottomImg.png" alt="Logo" className={styles.bottomImg} />

      <footer className={styles.footer}>
        <Link href="https://opensea.io/collection/pmbc" rel="noopener noreferrer" target="_blank">
          <img src="/opensea_icon.png" alt="OpenSea" className={styles.footerLogo} />
        </Link>
        <Link href="https://etherscan.io/address/0x12662b6a2a424a0090b7d09401fb775a9b968898" rel="noopener noreferrer" target="_blank">
          <img src="/eth_icon.png" alt="Etherscan" className={styles.footerLogo} />
        </Link>
        <Link href="https://twitter.com/PrimeMatesBC" rel="noopener noreferrer" target="_blank">
          <img src="/x_icon.png" alt="Twitter" className={styles.footerLogo} />
        </Link>
      </footer>
    </div>
  );
};

export default Home;
