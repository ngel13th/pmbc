import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import styles from '../styles/Home.module.css';
import { _abi, GetContractAddy } from './abiGet';
import { useIsMounted } from './useIsMounted';
import { useSupply } from './readContract';

function MintComponent() {
  const { address } = useAccount();
  const mounted = useIsMounted();
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');
  
  const { data: supplyRaw } = useSupply();
  const paused = true;
  const supply = supplyRaw ? parseInt(supplyRaw.toString()) : 0;

  const mintPhase = 2;
  const fixedCost = 0.05;
  const minQty = 1;
  const maxQty = 5;
  const nativeToken = "ETH";

  const { write, isLoading, error } = useContractWrite({
    address: GetContractAddy(),
    abi: _abi,
    functionName: 'mint',
    args: [quantity],
    value: ethers.parseEther((fixedCost * quantity).toString()).toString()
  });

  const handleDecreaseQuantity = () => {
    if (quantity > minQty) setQuantity(q => q - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < maxQty) setQuantity(q => q + 1);
  };

  const handleMintClick = () => {
    if (!address) return alert('Error: Wallet not connected');
    if (paused) return alert('Error: Minting is paused');

    if (walletAddress.length !== 42) {
      alert(`Confirm your send to ${address} then press Mint to complete transaction.`);
      setWalletAddress(address);
      return;
    }

    try {
      write();
    } catch (err) {
      console.error("Minting error:", err);
      alert('An error occurred while minting. Please try again.');
    }
  };

  return (
    <div className={styles.mintContainer}>
      <h2 style={{ color: "#ffe100", textShadow: "#1a1a1a 1px 0 8px", textAlign: "center" }}>
        🚀 Mint Is Live — 0.05 {nativeToken} Each
      </h2>

      <div className={styles.quantityControl}>
        {mounted && (
          <>
            <img
              src="/left_arrow.png"
              alt="Decrease Quantity"
              onClick={handleDecreaseQuantity}
              className={styles.arrowButton}
              disabled={quantity === minQty}
            />
            <img
              src={`/${quantity}.png`}
              alt={`Quantity: ${quantity}`}
              className={styles.quantityImage}
            />
            <img
              src="/right_arrow.png"
              alt="Increase Quantity"
              onClick={handleIncreaseQuantity}
              className={styles.arrowButton}
              disabled={quantity === maxQty}
            />
          </>
        )}
      </div>

      <div className={styles.mintToControl}>
        <input
          type="text"
          value={walletAddress}
          onChange={e => setWalletAddress(e.target.value)}
          placeholder="Wallet Address"
        />
      </div>

      <div className={styles.mintCostSupply}>
        {mounted && paused && <p>Mint Currently Paused</p>}
        {mounted && !paused && <p>Total: {(fixedCost * quantity).toFixed(4)} {nativeToken}</p>}
        {mounted && <p>Supply: {supply} / 2222</p>}
      </div>

      <div className={styles.mintButton}>
        <img
          src="/mint.png"
          alt="Mint Button"
          onClick={handleMintClick}
          className={styles.mintButton}
          style={{ opacity: isLoading ? 0.5 : 1 }}
        />
      </div>

      {error && <p style={{ color: 'red' }}>Minting Error: {error.message}</p>}
    </div>
  );
}

export default MintComponent;
