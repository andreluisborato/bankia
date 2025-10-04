import React, { useState, useMemo } from 'react';
import { User, Transaction, TransactionType } from '../types';
import Header from './Header';
import BalanceCard from './BalanceCard';
import AIAssistant from './AIAssistant';
import TransactionList from './TransactionList';
import AddTransactionModal from './AddTransactionModal';
import FloatingActionButton from './FloatingActionButton';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  onAddTransaction: (transaction: { amount: number; type: TransactionType }) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, onAddTransaction, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const balance = useMemo(() => {
    if (!transactions) return 0;
    return transactions.reduce((acc, t) => {
      return t.type === TransactionType.GAIN ? acc + t.amount : acc - t.amount;
    }, 0);
  }, [transactions]);

  return (
    <div className="relative min-h-screen">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <Header name={user.name} onLogout={onLogout} />
        <BalanceCard balance={balance} />
        <div className="mt-8 grid grid-cols-1 gap-8">
            <AIAssistant />
            <TransactionList transactions={transactions || []} />
        </div>
      </main>
      
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={onAddTransaction}
      />
    </div>
  );
};

export default Dashboard;
