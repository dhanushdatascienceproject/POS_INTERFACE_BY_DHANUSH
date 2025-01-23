// src/components/Orders.js
import React from 'react';

const Orders = ({ orders }) => {
  return (
    <div>
      <h2>Confirmed Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <strong>Order {index + 1}</strong>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
