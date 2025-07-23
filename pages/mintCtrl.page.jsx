import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { GetPaused, GetSupply } from './readContract';
import { _abi, GetContractAddy } from './abiGet';
import { utils } from "ethers";
import styles from '../styles/Home.module.css';

function MintComponent() {
  const { address } = useAccount();
  const mounted = useIsMounted();
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');
  const [supply, setSupply] = useState(null);
  const [paused, setPaused] = useState(false);

  const minQty = 1;
  const maxQty = 5;
  const nativeToken = "ETH";
  const mintPhase = 2;
  const FIXED_COST_ETH = 0.05;

  // Get supply & paused status if needed
  React.useEffect(() => {
    async function fetchDetails() {
      try {
        const supplyVal = await GetSupply();
        setSupply(supplyVal);

        const pausedVal = await GetPaused();
        setPaused(pausedVal);
      } catch (e) {
        setSupply(null);
        setPaused(false);
      }
    }
    fetchDetails();
  }, []);

  // Prepare value for contract call
  const valueInWei = utils.parseEther((FIXED_COST_ETH * quantity).toString()).toString();

  const { error, write } = useContractWrite({
    address: GetContractAddy(),
    abi: _abi,
    functionName: 'mint',
    args: [quantity],
    value: valueInWei,
  });

  const handleDecreaseQuantity = () => {
    if (quantity > minQty) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < maxQty) setQuantity(quantity + 1);
  };

  const handleWalletChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleMintClick = () => {
    if (!address) {
      alert(`Error: Not Connected`);
      return;
    }
    if (paused) {
      alert(`Error: Paused`);
      return;
    }
    if (walletAddress.length !== 42) {
      alert(`Confirm your send to ${address} then press Mint to complete transaction.`);
      setWalletAddress(address);
    } else {
      try {
        write();
      } catch (error) {
        console.error('Error while minting:', error);
        alert('An error occurred while minting. Please try again later.');
      }
    }
  };

  const totalPrice = (FIXED_COST_ETH * quantity).toFixed(4);

  return (
    <div className={styles.mintContainer}>
      <div className={styles.quantityControl}>
        {mounted && mintPhase !== 0 && (
          <img
            src="/left_arrow.png"
            alt="Decrease Quantity"
            onClick={handleDecreaseQuantity}
            className={styles.arrowButton}
            style={{ opacity: quantity === minQty ? 0.4 : 1, cursor: quantity === minQty ? "not-allowed" : "pointer" }}
          />
        )}

        <img
          src={`/${quantity}.png`}
          alt={`Quantity: ${quantity}`}
          className={styles.quantityImage}
        />

        {mounted && mintPhase !== 0 && (
          <img
            src="/right_arrow.png"
            alt="Increase Quantity"
            onClick={handleIncreaseQuantity}
            className={styles.arrowButton}
            style={{ opacity: quantity === maxQty ? 0.4 : 1, cursor: quantity === maxQty ? "not-allowed" : "pointer" }}
          />
        )}
      </div>

      <div className={styles.mintToControl}>
        <br />
        <input
          type="text"
          value={walletAddress}
          onChange={handleWalletChange}
          placeholder="Wallet Address"
        />
      </div>

      <div className={styles.mintCostSupply}>
        {mounted && paused && <p>Mint Currently Paused</p>}
        {mounted && mintPhase === 0 && <p>Minting Soon</p>}
        {mounted && mintPhase === 1 && <p>Whitelist Phase</p>}
        {mounted && mintPhase === 2 && (
          <p>{totalPrice} {nativeToken}</p>
        )}
        {mounted && supply !== null && (
          <p>Supply: {Number(supply)} / 2222</p>
        )}
      </div>

      <div className={styles.mintButton}>
        <img
          src="/mint.png"
          alt="Mint Button"
          onClick={handleMintClick}
          className={styles.mintButton}
        />
      </div>

      {error && <div style={{ color: 'red', marginTop: 10 }}>Error: {error.message}</div>}
    </div>
  );
}

export default MintComponent;
