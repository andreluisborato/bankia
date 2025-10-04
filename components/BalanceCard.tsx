
import React from 'react';

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance);

  return (
    <div className="bg-gradient-to-br from-brand-primary to-[#6D28D9] p-8 rounded-2xl shadow-lg text-white">
      <p className="text-lg opacity-80 mb-2">Saldo Atual</p>
      <p className="text-5xl font-bold tracking-tight">{formattedBalance}</p>
    </div>
  );
};

export default BalanceCard;
