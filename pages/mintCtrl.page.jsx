import React, { useState } from 'react';
import styles from '../styles/Home.module.css'; // Adjust path if needed

function MintComponent() {
  const [quantity, setQuantity] = useState(1);
  const FIXED_COST_ETH = 0.05;

  return (
    <div className={styles.mintContainer}>
      <div className={styles.quantityControl}>
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          disabled={quantity === 1}
          style={{
            fontSize: 36,
            borderRadius: 8,
            border: 'none',
            background: '#eee',
            marginRight: 24,
            cursor: quantity === 1 ? 'not-allowed' : 'pointer',
            opacity: quantity === 1 ? 0.5 : 1,
            width: 50,
            height: 50,
          }}
        >
          –
        </button>
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: '0 10px',
            minWidth: 40,
            textAlign: 'center',
            letterSpacing: 1.5,
          }}
        >
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(q => Math.min(5, q + 1))}
          disabled={quantity === 5}
          style={{
            fontSize: 36,
            borderRadius: 8,
            border: 'none',
            background: '#eee',
            marginLeft: 24,
            cursor: quantity === 5 ? 'not-allowed' : 'pointer',
            opacity: quantity === 5 ? 0.5 : 1,
            width: 50,
            height: 50,
          }}
        >
          +
        </button>
      </div>
      <div className={styles.mintCostSupply}>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 28,
            margin: '12px 0 24px 0',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 10,
            padding: '8px 32px',
            boxShadow: '0 2px 8px #eee',
            letterSpacing: 2,
            color: '#111',
            minWidth: 150,
          }}
        >
          {(FIXED_COST_ETH * quantity).toFixed(4)} ETH
        </p>
      </div>
      <button
        style={{
          padding: '16px 36px',
          fontSize: 28,
          fontWeight: 700,
          borderRadius: 12,
          background: 'black',
          color: 'yellow',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 12px #eee',
        }}
      >
        MINT NOW
      </button>
    </div>
  );
}

export default MintComponent;

