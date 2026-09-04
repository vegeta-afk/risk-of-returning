function RiskResult({ result, onReset }) {
  const isAbusive = result.decision === 'Abusive';

  return (
    <div className="page">
      <h2>Risk Result</h2>

      <div className={`score-circle ${isAbusive ? 'risky' : 'safe'}`}>
        {result.risk_score}%
      </div>

      <p className="decision-line">
        Decision: <strong className={isAbusive ? 'text-risky' : 'text-safe'}>
          {result.decision}
        </strong>
      </p>

      {result.abuse_type && (
        <p className="type-line">
          Likely type: <strong>{result.abuse_type}</strong>
        </p>
      )}

      <button onClick={onReset}>Check Another Return</button>
    </div>
  );
}

export default RiskResult;