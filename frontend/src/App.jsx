import { useState } from 'react';
import Dashboard from './components/Dashboard';
import SubmitReturn from './components/SubmitReturn';
import RiskResult from './components/RiskResult';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'form' | 'result'
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    setView('result');
  };

  const handleReset = () => {
    setResult(null);
    setView('dashboard');
  };

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
        {view === 'dashboard' && <Dashboard onNewRequest={() => setView('form')} />}
        {view === 'form' && (
          <>
            <button className="back-link" onClick={() => setView('dashboard')}>← Back to Dashboard</button>
            <SubmitReturn onResult={handleResult} />
          </>
        )}
        {view === 'result' && <RiskResult result={result} onReset={handleReset} />}
      </main>
    </div>
  );
}

export default App;