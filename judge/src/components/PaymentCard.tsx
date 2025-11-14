import { CreditCard, Calendar, Lock, ArrowRight } from 'lucide-react';
import { autumnTheme } from '../theme';

export default function PaymentCard({ 
  cardNumber = '**** **** **** 4242',
  cardHolder = 'JOHN DOE',
  expiryDate = '12/25',
  cvv = '***',
  type = 'VISA'
}) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${autumnTheme.cardBg} 0%, #1f1f1f 100%)`,
      border: `1px solid ${autumnTheme.border}`,
      borderRadius: '16px',
      padding: '24px',
      width: '380px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = autumnTheme.primary;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = autumnTheme.border;
    }}>
      
      {/* Card Type Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: autumnTheme.primary,
        color: autumnTheme.background,
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '0.5px'
      }}>
        {type}
      </div>

      {/* Card Icon */}
      <CreditCard size={40} color={autumnTheme.primary} strokeWidth={1.5} />

      {/* Card Number */}
      <div style={{
        marginTop: '32px',
        fontSize: '22px',
        fontFamily: 'monospace',
        color: autumnTheme.text,
        letterSpacing: '2px',
        fontWeight: '500'
      }}>
        {cardNumber}
      </div>

      {/* Card Details Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '32px',
        alignItems: 'flex-end'
      }}>
        {/* Cardholder Name */}
        <div>
          <div style={{
            fontSize: '10px',
            color: autumnTheme.textTertiary,
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Cardholder
          </div>
          <div style={{
            fontSize: '14px',
            color: autumnTheme.text,
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {cardHolder}
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <div style={{
            fontSize: '10px',
            color: autumnTheme.textTertiary,
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'right'
          }}>
            Expires
          </div>
          <div style={{
            fontSize: '14px',
            color: autumnTheme.text,
            fontWeight: '600',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Calendar size={14} color={autumnTheme.primary} />
            {expiryDate}
          </div>
        </div>

        {/* CVV */}
        <div>
          <div style={{
            fontSize: '10px',
            color: autumnTheme.textTertiary,
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'right'
          }}>
            CVV
          </div>
          <div style={{
            fontSize: '14px',
            color: autumnTheme.text,
            fontWeight: '600',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Lock size={14} color={autumnTheme.primary} />
            {cvv}
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        background: `radial-gradient(circle, ${autumnTheme.primary}15 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />
    </div>
  );
}