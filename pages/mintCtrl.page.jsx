import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { GetPaused, GetSupply, GetCost } from './readContract';
import { _abi, GetContractAddy } from './abiGet';
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';

function MintComponent() {
  const { address } = useAccount();
  const mounted = useIsMounted();
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);

  const minQty = 1;
  const maxQty = 5;
  const nativeToken = "ETH"; // ETH or MATIC
  const _mintPhase = 2;
  const _paused = GetPaused();
  const _cost = GetCost(address, quantity);
  const _supply = GetSupply();

  const { data, isLoading, isSuccess, error, write } = useContractWrite({
    address: GetContractAddy(),
    abi: _abi,
    functionName: 'mint',
    args: [quantity],
    value: ethers.parseEther((_cost * quantity).toString()),
  });

  const handleDecreaseQuantity = () => {
    if (quantity > minQty) setQuantity(q => q - 1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < maxQty) setQuantity(q => q + 1);
  };

  const handleWalletChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleMintClick = () => {
    if (!address) {
      alert("Error: Wallet not connected");
      return;
    }
    if (_paused) {
      alert("Error: Minting is paused");
      return;
    }
    if (!ethers.isAddress(walletAddress)) {
      alert(`Confirm your wallet: ${address}, then press Mint`);
      setWalletAddress(address);
      return;
    }
    try {
      write();
    } catch (err) {
      console.error('Minting failed:', err);
      alert('Transaction failed. Please try again later.');
    }
  };

  return (
    <div className={styles.mintContainer}>
      <div className={styles.quantityControl}>
        {mounted && _mintPhase !== 0 && (
          <img
            src="/left_arrow.png"
            alt="Decrease Quantity"
            onClick={handleDecreaseQuantity}
            className={styles.arrowButton}
          />
        )}
        <img
          src={`/${quantity}.png`}
          alt={`Quantity: ${quantity}`}
          className={styles.quantityImage}
        />
        {mounted && _mintPhase !== 0 && (
          <img
            src="/right_arrow.png"
            alt="Increase Quantity"
            onClick={handleIncreaseQuantity}
            className={styles.arrowButton}
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
        {mounted && _paused && <p>Mint Currently Paused</p>}
        {mounted && _mintPhase === 0 && <p>Minting Soon</p>}
        {mounted && _mintPhase === 1 && <p>Whitelist Phase</p>}
        {mounted && _mintPhase === 2 && (
          <p>{((_cost / 10 ** 18) * quantity).toFixed(4)} {nativeToken}</p>
        )}
        {mounted && _supply >= 0 && (
          <p>Supply: {parseInt(_supply)} / 2222</p>
        )}
        {isLoading && <p>Minting in progress...</p>}
        {isSuccess && <p>🎉 Mint Successful! Tx: {data?.hash}</p>}
      </div>

      <div className={styles.mintButton}>
        <img
          src="/mint.png"
          alt="Mint Button"
          onClick={handleMintClick}
          className={styles.mintButton}
        />
      </div>

      {error && !errorFlag && (() => {
        alert(`Error: ${error.message}`);
        setErrorFlag(true);
      })()}
    </div>
  );
}

export default MintComponent;
