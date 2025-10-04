
import React, { useState, useEffect } from 'react';
import { TransactionType } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: { amount: number; type: TransactionType }) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.GAIN);

  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setType(TransactionType.GAIN);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onAddTransaction({ amount: numericAmount, type });
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-brand-surface rounded-2xl shadow-2xl p-8 w-full max-w-md border border-brand-secondary transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-up 0.3s forwards' }}
      >
        <h2 className="text-2xl font-bold text-brand-text-primary mb-6">Adicionar Transação</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-brand-text-secondary mb-2">Quanto dinheiro você ganhou ou perdeu? (R$)</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
              className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
              required
              min="0.01"
              step="0.01"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-brand-text-secondary mb-2">Tipo de transação</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
            >
              <option value={TransactionType.GAIN}>Ganhou</option>
              <option value={TransactionType.LOSS}>Perdeu</option>
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="w-full bg-brand-primary text-white font-semibold py-3 rounded-lg hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary transition-colors duration-300 disabled:opacity-50"
              disabled={!amount}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AddTransactionModal;
