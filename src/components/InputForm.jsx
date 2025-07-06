import React, { useState } from 'react';

export default function InputForm({ algorithm, onSubmit }) {
    // We’ll store whatever the user types here:
    const [textInput, setTextInput] = useState('');
    const [target, setTarget] = useState('');


    // When the form is submitted, pass the raw input back to the parent:
    // src/components/InputForm.jsx
    const handleSubmit = e => {
        e.preventDefault();

        if (algorithm === 'binary-search') {
            onSubmit({
                array: textInput.trim(),
                target: target.trim()
            });
        } else {
            onSubmit(textInput.trim());  // <-- a plain string for BFS/DFS
        }
    };


    return (
        <form className="input-form" onSubmit={handleSubmit}>
            {algorithm === 'binary-search' && (
                <>
                    <label htmlFor="array-input">
                        Enter a sorted array (comma-separated):
                    </label>
                    <input
                        id="array-input"
                        type="text"
                        placeholder="e.g. 1,3,5,7,9"
                        value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                        required
                    />
                    <label htmlFor="target-input" style={{ marginTop: '1rem' }}>
                        Target value to search for:
                    </label>
                    <input
                        id="target-input"
                        type="number"
                        placeholder="e.g. 7"
                        value={target}
                        onChange={e => setTarget(e.target.value)}
                        required
                    />
                </>
            )}


            {(algorithm === 'bfs' || algorithm === 'dfs') && (
                <>
                    <label htmlFor="graph-input">
                        Enter edges (one per line as “u v”):
                    </label>
                    <textarea
                        id="graph-input"
                        rows="5"
                        placeholder={`e.g.\n0 1\n0 2\n1 3\n…`}
                        value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                        required
                    />
                </>
            )}

            <button type="submit" style={{ marginTop: '1rem' }}>
                Submit Input
            </button>
        </form>
    );
}
