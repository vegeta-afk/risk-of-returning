import { useState } from 'react';
import axios from 'axios';

function SubmitReturn({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    age: '', account_age_days: '', avg_order_value_usd: '',
    refund_amount_requested_usd: '', is_high_value_item: 0,
    discount_used: 0, days_to_return: '', total_orders_lifetime: '',
    item_returned_opened: 0, return_packaging_intact: 1,
    photo_evidence_provided: 0, tracking_number_valid: 1,
    address_change_before_delivery: 0, refund_to_different_account: 0,
    customer_support_contacts: '', previous_dispute_count: '',
    review_left_after_return: 0, product_category: 'Clothing',
    return_reason: 'Changed Mind', customer_segment: 'Silver',
    country: 'US', platform: 'Web Browser', device_type: 'iPhone',
    payment_method: 'PayPal'
  });

 const handleChange = (e) => {
  const { name, value, type } = e.target;
  const parsedValue = type === 'number' ? Number(value) : value;

  setFormData(prev => ({
    ...prev,
    [name]: parsedValue,
    // Auto-fill refund amount to match order value, only if user hasn't touched refund field yet
    ...(name === 'avg_order_value_usd' && !prev._refundManuallySet
      ? { refund_amount_requested_usd: parsedValue }
      : {})
  }));
};

const handleRefundChange = (e) => {
  setFormData(prev => ({
    ...prev,
    refund_amount_requested_usd: Number(e.target.value),
    _refundManuallySet: true
  }));
};

  const handleCheckbox = (name) => (e) => {
    setFormData(prev => ({ ...prev, [name]: e.target.checked ? 1 : 0 }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  const payload = {
    ...formData,
    avg_order_value_usd: Number(formData.avg_order_value_usd) / 94,
    refund_amount_requested_usd: Number(formData.refund_amount_requested_usd) / 94,
  };

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, payload);
    onResult(res.data);
  } catch (err) {
    console.error(err);
    setError('Prediction failed — the backend may be waking up (free tier), try again in a few seconds.');
  }
  setLoading(false);
};

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1>Submit a Return</h1>
        <p className="subtitle">Enter the return details below to check its risk score.</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="form-card">

        <div className="form-section">
          <h3 className="section-title">Customer History</h3>
          <p className="section-note">In production, this would auto-populate from the merchant's customer database — shown here as manual input for demo purposes.</p>
          <div className="form-grid">
            <div className="form-group">
              <label>Age</label>
              <input name="age" type="number" min="0" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Account Age (days)</label>
              <input name="account_age_days" type="number" min="0" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Total Lifetime Orders</label>
              <input name="total_orders_lifetime" type="number" min="0" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Times Contacted Support</label>
              <input name="customer_support_contacts" type="number" min="0" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Previous Disputes</label>
              <input name="previous_dispute_count" type="number" min="0" onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">This Return</h3>
          <div className="form-grid">
            <div className="form-group">
  <label> Order Value (₹)</label>
  <input name="avg_order_value_usd" type="number" min="0" step="0.01" onChange={handleChange} required />
  <span className="field-hint">Typical range: ₹1,410 – ₹28,200</span>
</div>
<div className="form-group">
  <label>Refund Amount (₹)</label>
  <input name="refund_amount_requested_usd" type="number" min="0" step="0.01" value={formData.refund_amount_requested_usd} onChange={handleRefundChange} required />
  <span className="field-hint">Auto-fills to match order value — edit for partial refunds</span>
</div>
            <div className="form-group">
              <label>Days to Return from Order Date</label>
              <input name="days_to_return" type="number" min="0" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Product Category</label>
              <select name="product_category" onChange={handleChange}>
                <option>Clothing</option><option>Shoes</option><option>Beauty</option>
                <option>Electronics</option><option>Toys</option><option>Books</option>
                <option>Sports</option><option>Jewelry</option><option>Home & Kitchen</option>
              </select>
            </div>
            <div className="form-group">
              <label>Return Reason</label>
              <select name="return_reason" onChange={handleChange}>
                <option>Changed Mind</option><option>Defective/Broken</option>
                <option>Item Not Received</option><option>Wrong Item Sent</option>
                <option>Not As Described</option><option>Too Large</option>
                <option>Too Small</option><option>Quality Issue</option>
                <option>Arrived Late</option><option>Found Better Price</option>
                <option>Accidental Order</option><option>Gift Duplicate</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Flags</h3>
          <div className="toggle-row">
            <label className="toggle-pill">
              <input type="checkbox" defaultChecked onChange={handleCheckbox('tracking_number_valid')} />
              <span>Tracking Number Valid</span>
            </label>
            <label className="toggle-pill">
              <input type="checkbox" onChange={handleCheckbox('discount_used')} />
              <span>Discount Used</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Analyzing…' : 'Check Risk'}
        </button>
      </form>
    </div>
  );
}

export default SubmitReturn;