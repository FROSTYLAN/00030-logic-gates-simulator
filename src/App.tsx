import { useState } from 'react';
import './index.css';
import CircuitCanvas from './CircuitCanvas';
import type { GateType } from './logic';
import { evaluateGate, GATES, getTruthTable } from './logic';

function App() {
  const [gate, setGate] = useState<GateType>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const output = evaluateGate(gate, inputA, inputB);

  return (
    <div className="app-container">

      <header className="app-header">
        <h1 className="app-title">
          Logic Gates Simulator
        </h1>
        <p className="app-subtitle">Interactive educational tool for digital logic</p>
      </header>

      <main className="app-main">

        {/* Controls */}
        <div className="controls-section">

          <div className="control-group">
            <label>Gate Type</label>
            <select
              value={gate}
              onChange={(e) => setGate(e.target.value as GateType)}
              className="gate-select"
            >
              {GATES.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="divider"></div>

          <div className="inputs-group">
            <div className="input-control">
              <label>Input A</label>
              <button
                onClick={() => setInputA(!inputA)}
                className={`toggle-btn ${inputA ? 'on' : 'off'}`}
              >
                <div className="toggle-thumb">
                  {inputA ? '1' : '0'}
                </div>
              </button>
            </div>

            {gate !== 'NOT' && (
              <div className="input-control">
                <label>Input B</label>
                <button
                  onClick={() => setInputB(!inputB)}
                  className={`toggle-btn ${inputB ? 'on' : 'off'}`}
                >
                  <div className="toggle-thumb">
                    {inputB ? '1' : '0'}
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="canvas-wrapper">
          <CircuitCanvas gate={gate} inputA={inputA} inputB={inputB} output={output} />
        </div>

        {/* Info / Output Display */}
        <div className="output-display">
          <div className="output-badge">
            <span className="label">Output = </span>
            <span className={`value ${output ? 'true' : 'false'}`}>
              {output ? 'TRUE (1)' : 'FALSE (0)'}
            </span>
          </div>
        </div>

        {/* Truth Table */}
        <div className="truth-table-section">
          <h3>Truth Table: {gate}</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>A</th>
                  <th>B</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                {getTruthTable(gate).map((row, idx) => {
                  const isActive = (gate !== 'NOT' && row.a === inputA && row.b === inputB) || (gate === 'NOT' && row.a === inputA);
                  return (
                    <tr key={idx} className={isActive ? 'active-row' : ''}>
                      <td>{row.a ? '1' : '0'}</td>
                      <td>{gate === 'NOT' ? '-' : (row.b ? '1' : '0')}</td>
                      <td className={row.out ? 'val-true' : 'val-false'}>
                        {row.out ? '1' : '0'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <footer className="app-footer">
        Abstract Logic Gates Simulator
      </footer>
    </div>
  );
}

export default App;
