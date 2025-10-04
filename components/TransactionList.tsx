
import React from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-3.707a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3z" clipRule="evenodd" />
    </svg>
);


const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isGain = transaction.type === TransactionType.GAIN;
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(transaction.amount);

    return (
        <li className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${isGain ? 'bg-brand-gain/20 text-brand-gain' : 'bg-brand-loss/20 text-brand-loss'}`}>
                    {isGain ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </div>
                <div>
                    <p className="font-semibold text-brand-text-primary">{isGain ? 'Recebimento' : 'Despesa'}</p>
                    <p className="text-sm text-brand-text-secondary">{new Date(transaction.timestamp).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                </div>
            </div>
            <p className={`font-semibold ${isGain ? 'text-brand-gain' : 'text-brand-loss'}`}>
                {isGain ? `+ ${formattedAmount}` : `- ${formattedAmount}`}
            </p>
        </li>
    );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <div className="bg-brand-surface rounded-2xl p-6 border border-brand-secondary">
            <h2 className="text-xl font-bold text-brand-text-primary mb-4">Últimas Transações</h2>
            {sortedTransactions.length > 0 ? (
                <ul className="divide-y divide-brand-secondary">
                    {sortedTransactions.map(t => <TransactionItem key={t.id} transaction={t} />)}
                </ul>
            ) : (
                <p className="text-brand-text-secondary text-center py-8">Nenhuma transação registrada ainda.</p>
            )}
        </div>
    );
};

export default TransactionList;