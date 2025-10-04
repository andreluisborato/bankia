
import React, { useState, useEffect } from 'react';
import { User, Transaction, TransactionType } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [users, setUsers] = useLocalStorage<User[]>('bankia-users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('bankia-currentUser', null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Efeito para carregar transações para o usuário logado
  useEffect(() => {
    if (currentUser) {
      const key = `bankia-transactions-${currentUser.name}`;
      const storedTransactions = window.localStorage.getItem(key);
      setTransactions(storedTransactions ? JSON.parse(storedTransactions) : []);
    } else {
      // Limpar transações no logout
      setTransactions([]);
    }
  }, [currentUser]);

  // Função auxiliar para salvar transações para o usuário atual
  const saveTransactions = (newTransactions: Transaction[]) => {
    if (currentUser) {
      const key = `bankia-transactions-${currentUser.name}`;
      window.localStorage.setItem(key, JSON.stringify(newTransactions));
      setTransactions(newTransactions);
    }
  };

  const handleSignUp = (name: string, password: string, initialBalance: number) => {
    if (users?.find(u => u.name.toLowerCase() === name.toLowerCase())) {
        alert("Um usuário com este nome já existe.");
        return;
    }
    const newUser: User = { name, password };
    setUsers([...(users || []), newUser]);
    setCurrentUser(newUser);

    const initialTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: initialBalance,
      type: TransactionType.GAIN,
      timestamp: new Date().toISOString(),
    };
    // Salvar manualmente a transação inicial para o novo usuário
    const key = `bankia-transactions-${newUser.name}`;
    window.localStorage.setItem(key, JSON.stringify([initialTransaction]));
    setTransactions([initialTransaction]);
  };

  const handleSignIn = (name: string, password: string) => {
    const user = users?.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (!user) {
        alert("Usuário não encontrado.");
    } else if (user.password !== password) {
        alert("Senha incorreta.");
    } else {
        setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  }

  const handleAddTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
        ...transaction,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
    };
    saveTransactions([...transactions, newTransaction]);
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary font-sans">
        {!currentUser ? (
            <LoginScreen onSignIn={handleSignIn} onSignUp={handleSignUp} />
        ) : (
            <Dashboard 
                user={currentUser} 
                transactions={transactions} 
                onAddTransaction={handleAddTransaction}
                onLogout={handleLogout}
            />
        )}
    </div>
  );
};

export default App;
