import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Returns from './components/Returns';
import SubmitReturn from './components/SubmitReturn';
import RiskResult from './components/RiskResult';
import PhotoVerificationDemo from './components/PhotoVerificationDemo';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    setView('result');
  };

  const handleReset = () => {
    setResult(null);
    setView('returns');
  };

  return (
    <div className="app">
      <Navbar view={view} setView={setView} />

      <main className="main">
        {view === 'dashboard' && <Dashboard />}
        {view === 'orders' && <Orders />}
        {view === 'returns' && <Returns onNewRequest={() => setView('form')} />}
        {view === 'form' && (
          <>
            <button className="back-link" onClick={() => setView('returns')}>← Back to Returns</button>
            <SubmitReturn onResult={handleResult} />
          </>
        )}
        {view === 'result' && <RiskResult result={result} onReset={handleReset} />}
        {view === 'photoverification' && <PhotoVerificationDemo />}
      </main>
    </div>
  );
}

export default App;