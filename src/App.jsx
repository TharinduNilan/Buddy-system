import React, { useState, useEffect } from "react";
import "./App.css";

const nearestPowerOfTwo = (size) => {
  let power = 1;
  while (power < size) {
    power *= 2;
  }
  return power;
};

const mergeBlocks = (memory) => {
  let merged = [...memory];
  let i = 0;

  while (i < merged.length - 1) {
    const current = merged[i];
    const next = merged[i + 1];

    if (
      !current.allocated &&
      !next.allocated &&
      current.size === next.size &&
      current.start + current.size === next.start
    ) {
      // Merge the blocks
      current.size *= 2;
      merged.splice(i + 1, 1); // Remove the next block
    } else {
      i++;
    }
  }
  return merged;
};

const App = () => {
  const [memory, setMemory] = useState([
    { size: 1024, start: 0, allocated: false, timestamp: null },
  ]);
  const [gettingValue, setGettingValue] = useState("");

  const allocate = () => {
    const requestSize = parseInt(gettingValue, 10);

    if (requestSize > 1024 || requestSize <= 0) {
      alert("Enter a value between 1 and 1024.");
      return;
    }

    const requiredSize = nearestPowerOfTwo(requestSize); // Calculate nearest power of 2
    const updatedMemory = [...memory];

    for (let i = 0; i < updatedMemory.length; i++) {
      const block = updatedMemory[i];

      // Find a free block large enough for the request
      if (!block.allocated && block.size >= requiredSize) {
        // Split the block until it matches the required size
        while (block.size > requiredSize) {
          const halfSize = block.size / 2;
          block.size = halfSize;

          // Create a buddy block and insert it into the memory
          const buddyBlock = {
            size: halfSize,
            start: block.start + halfSize,
            allocated: false,
            timestamp: null,
          };
          updatedMemory.splice(i + 1, 0, buddyBlock);
        }

        // Allocate the block once it matches the required size
        block.allocated = true;
        block.timestamp = Date.now();
        setMemory(updatedMemory);
        return;
      }
    }

    alert("Allocation failed: Not enough memory available.");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedMemory = memory.map((block) => {
        if (block.allocated && now - block.timestamp >= 5000) {
          return { ...block, allocated: false, timestamp: null };
        }
        return block;
      });

      const mergedMemory = mergeBlocks(updatedMemory);
      setMemory(mergedMemory);
    }, 1000);

    return () => clearInterval(interval);
  }, [memory]);

  return (
    <div className="App">

      <input
        type="text"
        placeholder="Enter memory size"
        value={gettingValue}
        onChange={(e) => setGettingValue(e.target.value)}
      />

      <button onClick={allocate} style={{marginTop:'10px'}}>Allocate</button>

      <div className="MemoryPool" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h2>Memory Pool</h2>
        <div className="Blocks" style={{ display: "flex" }}>
          {memory.map((block, index) => (
            <div
              key={index}
              style={{
                display:'flex',
                color:'black',
                height:'60px',
                width: `100px`,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: block.allocated ? "#ff6666" : "#66ff66",
              }}
            >
              {block.size} KB {block.allocated ? "(Allocated)" : "(Free)"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;