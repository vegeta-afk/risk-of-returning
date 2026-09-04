const dummyReturns = [
  { id: 'RET-8841', customer: 'Priya Sharma', item: 'Cotton Kurta Set', location: 'Jaipur, IN', status: 'Reviewed', risk: 'Low' },
  { id: 'RET-8839', customer: 'Rohan Mehta', item: 'Wireless Earbuds', location: 'Pune, IN', status: 'Flagged', risk: 'High' },
  { id: 'RET-8836', customer: 'Ananya Iyer', item: 'Running Shoes', location: 'Chennai, IN', status: 'Reviewed', risk: 'Medium' },
  { id: 'RET-8830', customer: 'Karan Verma', item: 'Leather Wallet', location: 'Delhi, IN', status: 'Pending', risk: 'Low' },
  { id: 'RET-8825', customer: 'Sneha Reddy', item: 'Silk Saree', location: 'Hyderabad, IN', status: 'Flagged', risk: 'High' },
];

function Dashboard() {
  return (
    <div className="page-wrap">
      <p className="breadcrumb">Home / Seller Portal</p>

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

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Order Summary</h3>

          <div className="progress-block">
            <div className="progress-label">
              <span>Pending Review</span>
              <span className="progress-count">62/1,842 Orders</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill fill-warning" style={{ width: '34%' }} />
            </div>
            <span className="progress-pct">34%</span>
          </div>

          <div className="progress-block">
            <div className="progress-label">
              <span>Auto-Approved</span>
              <span className="progress-count">1,780/1,842 Orders</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill fill-success" style={{ width: '97%' }} />
            </div>
            <span className="progress-pct">97%</span>
          </div>
        </div>

        <div className="summary-card">
          <h3>Risk Breakdown</h3>
          <div className="risk-breakdown">
            <div className="risk-row"><span className="dot dot-low"></span> Low Risk <strong>1,689</strong></div>
            <div className="risk-row"><span className="dot dot-medium"></span> Medium Risk <strong>116</strong></div>
            <div className="risk-row"><span className="dot dot-high"></span> High Risk <strong>37</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;