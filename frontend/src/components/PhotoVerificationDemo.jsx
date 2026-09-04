const demoResults = [
  { before: '/demo/item1_before.jpg', after: '/demo/item1_after.jpg', similarity: 0.750, flagged: true },
  { before: '/demo/item2_before.jpg', after: '/demo/item2_after.jpg', similarity: 0.760, flagged: true },
  { before: '/demo/item3_before.jpg', after: '/demo/item3_after.jpg', similarity: 0.768, flagged: true },
  { before: '/demo/item4_before.jpg', after: '/demo/item4_after.jpg', similarity: 0.784, flagged: true },
];

function PhotoVerificationDemo() {
  return (
    <div className="page-wrap">
      <p className="breadcrumb">Roadmap Preview — Photo Verification (CNN)</p>
      <div className="table-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Seller vs Buyer Photo Comparison</h3>
        {demoResults.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <img src={r.before} alt="before" style={{ width: 140, borderRadius: 10 }} />
            <img src={r.after} alt="after" style={{ width: 140, borderRadius: 10 }} />
            <div>
              <div>Similarity: <strong>{r.similarity}</strong></div>
              <span className={`risk-pill risk-${r.flagged ? 'high' : 'low'}`}>
                {r.flagged ? 'Flagged' : 'Passed'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoVerificationDemo;