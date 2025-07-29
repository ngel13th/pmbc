import React, { useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import styles from '../styles/Home.module.css';
import { _abi, _abiAddress, GetContractAddy } from './abiGet';
import { useIsMounted } from './useIsMounted';

function MintComponent() {
  const { address } = useAccount();
  const mounted = useIsMounted();
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');

  const minQty = 1;
  const maxQty = 5;
  const nativeToken = "ETH";
  const fixedCost = 0.05;

  const { data: supplyRaw, isLoading: loadingSupply } = useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'totalSupply',
  });

  const { data: pausedRaw } = useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'paused',
  });

  const paused = pausedRaw === true;
  const supply = supplyRaw ? parseInt(supplyRaw.toString()) : 0;

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
    if (!address) {
      alert('Error: Wallet not connected');
      return;
    }
    if (paused) {
      alert('Error: Minting is paused');
      return;
    }
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
      <h2 style={{ color: "#00FFAA", textAlign: "center" }}>🚀 Mint Is Live — 0.05 {nativeToken} Each</h2>

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
        {paused && <p>Mint Currently Paused</p>}
        {!paused && <p>Total: {(fixedCost * quantity).toFixed(4)} {nativeToken}</p>}
        {!loadingSupply && <p>Supply: {supply} / 2222</p>}
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
