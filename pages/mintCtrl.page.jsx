import React, { useState, useEffect } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import styles from '../styles/Home.module.css';
import { GetPaused, GetSupply, GetCost, GetMintPhase } from './readContract';
import { _abi, GetContractAddy } from './abiGet';
import { useIsMounted } from './useIsMounted';

function MintComponent() {
  const { address } = useAccount();
  const mounted = useIsMounted();
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');
  const [cost, setCost] = useState(0);
  const [supply, setSupply] = useState(0);
  const [mintPhase, setMintPhase] = useState(0);
  const [paused, setPaused] = useState(true);

  const minQty = 1;
  const maxQty = 5;
  const nativeToken = "ETH";

  useEffect(() => {
    async function fetchContractValues() {
      if (!address) return;
      try {
        const [costRaw, supplyRaw, mintPhaseRaw, pausedRaw] = await Promise.all([
          GetCost(address, quantity),
          GetSupply(),
          GetMintPhase(),
          GetPaused()
        ]);
        setCost(parseFloat(ethers.formatEther(costRaw)));
        setSupply(parseInt(supplyRaw));
        setMintPhase(parseInt(mintPhaseRaw));
        setPaused(pausedRaw === true);
      } catch (err) {
        console.error("Error fetching contract data", err);
      }
    }
    fetchContractValues();
  }, [address, quantity]);

  const { write, isLoading, error } = useContractWrite({
    address: GetContractAddy(),
    abi: _abi,
    functionName: 'mint',
    args: [quantity],
    value: ethers.parseEther((cost * quantity).toString()).toString()
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
      <div className={styles.quantityControl}>
        {mounted && mintPhase !== 0 && (
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
        {mounted && mintPhase === 0 && <p>Minting Soon</p>}
        {mounted && mintPhase === 1 && <p>Whitelist Phase</p>}
        {mounted && mintPhase === 2 && <p>{(cost * quantity).toFixed(4)} {nativeToken}</p>}
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
