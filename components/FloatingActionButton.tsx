
import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-brand-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-primary transition-transform duration-200 ease-in-out hover:scale-110"
      aria-label="Adicionar transação"
    >
      <PlusIcon />
    </button>
  );
};

export default FloatingActionButton;
