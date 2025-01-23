// src/components/Checkout.js
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf'; 
// Import jsPDF for PDF generation

const Checkout = ({ cartItems, customerDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please fill in all card details.');
      return;
    }
    generateInvoice();
    alert('Checkout successful! Invoice has been generated.');
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  // Function to generate and download the invoice
  const generateInvoice = () => {
    const doc = new jsPDF();

    // Add invoice header
    doc.setFontSize(18);
    doc.text('Invoice', 105, 20, { align: 'center' });

    // Add customer details
    if (customerDetails) {
      doc.setFontSize(12);
      doc.text(`Customer Name: ${customerDetails.name}`, 20, 40);
      doc.text(`Email: ${customerDetails.email}`, 20, 50);
      doc.text(`Phone: ${customerDetails.phone}`, 20, 60);
    }

    // Add cart item details
    doc.text('Items:', 20, 80);
    cartItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`, 20, 90 + index * 10);
    });

    // Add total
    doc.text(`Total: $${total.toFixed(2)}`, 20, 100 + cartItems.length * 10);

    // Add footer
    doc.text('Thank you for your purchase!', 105, 130 + cartItems.length * 10, { align: 'center' });

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="checkout">
      <h2 className="checkout-header">Checkout</h2>
      {customerDetails ? (
        <div className="checkout-details">
          <h3>Customer: {customerDetails.name}</h3>
          <p>Email: {customerDetails.email}</p>
          <p>Phone: {customerDetails.phone}</p>
        </div>
      ) : (
        <p>Please enter customer details</p>
      )}

      <div className="checkout-item">
        <span>Total:</span> <span>${total}</span>
      </div>

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <button onClick={() => handlePaymentMethodChange('cash')} className="pay-button">
          Pay with Cash
        </button>
        <button onClick={() => handlePaymentMethodChange('upi')} className="pay-button">
          Pay with UPI/Online
        </button>
        <button onClick={() => handlePaymentMethodChange('card')} className="pay-button">
          Pay with Card
        </button>
      </div>

      {paymentMethod === 'upi' && (
        <div className="upi-payment">
          <h4>Scan to Pay</h4>
          <div className="qr-code-container">
            <QRCode value="upi://pay?pa=someone@upi&pn=Name&mc=0000&tid=000001&url=https://example.com" size={256} />
            <p>Scan this QR code with your UPI app (PhonePe, GPay, Paytm)</p>
          </div>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="card-payment">
          <h4>Enter Card Details</h4>
          <div className="card-inputs">
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={handleCardDetailsChange}
            />
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={handleCardDetailsChange}
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
            />
          </div>
        </div>
      )}

      <button onClick={handleCheckout} className="pay-button">
        Confirm Payment
      </button>
    </div>
  );
};

export default Checkout;
