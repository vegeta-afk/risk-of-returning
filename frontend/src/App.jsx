import { useState } from 'react';
import SubmitReturn from './components/SubmitReturn';
import RiskResult from './components/RiskResult';
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark">RR</span>
            <span className="brand-name">Return Risk Scorer</span>
          </div>
          <span className="topbar-tag">AI Risk Manager · Razorpay Buildathon</span>
        </div>
      </header>

      <main className="main">
        {result ? (
          <RiskResult result={result} onReset={() => setResult(null)} />
        ) : (
          <SubmitReturn onResult={setResult} />
        )}
      </main>
    </div>
  );
}

export default App;