
import React, { useState, useEffect } from 'react';
import { getBinarySearchSteps } from '../../utils/algorithms';

export default function BinarySearchVisualizer({ array, target }) {
  const steps = getBinarySearchSteps(array, target);

  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying]     = useState(true);

  useEffect(() => {
    if (!playing) return; 
    if (stepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        setStepIndex(i => i + 1);
      }, 800); 
      return () => clearTimeout(timer);
    }
  }, [playing, stepIndex, steps.length]);

  const { low, mid, high, foundIndex } = steps[stepIndex];

  return (
    <div>
      <h2>Binary Search Visualization</h2>
      <p>Searching for <strong>{target}</strong> in the array:</p>

      {/* Play / Pause / Reset Controls */}
      <div className="controls">
        <button onClick={() => setPlaying(p => !p)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => {
            setStepIndex(0);
            setPlaying(true);
          }}
        >
          Reset
        </button>
      </div>

      {/* Array Rendering & Highlighting */}
      <div className="array-container">
        {array.map((num, idx) => {
          const classes =
            'array-box ' +
            (idx >= low && idx <= high ? 'current-window ' : '') +
            (idx === mid               ? 'mid '            : '') +
            (foundIndex === idx        ? 'found'           : '');

          return (
            <div key={idx} className={classes.trim()}>
              {num}
            </div>
          );
        })}
      </div>

      <p>Step {stepIndex + 1} of {steps.length}</p>
    </div>
  );
}
