// src/components/Analytics.js
import React from 'react';

const Analytics = ({ salesData }) => {
  return (
    <div className="analytics">
      <h2>Sales Analytics</h2>
      <div className="analytics-data">
        <p>Total Items Sold: {salesData.totalItemsSold}</p>
        <p>Total Services Sold: ${salesData.totalServicesSold.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Analytics;

