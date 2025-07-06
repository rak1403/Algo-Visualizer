import React from 'react';
import { algorithmOptions } from '../data/algorithms';

export default function AlgorithmSelector({ onSelect }) {
  return (
    <div className="algorithm-selector">
      <label htmlFor="algo-select">Choose an algorithm:</label>
      <select
        id="algo-select"
        onChange={e => onSelect(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          -- Select an algorithm --
        </option>
        {algorithmOptions.map(algo => (
          <option key={algo.id} value={algo.id}>
            {algo.label}
          </option>
        ))}
      </select>
    </div>
  );
}
