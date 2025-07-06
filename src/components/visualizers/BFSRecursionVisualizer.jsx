import React, { useEffect, useState } from 'react';
import { hierarchy, tree as d3Tree } from 'd3-hierarchy';
import { getBFSTreeSteps, buildBFSTree } from '../../utils/algorithms';

export default function BFSRecursionVisualizer({ adjList, part }) {
  const steps = getBFSTreeSteps(adjList);
  const step = steps[0];

  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (stepIndex < steps.length - 1) {
      const timer = setTimeout(() => setStepIndex(i => i + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [playing, stepIndex, steps.length]);

  const currentStep = steps[stepIndex];

  // ─────────────── BFS TREE ────────────────
  if (part === 'tree') {
    const forest = buildBFSTree(adjList);
    const layout = d3Tree().nodeSize([80, 100]);
    const allNodes = [];
    const allLinks = [];

    let offsetX = 0;
    forest.forEach(tree => {
      const root = hierarchy(tree);
      layout(root);

      const nodes = root.descendants();
      const links = root.links();

      const minX = Math.min(...nodes.map(n => n.x));
      const maxX = Math.max(...nodes.map(n => n.x));
      const shiftX = offsetX - minX;

      nodes.forEach(n => n.x += shiftX);
      offsetX += maxX - minX + 100;

      allNodes.push(...nodes);
      allLinks.push(...links);
    });

    const nodeRadius = 15;
    const margin = { top: 20, left: 20 };
    const svgWidth = Math.max(...allNodes.map(n => n.x)) + margin.left * 2 + nodeRadius;
    const svgHeight = Math.max(...allNodes.map(n => n.y)) + margin.top * 2 + nodeRadius;

    return (
      <div className="tree-view">
        {/* Controls */}
        <div className="controls">
          <button onClick={() => setPlaying(p => !p)}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => { setStepIndex(0); setPlaying(true); }}>
            Reset
          </button>
        </div>

        <svg width={svgWidth} height={svgHeight} style={{ overflow: 'visible' }}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Tree Links */}
            {allLinks.map((link, i) => {
              const isActive = link.target.data.value === currentStep.currentNode;
              return (
                <path
                  key={i}
                  d={`M${link.source.x},${link.source.y}
                      V${link.target.y - 20}
                      H${link.target.x}
                      V${link.target.y}`}
                  className={`tree-link${isActive ? ' active' : ''}`}
                />
              );
            })}

            {/* Tree Nodes */}
            {allNodes.map((node, i) => {
              const val = node.data.value;
              const isCurrent = val === currentStep.currentNode;
              const isVisited = currentStep.visited.includes(val);
              return (
                <g key={i} transform={`translate(${node.x},${node.y})`}>
                  <circle
                    r={nodeRadius}
                    className={`tree-node-circle${isCurrent ? ' current' : isVisited ? ' visited' : ''}`}
                  />
                  <text
                    dy={5}
                    textAnchor="middle"
                    style={{ fontSize: '0.8rem', fill: 'var(--text-color)' }}
                  >
                    {val}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    );
  }

  // ─────────────── BFS QUEUE VIEW ────────────────
  if (part === 'stack') {
    return (
      <div className="stack-view">
        <div className="controls">
          <button onClick={() => setPlaying(p => !p)}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => { setStepIndex(0); setPlaying(true); }}>
            Reset
          </button>
        </div>

        <div className="call-stack-container">
          <strong>Queue:</strong>
          {currentStep.queue.map((node, i) => (
            <div key={i} className="stack-node-container">
              <div className="node-box visited stack-node">{node}</div>
              {i < currentStep.queue.length - 1 && <div className="stack-connector" />}
            </div>
          ))}
        </div>

        <p>
          Current Node:{' '}
          <span className="current-node">{currentStep.currentNode}</span>
        </p>
        <p>Visited Nodes: {currentStep.visited.join(', ')}</p>
        <p>Step {stepIndex + 1} of {steps.length}</p>
      </div>
    );
  }

  return null;
}
