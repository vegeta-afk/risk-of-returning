import { useState } from 'react';
import SubmitReturn from './components/SubmitReturn';
import RiskResult from './components/RiskResult';
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app">
      {result ? (
        <RiskResult result={result} onReset={() => setResult(null)} />
      ) : (
        <SubmitReturn onResult={setResult} />
      )}
    </div>
  );
}

export default App;