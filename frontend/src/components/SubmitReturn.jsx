import { useState } from 'react';
import axios from 'axios';

function SubmitReturn({ onResult }) {
  const [loading, setLoading] = useState(false);
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckbox = (name) => (e) => {
    setFormData(prev => ({ ...prev, [name]: e.target.checked ? 1 : 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, formData);
      onResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Prediction failed — check backend is running');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h2>Submit Return</h2>
      <form onSubmit={handleSubmit} className="return-form">

        <div className="form-group">
          <label>Customer Age</label>
          <input name="age" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Account Age (days)</label>
          <input name="account_age_days" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Average Order Value ($)</label>
          <input name="avg_order_value_usd" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Refund Amount Requested ($)</label>
          <input name="refund_amount_requested_usd" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Days to Return</label>
          <input name="days_to_return" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Total Lifetime Orders</label>
          <input name="total_orders_lifetime" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Support Contacts</label>
          <input name="customer_support_contacts" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Previous Disputes</label>
          <input name="previous_dispute_count" type="number" onChange={handleChange} required />
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

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" defaultChecked onChange={handleCheckbox('tracking_number_valid')} />
            Tracking Number Valid
          </label>
          <label>
            <input type="checkbox" onChange={handleCheckbox('discount_used')} />
            Discount Used
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check Risk'}
        </button>
      </form>
    </div>
  );
}

export default SubmitReturn;