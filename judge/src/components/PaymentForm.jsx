import { useState } from 'react';
import { CreditCard, Calendar, Lock, User } from 'lucide-react';
import { autumnTheme } from '../theme';

export default function PaymentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const inputStyle = {
    width: '100%',
    background: autumnTheme.cardBg,
    border: `1px solid ${autumnTheme.border}`,
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: autumnTheme.text,
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    color: autumnTheme.textSecondary,
    marginBottom: '8px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  return (
    <div style={{
      background: autumnTheme.cardBg,
      border: `1px solid ${autumnTheme.border}`,
      borderRadius: '16px',
      padding: '32px',
      width: '400px'
    }}>
      <h2 style={{
        color: autumnTheme.text,
        fontSize: '24px',
        marginBottom: '24px',
        fontWeight: '600'
      }}>
        Payment Details
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>
          <User size={12} style={{ display: 'inline', marginRight: '6px' }} />
          Cardholder Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          style={inputStyle}
          value={formData.cardHolder}
          onChange={(e) => setFormData({...formData, cardHolder: e.target.value})}
          onFocus={(e) => e.target.style.borderColor = autumnTheme.primary}
          onBlur={(e) => e.target.style.borderColor = autumnTheme.border}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>
          <CreditCard size={12} style={{ display: 'inline', marginRight: '6px' }} />
          Card Number
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          style={{...inputStyle, fontFamily: 'monospace'}}
          value={formData.cardNumber}
          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
          onFocus={(e) => e.target.style.borderColor = autumnTheme.primary}
          onBlur={(e) => e.target.style.borderColor = autumnTheme.border}
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>
            <Calendar size={12} style={{ display: 'inline', marginRight: '6px' }} />
            Expiry Date
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            maxLength="5"
            style={inputStyle}
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            onFocus={(e) => e.target.style.borderColor = autumnTheme.primary}
            onBlur={(e) => e.target.style.borderColor = autumnTheme.border}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>
            <Lock size={12} style={{ display: 'inline', marginRight: '6px' }} />
            CVV
          </label>
          <input
            type="password"
            placeholder="123"
            maxLength="3"
            style={inputStyle}
            value={formData.cvv}
            onChange={(e) => setFormData({...formData, cvv: e.target.value})}
            onFocus={(e) => e.target.style.borderColor = autumnTheme.primary}
            onBlur={(e) => e.target.style.borderColor = autumnTheme.border}
          />
        </div>
      </div>

      <button
        style={{
          width: '100%',
          background: autumnTheme.primary,
          color: autumnTheme.background,
          border: 'none',
          borderRadius: '8px',
          padding: '14px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = autumnTheme.primaryDark;
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = autumnTheme.primary;
          e.target.style.transform = 'translateY(0)';
        }}
        onClick={() => onSubmit(formData)}
      >
        Process Payment
      </button>
    </div>
  );
}