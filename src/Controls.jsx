import React, { useState } from "react";

const Controls = ({ onAllocate, onDeallocate }) => {
  const [size, setSize] = useState(0);
  const [start, setStart] = useState(0);

  return (
    <div className="Controls">
      <h2>Controls</h2>
      <div>
        <input
          type="number"
          placeholder="Size to allocate"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
        <button onClick={() => onAllocate(size)}>Allocate</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Start address to deallocate"
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
        />
        <button onClick={() => onDeallocate(start)}>Deallocate</button>
      </div>
    </div>
  );
};

export default Controls;