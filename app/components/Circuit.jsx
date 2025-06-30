import ReactGridLayout from 'react-grid-layout';
import React, { useEffect } from 'react';
import Operator from './Operator';
import { margin, operators, size } from '../data/operators';

const circuitContainerPadding = {
  x: 0,
  y: 0,
};
const containerPadding = {
  x: 10,
  y: 10,
};
const circuitLineMarginL = 40;
const circuitLineMarginR = 50;
const gridDimenY = 3;
const gridDimenX = 10;

export default ({ droppingItem }) => {
  const [layout, setLayout] = React.useState([]);
  const [droppingItemHeight, setDroppingItemHeight] = React.useState(1);
  const [draggedItemId, setDraggedItemId] = React.useState(null);

  useEffect(() => {
    if (!droppingItem) return;
    setDroppingItemHeight(
      operators.find(op => op.id === droppingItem)?.height ?? 1
    );
  }, [droppingItem]);

  const handleCircuitChange = (newCircuit) => {
    setLayout(newCircuit.layout);
  };

  const onDrop = (newLayout, layoutItem, event) => {
    event.preventDefault();

    let gateId = event.dataTransfer.getData('gateId');
    const isCustomGate = event.dataTransfer.getData('isCustomGate') === 'true';
    const height = operators.find(op => op.id === gateId)?.height || 1;

    if (layoutItem.y + height > gridDimenY) return;

    const newItem = {
      i: new Date().getTime().toString(),
      gateId: gateId,
      x: layoutItem.x,
      y: layoutItem.y,
      w: 1,
      h: height,
      isResizable: false,
    };

    const updatedLayout = newLayout
      .filter(item => item.i !== '__dropping-elem__' && item.y < gridDimenY)
      .map(item => ({
        ...item,
        gateId: layout.find(i => i.i === item.i)?.gateId,
      }));

    updatedLayout.push(newItem);
    handleCircuitChange({ layout: updatedLayout });
  };

  const handleDragStop = (newLayout) => {
    if (!draggedItemId) return;

    const updatedLayout = newLayout
      .filter(item => item.i !== '__dropping-elem__' && item.y < gridDimenY)
      .map(item => ({
        ...item,
        gateId: layout.find(i => i.i === item.i)?.gateId,
      }));

    setLayout(updatedLayout);
    setDraggedItemId(null);
  };

  return (
    <div
      className='relative bg-white border-2 border-gray-200 m-2 shadow-lg rounded-lg'
      style={{
        boxSizing: 'content-box',
        padding: `${circuitContainerPadding.y}px ${circuitContainerPadding.x}px`,
        minWidth: `${2 * containerPadding.x + gridDimenX * (size + margin.x)}px`,
        width: `${2 * containerPadding.x + gridDimenX * (size + margin.x) + size / 2 + margin.x}px`,
        height: `${2 * containerPadding.y + gridDimenY * (size + margin.y) - margin.y}px`,
        overflow: 'hidden',
      }}
    >
      <ReactGridLayout
        allowOverlap={false}
        layout={layout}
        useCSSTransforms={false}
        className='relative z-20'
        cols={gridDimenX}
        compactType={null}
        containerPadding={[containerPadding.x, containerPadding.y]}
        droppingItem={{
          i: '__dropping-elem__',
          h: droppingItemHeight,
          w: 1,
        }}
        isBounded={false}
        isDroppable={true}
        margin={[margin.x, margin.y]}
        onDrag={() => {
          const placeholderEl = document.querySelector('.react-grid-placeholder');
          if (placeholderEl) {
            placeholderEl.style.backgroundColor = 'rgba(235, 53, 53, 0.2)';
            placeholderEl.style.border = '2px dashed blue';
          }
        }}
        onDragStart={(layout, oldItem) => {
          const draggedItemId = oldItem?.i;
          if (!draggedItemId) return;
          setDraggedItemId(draggedItemId);
        }}
        onDragStop={(layout, oldItem, newItem) => {
          handleDragStop(layout);
        }}
        onDrop={onDrop}
        preventCollision={true}
        rowHeight={size}
        style={{
          minHeight: `${2 * containerPadding.y + gridDimenY * (size + margin.y) - margin.y}px`,
          maxHeight: `${2 * containerPadding.y + gridDimenY * (size + margin.y) - margin.y}px`,
          overflowY: 'visible',
          marginLeft: `${circuitLineMarginL}px`,
          marginRight: `${circuitLineMarginR}px`,
        }}
        width={gridDimenX * (size + margin.x)}
      >
        {layout?.map((item, index) => {
          const gate = operators.find(op => op.id === item.gateId);
          if (!gate) return null;

          return (
            <div
              className='grid-item relative group'
              data-grid={item}
              key={`${item.i}`}
            >
              <Operator
                operator={{
                  id: gate.id,
                  title: gate.title,
                  height: gate.height,
                  width: gate.width,
                  fill: gate.fill,
                  icon: gate.icon,
                  isCustom: gate.isCustom,
                  components: gate.components ?? [],
                }}
              />
            </div>
          );
        })}
      </ReactGridLayout>

      <div
        className='absolute top-0 left-0 z-10'
        style={{
          width: `${2 * containerPadding.x + gridDimenX * (size + margin.x) + size / 2}px`,
        }}
      >
        {[...new Array(gridDimenY)].map((_, index) => (
          <div
            className='absolute flex group'
            key={index}
            style={{
              height: `${size}px`,
              width: '100%',
              top: `${circuitContainerPadding.y + containerPadding.y + index * size + size / 2 + index * margin.y}px`,
              paddingLeft: `${circuitLineMarginL}px`,
            }}
          >
            <div className='absolute top-0 -translate-y-1/2 left-2 font-mono'>
              Q<sub>{index}</sub>
            </div>
            <div
              className='h-[1px] bg-gray-400 grow'
              data-line={index}
              data-val={index + 1}
              key={`line-${index}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
