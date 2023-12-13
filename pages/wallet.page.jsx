import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MintComponent from './mintCtrl.page';
import styles from '../styles/Home.module.css';
  
function Wallet() {
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if address is not null or empty to determine if the wallet is connected
    setIsConnected(!!address);
  }, [address]);

  return (
    <div className={styles.web3Container}>
      <div className={styles.topLogoContainer}>
        <img src="/topLogo.png" alt="Logo" className={styles.topLogo} />
      </div>

      <div
        className={`${styles.rainbowContainer} ${
          isConnected ? styles.connected : styles.disconnected
        }`}
      >
        <ConnectButton label="" accountStatus="" chainStatus="none" showBalance={false} />
      </div>
      <MintComponent />
    </div>
  );
}

export default Wallet;
