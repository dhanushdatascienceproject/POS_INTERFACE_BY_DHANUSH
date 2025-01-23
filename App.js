import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Update import to use Routes instead of Switch
import ServicesList from './components/ServicesList';
import Cart from './components/Cart';
import CustomerForm from './components/CustomerForm';
import Checkout from './components/Checkout';
import Analytics from './components/Analytics'; // Import Analytics component
import Orders from './components/Orders';  // New Orders component to display confirmed orders
import './styles/App.css';
import './styles/ServicesList.css';
import './styles/Cart.css';
import './styles/CustomerForm.css';
import './styles/Checkout.css';
import './styles/Taskbar.css'; 
import './styles/Analytics.css'; 

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [salesData, setSalesData] = useState({ totalItemsSold: 0, totalServicesSold: 0 }); // State to track sales data
  const [orders, setOrders] = useState([]); // State to track confirmed orders

  const addToCart = (service) => {
    setCartItems([...cartItems, service]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Function to handle the checkout and update sales data
  const handleCheckout = (cartItems) => {
    const totalItemsSold = cartItems.length;
    const totalServicesSold = cartItems.reduce((acc, item) => acc + item.price, 0);

    // Update sales data
    setSalesData({
      totalItemsSold: salesData.totalItemsSold + totalItemsSold,
      totalServicesSold: salesData.totalServicesSold + totalServicesSold
    });

    // Add the confirmed order to the orders list
    setOrders([...orders, { items: cartItems, date: new Date() }]);

    // Clear the cart after confirming payment
    setCartItems([]);

    alert('Checkout successful!');
  };

  return (
    <Router>
      <div className="app-container">
        <div className="taskbar">
          <h2>POS System</h2>
          <ul>
            <li className="active">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="active 2">
              <Link to="/orders">Orders</Link>
            </li>
            {/* Link to Analytics page */}
            <li className="active 3">
              <Link to="/analytics" className="clickable">
                Analytics
              </Link>
            </li>
            <li>Settings</li>
          </ul>
          <div className="bottom-links">
            <li>Profile</li>
            <li>Logout</li>
          </div>
        </div>

        <div className="main-content">
          <Routes>
            {/* Dashboard Route */}
            <Route path="/" element={
              <>
                <div className="section services-list">
                  <h2>Available Services</h2>
                  <ServicesList addToCart={addToCart} />
                </div>

                <div className="section cart">
                  <h2>Your Cart</h2>
                  <Cart
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                  />
                </div>

                <div className="">
                  <h2></h2>
                  <CustomerForm setCustomerDetails={setCustomerDetails} />
                </div>

                <div className="section checkout">
                  <h2>Checkout</h2>
                  <Checkout
                    cartItems={cartItems}
                    customerDetails={customerDetails}
                    handleCheckout={handleCheckout} // Pass handleCheckout to Checkout component
                  />
                </div>
              </>
            } />

            {/* Orders Route */}
            <Route path="/orders" element={
              <div className="section orders">
                <Orders orders={orders} />
              </div>
            } />

            {/* Analytics Route */}
            <Route path="/analytics" element={
              <div className="section analytics">
                <Analytics salesData={salesData} />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
