import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const loginUser = (id) => {
    setUserId(id);
  };

  const logoutUser = () => {
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};