import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/buy')({
  component: AutumnPaymentsFlow,
})
import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, User, Check, ArrowRight, X, AlertCircle } from 'lucide-react';

// Autumn-inspired Card Component
const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-zinc-900 border border-zinc-800 rounded-lg ${hover ? 'hover:border-emerald-500 transition-all duration-300' : ''} ${className}`}>
    {children}
  </div>
);

// Autumn-inspired Button Component
const Button = ({ children, variant = 'primary', className = '', onClick, disabled }) => {
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-black',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700',
    ghost: 'bg-transparent hover:bg-zinc-800 text-white'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Autumn-inspired Input Component
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
        <Icon size={18} />
      </div>
    )}
    <input
      {...props}
      className={`w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors ${Icon ? 'pl-10' : ''}`}
    />
  </div>
);

// Autumn-inspired Dialog Component
const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

// Main Autumn Payments Component
 function AutumnPaymentsFlow() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: '$0',
      period: 'forever',
      features: ['100 messages/month', 'Basic support', 'Community access']
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'Most Popular',
      description: 'For professional developers',
      price: '$29',
      period: 'per month',
      features: ['Unlimited messages', 'Priority support', 'Advanced features', 'API access']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large teams',
      price: 'Custom',
      period: 'contact sales',
      features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'SLA guarantee']
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    if (plan.id !== 'free') {
      setShowCheckout(true);
    }
  };

  const handleProceedToPayment = () => {
    setShowCheckout(false);
    setShowCard(true);
  };

  const handlePayment = () => {
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all fields');
      return;
    }
    alert('Payment processed successfully! 🎉');
    setShowCard(false);
    setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-white font-bold text-xl tracking-tight">CODEJUDGE</span>
          </div>
          <Button variant="primary" className="flex items-center gap-2">
            ENTER <ArrowRight size={16} />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 text-xs font-semibold uppercase tracking-wider">
              50K+ DEVELOPERS • 2M+ SOLUTIONS
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-white">Code.</span>
            <br />
            <span className="text-emerald-500">Practice.</span>
            <br />
            <span className="text-white">Master.</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Transform from learner to builder with real challenges, instant feedback, 
            and a community of growth-minded developers.
          </p>
        </div>

        {/* Pricing Cards - Autumn Style */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <Card key={plan.id} hover className="relative p-8">
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.id === 'pro' ? 'primary' : 'secondary'}
                className="w-full"
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.id === 'free' ? 'Get Started' : plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade Now'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Payment Card Preview */}
        <div className="max-w-md mx-auto">
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <CreditCard size={40} className="text-emerald-500" />
                <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded">VISA</span>
              </div>

              <div className="mb-8">
                <div className="text-2xl font-mono tracking-wider text-white">
                  •••• •••• •••• 4242
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Cardholder</div>
                  <div className="text-sm font-semibold text-white">JOHN DOE</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Expires</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <Calendar size={14} className="text-emerald-500" />
                    12/25
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">CVV</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <Lock size={14} className="text-emerald-500" />
                    •••
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onClose={() => setShowCheckout(false)}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Plan</h2>
          <p className="text-gray-400 mb-6">You've selected the {selectedPlan?.name} plan</p>

          {selectedPlan && (
            <Card className="p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedPlan.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedPlan.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-500">{selectedPlan.price}</div>
                  <div className="text-xs text-gray-400">{selectedPlan.period}</div>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="space-y-2">
                  {selectedPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={16} className="text-emerald-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowCheckout(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleProceedToPayment}>
              Continue to Payment
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Payment Card Dialog */}
      <Dialog open={showCard} onClose={() => setShowCard(false)}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
          <p className="text-gray-400 mb-6">Enter your card information securely</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Cardholder Name
              </label>
              <Input
                icon={User}
                type="text"
                placeholder="John Doe"
                value={formData.cardHolder}
                onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Card Number
              </label>
              <Input
                icon={CreditCard}
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Expiry Date
                </label>
                <Input
                  icon={Calendar}
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiry(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  CVV
                </label>
                <Input
                  icon={Lock}
                  type="password"
                  placeholder="123"
                  maxLength="3"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-400">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowCard(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={handlePayment}>
              Process Payment
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}