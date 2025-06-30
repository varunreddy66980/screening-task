import { operators, size, margin } from '../data/operators.jsx';
import React from 'react';
import Operator from './Operator'; // ✅ Import added

export default ({ setDroppingItem }) => {
  const onDragStart = (e, gateId, isCustomGate) => {
    setDroppingItem(gateId);
    e.dataTransfer.setData('gateId', gateId);
    e.dataTransfer.setData('isCustomGate', isCustomGate);
  };

  return (
    <div className="flex flex-col p-2">
      <h1 className="font-semibold text-lg">Operators</h1>
      <div className="flex gap-2 flex-row p-2">
        {operators.map((op, index) => (
          <div
            key={index}
            title={op.title}
            draggable
            onDragStart={(e) => onDragStart(e, op.id, op.title === 'Custom Gate')}
            className="flex flex-col items-center cursor-pointer"
          >
            <Operator operator={op} /> {/* ✅ This renders the left panel gate */}
          </div>
        ))}
      </div>
    </div>
  );
};
