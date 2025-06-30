'use client';
import { useState } from 'react';
import { size } from '../data/operators';

export default function Operator({ operator, itemId, symbol, height, width, fill, isCustom, components }) {
  const [showEye, setShowEye] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);

  const isCustomGate = isCustom;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: height * size,
        border: '1px solid #555',
        backgroundColor: fill || '#000',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setShowEye(true)}
      onMouseLeave={() => setShowEye(false)}
    >
      {isXRayOpen ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '2px',
              width: '100%',
              height: '100%',
              padding: '4px',
              backgroundColor: '#222',
            }}
          >
            {components.map((comp, index) => (
              <div
                key={index}
                style={{
                  background: 'red',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                H
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsXRayOpen(false)}
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              fontSize: '12px',
              background: '#fff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              padding: '2px 5px'
            }}
          >
            ❌
          </button>
        </>
      ) : (
        <>
          {symbol}
          {isCustomGate && showEye && (
            <button
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '2px 5px',
                cursor: 'pointer',
                fontSize: 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsXRayOpen(true);
              }}
            >
              👁️
            </button>
          )}
        </>
      )}
    </div>
  );
}
