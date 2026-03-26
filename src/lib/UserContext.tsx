import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface UserContextType {
  user: User;
  orders: Order[];
  updateUser: (user: User) => void;
  addOrder: (order: Order) => void;
}
const defaultUser: User = {
  name: 'KULTWEB TECHNOLOGIES',
  email: 'kult@example.com',
  phone: '+91 9999999999',
  address: '123,Noida, New Delhi, India',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const updateUser = (updatedUser: User) => setUser(updatedUser);
  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  return (
    <UserContext.Provider value={{ user, orders, updateUser, addOrder }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
