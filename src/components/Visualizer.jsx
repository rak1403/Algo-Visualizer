
import React from 'react';
import {
  parseBinarySearchInput,
  parseGraphInput
} from '../utils/parser';

import BinarySearchVisualizer from './visualizers/BinarySearchVisualizer';
import DFSRecursionVisualizer from './visualizers/DFSRecursionVisualizer';
import BFSRecursionVisualizer from './visualizers/BFSRecursionVisualizer';
import CodeDisplay from './CodeDisplay';
import './Visualizer.css';

export default function Visualizer({ algorithm, rawInput }) {
  let TreeComponent = null;
  let StackComponent = null;
  let showCode = true;

  if (algorithm === 'binary-search') {
    const array = parseBinarySearchInput(rawInput.array);
    const target = Number(rawInput.target);
    TreeComponent = () => <BinarySearchVisualizer array={array} target={target} />;
    StackComponent = null;
  } else if (algorithm === 'bfs') {
    const adjList = parseGraphInput(rawInput);
    TreeComponent = () => <BFSRecursionVisualizer adjList={adjList} part="tree" />;
    StackComponent = () => <BFSRecursionVisualizer adjList={adjList} part="stack" />;
  } else if (algorithm === 'dfs') {
    const adjList = parseGraphInput(rawInput);
    TreeComponent = () => <DFSRecursionVisualizer adjList={adjList} part="tree" />;
    StackComponent = () => <DFSRecursionVisualizer adjList={adjList} part="stack" />;
  } else {
    TreeComponent = () => <div>Unsupported algorithm</div>;
    StackComponent = null;
    showCode = false;
  }

  return (
    <div className="visualizer-page">
      {/* <h1 className="main-title">Algorithm Animation Visualizer</h1> */}

      <div className="overview-pane">
        <p>This solution contains:</p>
        <ul>
          <li>Recursion Tree</li>
          <li>Recursion Stack</li>
          <li>Source Code</li>
        </ul>
      </div>

      <div className="section">
        <h2>Recursion Tree</h2>
        <TreeComponent />
      </div>

      {StackComponent && (
        <div className="section">
          <h2>Recursion Stack</h2>
          <StackComponent />
        </div>
      )}

      {showCode && (
        <div className="section code-section">
          <h2>Source Code</h2>
          <CodeDisplay algorithm={algorithm} />
        </div>
      )}
    </div>
  );
}
