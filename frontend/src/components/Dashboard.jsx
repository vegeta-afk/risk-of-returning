const dummyReturns = [
  { id: 'RET-8841', customer: 'Priya Sharma', item: 'Cotton Kurta Set', location: 'Jaipur, IN', status: 'Reviewed', risk: 'Low' },
  { id: 'RET-8839', customer: 'Rohan Mehta', item: 'Wireless Earbuds', location: 'Pune, IN', status: 'Flagged', risk: 'High' },
  { id: 'RET-8836', customer: 'Ananya Iyer', item: 'Running Shoes', location: 'Chennai, IN', status: 'Reviewed', risk: 'Medium' },
  { id: 'RET-8830', customer: 'Karan Verma', item: 'Leather Wallet', location: 'Delhi, IN', status: 'Pending', risk: 'Low' },
  { id: 'RET-8825', customer: 'Sneha Reddy', item: 'Silk Saree', location: 'Hyderabad, IN', status: 'Flagged', risk: 'High' },
];

function Dashboard({ onNewRequest }) {
  return (
    <div className="page-wrap">
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">1,842</span>
          <span className="stat-delta stat-up">↑ 12% vs last month</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Sell</span>
          <span className="stat-value">₹18.6L</span>
          <span className="stat-delta stat-up">↑ 8% vs last month</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Returns Flagged</span>
          <span className="stat-value">37</span>
          <span className="stat-delta stat-down">↓ 4% vs last month</span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Recent Returns</h3>
          <button className="new-request-btn" onClick={onNewRequest}>+ Check New Return</button>
        </div>

        <table className="returns-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Location</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {dummyReturns.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.customer}</td>
                <td>{r.item}</td>
                <td>{r.location}</td>
                <td><span className={`status-pill status-${r.status.toLowerCase()}`}>{r.status}</span></td>
                <td><span className={`risk-pill risk-${r.risk.toLowerCase()}`}>{r.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;