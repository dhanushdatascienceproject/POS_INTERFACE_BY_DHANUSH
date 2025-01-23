// src/components/CustomerForm.js
import React, { useState } from 'react';

const CustomerForm = ({ setCustomerDetails }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomerDetails({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Customer Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerForm;
