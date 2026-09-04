function RiskResult({ result, onReset }) {
  const isAbusive = result.decision === 'Abusive';
  const score = result.risk_score;

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1>Risk Assessment</h1>
        <p className="subtitle">Automated decision based on return signals.</p>
      </div>

      <div className="result-card">
        <div className="gauge-wrap">
          <div
            className={`gauge ${isAbusive ? 'gauge-risky' : 'gauge-safe'}`}
            style={{ '--pct': score }}
          >
            <div className="gauge-inner">
              <span className="gauge-score">{score}%</span>
              <span className="gauge-label">Risk Score</span>
            </div>
          </div>
        </div>

        <div className="result-details">
          <div className={`decision-badge ${isAbusive ? 'badge-risky' : 'badge-safe'}`}>
            {isAbusive ? '⚠ Flagged as Abusive' : '✓ Legitimate Return'}
          </div>

          {result.abuse_type && (
            <div className="type-row">
              <span className="type-label">Likely Type</span>
              <span className="type-value">{result.abuse_type}</span>
            </div>
          )}

          <p className="result-note">
            {isAbusive
              ? 'This return shares strong statistical similarity with known abuse patterns. Recommend manual review before approving the refund.'
              : 'This return matches typical legitimate return behavior. Safe to auto-approve.'}
          </p>
        </div>
      </div>

      <button className="reset-btn" onClick={onReset}>Check Another Return</button>
    </div>
  );
}

export default RiskResult;