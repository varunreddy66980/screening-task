'use client';
import { useState } from 'react';
import { size } from '../data/operators';

export default function Operator({ operator }) {
  const [showEye, setShowEye] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);

  const isCustomGate = operator.id === 'CustomGate';
  console.log('Rendering Operator:', operator.id, '| isCustom:', isCustomGate, '| Components:', operator.components);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: operator.height * size,
        border: '2px solid red', // For visual debug - optional
        backgroundColor: operator.fill || '#000',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={() => {
        setShowEye(true);
        console.log('Hovered:', operator.id);
      }}
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
          <svg height={size * operator.height} width={size} xmlns="http://www.w3.org/2000/svg">
            <rect
              fill={operator.fill}
              height={size * operator.height}
              rx="4"
              width={size}
              x="0"
              y="0"
            />
            {operator.icon}
          </svg>
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
