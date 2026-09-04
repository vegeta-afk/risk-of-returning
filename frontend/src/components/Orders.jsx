const dummyOrders = [
  { id: 'ORD-5521', customer: 'Meera Nair', item: 'Denim Jacket', amount: '₹3,200', status: 'Delivered' },
  { id: 'ORD-5519', customer: 'Arjun Kapoor', item: 'Bluetooth Speaker', amount: '₹2,450', status: 'In Transit' },
  { id: 'ORD-5516', customer: 'Divya Menon', item: 'Yoga Mat', amount: '₹899', status: 'Delivered' },
  { id: 'ORD-5510', customer: 'Vikram Rao', item: 'Office Chair', amount: '₹6,750', status: 'Processing' },
];

function Orders() {
  return (
    <div className="page-wrap">
      <p className="breadcrumb">Home / Seller Portal / Orders</p>
      <div className="table-card">
        <div className="table-header">
          <h3>All Orders</h3>
        </div>
        <table className="returns-table">
          <thead>
            <tr>
              <th>Order ID</th><th>Customer</th><th>Item</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td><td>{o.customer}</td><td>{o.item}</td><td>{o.amount}</td>
                <td><span className={`status-pill status-${o.status.toLowerCase().replace(' ', '')}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;