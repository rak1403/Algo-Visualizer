
import React, { useState, useEffect } from 'react';
import {
  getPrimsSteps,
  getKruskalsSteps
} from '../../utils/algorithms';
import {
  toWeightedAdjList,
  countNodesFromEdges
} from '../../utils/parser';

export default function MSTVisualizer({ algorithm, edges }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying]     = useState(true);

  const adjWeighted = toWeightedAdjList(edges);
  const nodeCount   = countNodesFromEdges(edges);

  const steps = algorithm === 'prims'
    ? getPrimsSteps(adjWeighted, 0)
    : getKruskalsSteps(edges, nodeCount);

  const edgesSoFar = steps[stepIndex];

  useEffect(() => {
    if (!playing) return;
    if (stepIndex < steps.length - 1) {
      const timer = setTimeout(() => setStepIndex(i => i + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [playing, stepIndex, steps.length]);

  return (
    <div>
      <h2>{algorithm === 'prims' ? "Prim's" : "Kruskal's"} MST Visualization</h2>
      <p>Edges in MST so far:</p>

      {/* Controls */}
      <div className="controls">
        <button onClick={() => setPlaying(p => !p)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => { setStepIndex(0); setPlaying(true); }}>
          Reset
        </button>
      </div>

      {/* Edge List Rendering */}
      <div className="edge-list">
        {edgesSoFar.map((e, i) => (
          <div key={i} className="edge-item">
            {e.u} — {e.v} (w={e.w})
          </div>
        ))}
      </div>

      <p className="step-label">Step {stepIndex + 1} of {steps.length}</p>
    </div>
  );
}
