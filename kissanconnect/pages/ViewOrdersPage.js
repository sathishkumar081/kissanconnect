import { getCurrentUser } from 'auth';

export const render = async () => {
    const user = getCurrentUser();
    
    // Mock orders data - in a real app this would come from a database
    const orders = [
        {
            id: 'ORD001',
            customerName: 'Priya Sharma',
            product: 'Organic Tomatoes',
            quantity: '10 kg',
            price: '₹300',
            orderDate: '2024-01-15',
            status: 'Pending',
            paymentStatus: 'Paid'
        },
        {
            id: 'ORD002',
            customerName: 'Rahul Kumar',
            product: 'Fresh Spinach',
            quantity: '5 bunches',
            price: '₹125',
            orderDate: '2024-01-14',
            status: 'Shipped',
            paymentStatus: 'Paid'
        },
        {
            id: 'ORD003',
            customerName: 'Kavita Verma',
            product: 'Wheat',
            quantity: '50 kg',
            price: '₹1,750',
            orderDate: '2024-01-12',
            status: 'Delivered',
            paymentStatus: 'Paid'
        }
    ];

    const orderCards = orders.map(order => `
        <div class="order-card" style="background: rgba(255,255,255,0.95); border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: between; align-items: start; gap: 1rem;">
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                        <h3 style="color: #2a9d8f; margin: 0;">Order #${order.id}</h3>
                        <span class="status-badge ${order.status.toLowerCase()}" style="padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold; 
                            ${order.status === 'Pending' ? 'background: #ffeaa7; color: #d63031;' : 
                              order.status === 'Shipped' ? 'background: #74b9ff; color: white;' : 
                              'background: #00b894; color: white;'}">${order.status}</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div>
                            <p style="margin: 0.5rem 0; color: #666;"><strong>Customer:</strong> ${order.customerName}</p>
                            <p style="margin: 0.5rem 0; color: #666;"><strong>Product:</strong> ${order.product}</p>
                        </div>
                        <div>
                            <p style="margin: 0.5rem 0; color: #666;"><strong>Quantity:</strong> ${order.quantity}</p>
                            <p style="margin: 0.5rem 0; color: #666;"><strong>Total Price:</strong> ${order.price}</p>
                        </div>
                        <div>
                            <p style="margin: 0.5rem 0; color: #666;"><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                            <p style="margin: 0.5rem 0; color: #666;"><strong>Payment:</strong> 
                                <span style="color: ${order.paymentStatus === 'Paid' ? '#00b894' : '#d63031'};">${order.paymentStatus}</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${order.status === 'Pending' ? `
                        <button class="btn btn-primary update-status-btn" data-order-id="${order.id}" data-new-status="Shipped">
                            <i class="fas fa-truck"></i> Mark Shipped
                        </button>
                    ` : ''}
                    ${order.status === 'Shipped' ? `
                        <button class="btn btn-success update-status-btn" data-order-id="${order.id}" data-new-status="Delivered">
                            <i class="fas fa-check"></i> Mark Delivered
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary view-details-btn" data-order-id="${order.id}">
                        <i class="fas fa-eye"></i> Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <main>
            <div class="page-header">
                <h1 style="color: white;"><i class="fas fa-shopping-cart"></i> View Orders</h1>
                <div style="display: flex; gap: 1rem;">
                    <select id="order-filter" style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ddd;">
                        <option value="">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>
            
            <div class="orders-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h3 style="color: #e17055; margin: 0 0 0.5rem 0;">Pending Orders</h3>
                    <p style="font-size: 2rem; font-weight: bold; color: #e17055; margin: 0;">1</p>
                </div>
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h3 style="color: #74b9ff; margin: 0 0 0.5rem 0;">Shipped Orders</h3>
                    <p style="font-size: 2rem; font-weight: bold; color: #74b9ff; margin: 0;">1</p>
                </div>
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h3 style="color: #00b894; margin: 0 0 0.5rem 0;">Delivered Orders</h3>
                    <p style="font-size: 2rem; font-weight: bold; color: #00b894; margin: 0;">1</p>
                </div>
            </div>
            
            <div id="orders-container">
                ${orders.length > 0 ? orderCards : `
                    <div style="text-align: center; padding: 3rem; background: rgba(255,255,255,0.95); border-radius: 8px;">
                        <i class="fas fa-clipboard-list" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                        <h3 style="color: #666;">No orders yet</h3>
                        <p style="color: #888;">Orders from customers will appear here once they start purchasing your products.</p>
                    </div>
                `}
            </div>
        </main>
    `;
};

export const addEventListeners = () => {
    // Order filtering
    const orderFilter = document.getElementById('order-filter');
    orderFilter?.addEventListener('change', (e) => {
        const filterValue = e.target.value.toLowerCase();
        document.querySelectorAll('.order-card').forEach(card => {
            const status = card.querySelector('.status-badge').textContent.toLowerCase();
            card.style.display = !filterValue || status === filterValue ? 'block' : 'none';
        });
    });

    // Update order status
    document.querySelectorAll('.update-status-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.orderId;
            const newStatus = e.target.closest('button').dataset.newStatus;
            
            // Update the status badge and button
            const orderCard = e.target.closest('.order-card');
            const statusBadge = orderCard.querySelector('.status-badge');
            statusBadge.textContent = newStatus;
            statusBadge.className = `status-badge ${newStatus.toLowerCase()}`;
            
            // Update button styling based on new status
            if (newStatus === 'Shipped') {
                statusBadge.style.background = '#74b9ff';
                statusBadge.style.color = 'white';
                e.target.textContent = '✓ Mark Delivered';
                e.target.dataset.newStatus = 'Delivered';
            } else if (newStatus === 'Delivered') {
                statusBadge.style.background = '#00b894';
                statusBadge.style.color = 'white';
                e.target.remove(); // Remove the button as order is complete
            }
            
            alert(`Order #${orderId} has been marked as ${newStatus}`);
        });
    });

    // View order details
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.orderId;
            alert(`Viewing details for Order #${orderId}`);
        });
    });
};