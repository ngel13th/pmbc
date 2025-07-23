import React, { useState } from 'react';

function MintComponent() {
  const [quantity, setQuantity] = useState(1);
  const FIXED_COST_ETH = 0.05;

  return (
    <div>
      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
      <span style={{ margin: '0 1rem' }}>{quantity}</span>
      <button onClick={() => setQuantity(q => Math.min(5, q + 1))}>+</button>
      <p style={{ fontWeight: 700, fontSize: 18 }}>
        {(FIXED_COST_ETH * quantity).toFixed(4)} ETH
      </p>
    </div>
  );
}

export default MintComponent;
