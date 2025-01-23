// src/components/Invoice.js
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Invoice = ({ customerDetails, cartItems, total }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Invoice', 14, 20);

    // Add customer details
    doc.setFontSize(12);
    doc.text(`Name: ${customerDetails.name}`, 14, 30);
    doc.text(`Email: ${customerDetails.email}`, 14, 40);
    doc.text(`Phone: ${customerDetails.phone}`, 14, 50);

    // Add table of cart items
    const tableColumn = ['Item Name', 'Price'];
    const tableRows = cartItems.map((item) => [item.name, `$${item.price}`]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    // Add total
    doc.text(`Total: $${total}`, 14, doc.previousAutoTable.finalY + 10);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <button onClick={generatePDF} className="generate-invoice-button">
      Generate Invoice
    </button>
  );
};

export default Invoice;
