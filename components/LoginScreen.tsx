
import React, { useState } from 'react';

interface LoginScreenProps {
  onSignIn: (name: string, password: string) => void;
  onSignUp: (name: string, password: string, initialBalance: number) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSignIn, onSignUp }) => {
  const [isLoginView, setIsLoginView] = useState(false);
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      if (name.trim() && password) {
        onSignIn(name, password);
      }
    } else {
      const initialBalance = parseFloat(balance);
      if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }
      if (name.trim() && password && !isNaN(initialBalance) && initialBalance >= 0) {
        onSignUp(name, password, initialBalance);
      }
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    // Redefinir campos na alternância de visualização
    setName('');
    setPassword('');
    setConfirmPassword('');
    setBalance('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-bg to-[#1a1a20] p-4">
      <div className="w-full max-w-md bg-brand-surface rounded-2xl shadow-2xl p-8 border border-brand-secondary">
        <h1 className="text-3xl font-bold text-center text-brand-text-primary mb-2">
          {isLoginView ? 'Acessar Conta' : 'Bem-vindo ao BankIA'}
        </h1>
        <p className="text-center text-brand-text-secondary mb-8">
          {isLoginView ? 'Insira seus dados para continuar.' : 'Crie sua conta para começar a gerenciar suas finanças.'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Seu nome de usuário</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: joaosilva"
              className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
              required
              autoComplete="username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-text-secondary mb-2">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
              required
              autoComplete={isLoginView ? "current-password" : "new-password"}
            />
          </div>

          {!isLoginView && (
            <>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-text-secondary mb-2">Confirmar Senha</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                  required
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="balance" className="block text-sm font-medium text-brand-text-secondary mb-2">Saldo inicial (R$)</label>
                <input
                  id="balance"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="Ex: 1000.00"
                  className="w-full bg-brand-secondary border border-gray-600 rounded-lg px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-brand-primary text-white font-semibold py-3 rounded-lg hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoginView ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>
        <p className="text-center text-sm text-brand-text-secondary mt-6">
          {isLoginView ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <button onClick={toggleView} className="font-semibold text-brand-primary hover:underline ml-1">
            {isLoginView ? 'Crie uma agora' : 'Faça login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
