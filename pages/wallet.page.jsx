import React, { useState } from "react";
import styles from '../styles/Home.module.css'; // Adjust path if needed

const FIXED_COST_ETH = 0.05;
const MIN_QTY = 1;
const MAX_QTY = 5;

const MintBox = () => {
  const [quantity, setQuantity] = useState(1);

  const totalPriceEth = (FIXED_COST_ETH * quantity).toFixed(4);

  return (
    <div className={styles.mintCenter}>
      {/* Quantity Control */}
      <div className={styles.quantityRow}>
        <button
          className={styles.quantityArrow}
          onClick={() => setQuantity(q => Math.max(MIN_QTY, q - 1))}
          disabled={quantity === MIN_QTY}
        >↓</button>
        <span className={styles.quantityNumber}>{quantity}</span>
        <button
          className={styles.quantityArrow}
          onClick={() => setQuantity(q => Math.min(MAX_QTY, q + 1))}
          disabled={quantity === MAX_QTY}
        >↑</button>
      </div>

      {/* ETH Price */}
      <div className={styles.ethPrice}>
        {totalPriceEth} ETH
      </div>

      {/* Mint Button */}
      <button style={{
        padding: '16px 36px',
        fontSize: 28,
        fontWeight: 700,
        borderRadius: 12,
        background: 'black',
        color: 'yellow',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 12px #eee'
      }}>
        MINT NOW
      </button>
    </div>
  );
};

export default MintBox;
