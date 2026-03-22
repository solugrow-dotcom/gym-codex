import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

const demoUser = {
  name: 'Priya Mehta',
  role: 'Super Admin',
  gym: 'Iron Temple'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(demoUser);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
