import React, { useState } from 'react';

// Optional: replace with your actual CSS module import
// import styles from '../styles/Home.module.css';

const FIXED_COST_ETH = 0.05;
const MIN_QTY = 1;
const MAX_QTY = 5;

function MintComponent() {
  const [quantity, setQuantity] = useState(1);

  // Calculate the total price
  const totalPriceEth = (FIXED_COST_ETH * quantity).toFixed(4);

 return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: '40px'
    }}>
      {/* Quantity Controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px'
      }}>
        <button
          style={{
            fontSize: 28,
            padding: '4px 18px',
            marginRight: 16,
            borderRadius: 8,
            border: 'none',
            background: '#eee',
            cursor: quantity === MIN_QTY ? 'not-allowed' : 'pointer',
            opacity: quantity === MIN_QTY ? 0.5 : 1
          }}
          disabled={quantity === MIN_QTY}
          onClick={() => setQuantity(q => Math.max(MIN_QTY, q - 1))}
        >↓</button>

        <span style={{
          fontSize: 48,
          fontWeight: 'bold',
          margin: '0 10px'
        }}>{quantity}</span>

        <button
          style={{
            fontSize: 28,
            padding: '4px 18px',
            marginLeft: 16,
            borderRadius: 8,
            border: 'none',
            background: '#eee',
            cursor: quantity === MAX_QTY ? 'not-allowed' : 'pointer',
            opacity: quantity === MAX_QTY ? 0.5 : 1
          }}
          disabled={quantity === MAX_QTY}
          onClick={() => setQuantity(q => Math.min(MAX_QTY, q + 1))}
        >↑</button>
      </div>

      {/* Price Display */}
      <p style={{
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 28,
        margin: '0 0 30px 0',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 12,
        padding: '8px 30px',
        boxShadow: '0 1px 8px #ccc',
        letterSpacing: 2,
        color: '#333'
      }}>
        {totalPriceEth} ETH
      </p>

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
}

export default MintComponent;
