'use client';
import { useState } from 'react';
import { size } from '../data/operators';

export default function Operator({ operator }) {
  // ✅ Debug logs to check what's being passed
  console.log('Rendering Operator:', operator);

  const [showEye, setShowEye] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);

  const isCustomGate = operator.id === 'CustomGate';
  console.log('isCustomGate?', isCustomGate); // ✅ This should log true when rendering CG

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
          {/* ✅ X-Ray View */}
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
            {operator.components?.map((comp, index) => (
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
          {/* ❌ Close Button */}
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
          {/* ✅ Normal icon view */}
          <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg">
            <rect
              fill={operator.fill}
              height={size}
              width={size}
              rx="4"
              x="0"
              y="0"
            />
            {operator.icon}
          </svg>

          {/* ✅ 👁️ Button only for Custom Gate */}
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

