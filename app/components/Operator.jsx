'use client';
import { useState, useEffect } from 'react';
import { size } from '../data/operators';

export default function Operator({ operator }) {
  const [showEye, setShowEye] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);

  const isCustomGate = operator?.id === 'CustomGate';

  useEffect(() => {
    console.log('Rendering Operator:', operator); // ✅ See if CustomGate appears
  }, [operator]);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: operator.height * size,
        border: '1px solid #555',
        backgroundColor: operator.fill || '#000',
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
            {operator.components?.map((_, index) => (
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
              padding: '2px 5px',
              zIndex: 10,
            }}
          >
            ❌
          </button>
        </>
      ) : (
        <>
          <svg width={size} height={size * operator.height}>
            {operator.icon}
          </svg>

          {isCustomGate && showEye && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsXRayOpen(true);
              }}
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '2px 5px',
                cursor: 'pointer',
                fontSize: 12,
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
