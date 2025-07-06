
import React, { useState, useEffect } from 'react';
import { getBFSSteps, getDFSSteps } from '../../utils/algorithms';

export default function GraphTraversalVisualizer({ adjList, algorithm }) {
  
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying]     = useState(true);

  const steps = algorithm === 'bfs'
    ? getBFSSteps(adjList)
    : getDFSSteps(adjList);
  const visited = steps[stepIndex];

  useEffect(() => {
    if (!playing) return;
    if (stepIndex < steps.length - 1) {
      const timer = setTimeout(() => setStepIndex(i => i + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [playing, stepIndex, steps.length]);

  const allNodes = Object.keys(adjList)
    .map(n => parseInt(n, 10))
    .sort((a, b) => a - b);

  return (
    <div>
      <h2>{algorithm.toUpperCase()} Traversal Visualization</h2>
      <p>Visited nodes so far:</p>

      {/*  Play / Pause / Reset Controls */}
      <div className="controls">
        <button onClick={() => setPlaying(p => !p)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => { setStepIndex(0); setPlaying(true); }}>
          Reset
        </button>
      </div>

      {/*  Node Rendering & Highlighting */}
      <div className="node-container">
        {allNodes.map(node => (
          <div
            key={node}
            className={`node-box ${visited.includes(node) ? 'visited' : ''}`}
          >
            {node}
          </div>
        ))}
      </div>

      <p>Step {stepIndex + 1} of {steps.length}</p>
    </div>
  );
}
