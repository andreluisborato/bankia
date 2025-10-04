import React from 'react';

interface HeaderProps {
  name: string;
  onLogout: () => void;
}

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ name, onLogout }) => {
  return (
    <header className="py-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-brand-text-primary">Olá, <span className="text-brand-primary">{name}</span></h1>
        <p className="text-brand-text-secondary mt-1">Bem-vindo(a) de volta!</p>
      </div>
      <button 
        onClick={onLogout} 
        className="p-2 rounded-full text-brand-text-secondary hover:bg-brand-secondary hover:text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-primary transition-colors"
        aria-label="Sair da conta"
      >
        <LogoutIcon />
      </button>
    </header>
  );
};

export default Header;
