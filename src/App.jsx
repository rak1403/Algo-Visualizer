
import React, { useState } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector';
import InputForm from './components/InputForm';
import Visualizer from './components/Visualizer';
import './index.css';

function App() {
  const [selectedAlgo, setSelected] = useState('');
  const [rawInput, setRawInput] = useState(null);

  return (
    <div className="App">
      <h1>Algorithm Animation Visualizer</h1>

      {/* Step 1: Pick an algorithm */}
      {!selectedAlgo && (
        <AlgorithmSelector onSelect={setSelected} />
      )}

      {/* Step 2: Input data for that algorithm */}
      {selectedAlgo && !rawInput && (
        <InputForm
          algorithm={selectedAlgo}
          onSubmit={inputData => setRawInput(inputData)}
        />
      )}

      {/* Step 3: Run the visualizer */}
      {rawInput && (
        <Visualizer
          algorithm={selectedAlgo}
          rawInput={rawInput}
        />
      )}
    </div>
  );
}

export default App;
