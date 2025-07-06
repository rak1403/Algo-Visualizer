import React from 'react';
import { algorithmCode } from '../data/algorithmCode';
import './CodeDisplay.css';

export default function CodeDisplay({ algorithm }) {
  const code = algorithmCode[algorithm] || '// Code not available';
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}
