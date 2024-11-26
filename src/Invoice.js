// src/Invoice.js
import React from 'react';

const Invoice = ({ formData }) => {
  return (
    <div style={{ width: '100%', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>Vehicle Service Invoice</h1>
        <p style={{ fontSize: '14px', margin: 0 }}>Company Name</p>
        <p style={{ fontSize: '12px', color: 'gray' }}>Address, Contact Info</p>
      </div>

      <div style={{ textAlign: 'right', fontSize: '12px', marginBottom: '20px' }}>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', margin: 0 }}>Service Details</h2>
      </div>

      <div style={{ fontSize: '14px', marginBottom: '20px' }}>
        <p>Oil Check: {formData.oilCheck ? 'Yes' : 'No'}</p>
        <p>Tire Check: {formData.tireCheck ? 'Yes' : 'No'}</p>
        <p>Brakes Check: {formData.brakesCheck ? 'Yes' : 'No'}</p>
      </div>

      <div style={{ borderTop: '1px solid #333', paddingTop: '10px', fontSize: '12px', color: 'gray' }}>
        <p>Remarks: {formData.remarks}</p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '12px', color: 'gray' }}>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default Invoice;
