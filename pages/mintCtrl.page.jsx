import React, { useState } from 'react';

function MintComponent() {
  const [quantity, setQuantity] = useState(1);
  const FIXED_COST_ETH = 0.05;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 220,
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          disabled={quantity === 1}
          style={{
            fontSize: 36,
            padding: '2px 16px',
            borderRadius: 8,
            border: 'none',
            background: '#eee',
            marginRight: 24,
            cursor: quantity === 1 ? 'not-allowed' : 'pointer',
            opacity: quantity === 1 ? 0.5 : 1,
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
            padding: '2px 16px',
            borderRadius: 8,
            border: 'none',
            background: '#eee',
            marginLeft: 24,
            cursor: quantity === 5 ? 'not-allowed' : 'pointer',
            opacity: quantity === 5 ? 0.5 : 1,
          }}
        >
          +
        </button>
      </div>
      <p
        style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 28,
          margin: '0 0 24px 0',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 10,
          padding: '8px 32px',
          boxShadow: '0 2px 8px #eee',
          letterSpacing: 2,
          color: '#111',
        }}
      >
        {(FIXED_COST_ETH * quantity).toFixed(4)} ETH
      </p>
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
