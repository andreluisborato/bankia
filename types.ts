export interface User {
  name: string;
  password: string;
}

export enum TransactionType {
  GAIN = 'GANHOU',
  LOSS = 'PERDEU',
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  timestamp: string;
}

export enum ChatMessageSender {
  USER = 'user',
  BOT = 'bot',
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatMessageSender;
}
