import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { utils } from 'ethers';
import styles from '../styles/Home.module.css';

// Constants
const FIXED_COST_ETH = 0.05;
const MIN_QTY = 1;
const MAX_QTY = 5;
const CONTRACT_ADDRESS = "0x12662b6a2a424a0090b7d09401fb775a9b968898";
const CONTRACT_ABI = [ /* <-- Put your contract ABI here */ ];

function MintComponent() {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1);

  // Calculate total price in ETH and in wei
  const totalPriceEth = (FIXED_COST_ETH * quantity).toFixed(4);
  const valueInWei = utils.parseEther((FIXED_COST_ETH * quantity).toString()).toString();

  const { write, error } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'mint',
    args: [quantity],
    value: valueInWei,
  });

  const handleMintClick = () => {
    if (!address) {
      alert('Connect your wallet!');
      return;
    }
    try {
      write();
    } catch (e) {
      alert('Mint failed: ' + (e?.message || 'Unknown error'));
    }
  };

  return (
    <div className={styles.mintContainer}>
      <div className={styles.quantityControl}>
        <button
          onClick={() => setQuantity(q => Math.max(q - 1, MIN_QTY))}
          disabled={quantity === MIN_QTY}
        >-</button>
        <span style={{ margin: '0 1rem' }}>{quantity}</span>
        <button
          onClick={() => setQuantity(q => Math.min(q + 1, MAX_QTY))}
          disabled={quantity === MAX_QTY}
        >+</button>
      </div>
      <div className={styles.mintCostSupply}>
        <p>{totalPriceEth} ETH</p>
      </div>
      <div className={styles.mintButton}>
        <button onClick={handleMintClick}>Mint</button>
      </div>
      {error && <div style={{ color: 'red', marginTop: 10 }}>Mint failed: {error.message}</div>}
    </div>
  );
}

export default MintComponent;
