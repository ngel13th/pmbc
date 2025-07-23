import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { utils } from 'ethers';
import styles from '../styles/Home.module.css';

const MINT_PRICE_ETH = 0.05;
const MIN_QTY = 1;
const MAX_QTY = 5;

function MintComponent() {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1);

  // Calculate total price in ETH and wei
  const totalPriceEth = (MINT_PRICE_ETH * quantity).toFixed(4);
  const valueInWei = utils.parseEther((MINT_PRICE_ETH * quantity).toString()).toString();

  const { write, error } = useContractWrite({
    address: "0x12662b6a2a424a0090b7d09401fb775a9b968898",
    abi: [/* your contract ABI */],
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
      alert('Mint failed: ' + e.message);
    }
  };

  return (
    <div className={styles.mintContainer}>
      <div>
        <button disabled={quantity <= MIN_QTY} onClick={() => setQuantity(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button disabled={quantity >= MAX_QTY} onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <div>
        <p>Price: {totalPriceEth} ETH</p>
      </div>
      <button onClick={handleMintClick}>Mint</button>
      {error && <div style={{color:'red'}}>Mint failed: {error.message}</div>}
    </div>
  );
}

export default MintComponent;
