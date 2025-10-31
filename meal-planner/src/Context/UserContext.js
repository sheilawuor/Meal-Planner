import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {

    if (username.trim() !== "") {
        setUser({ username });
        return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout}}>
        {children}
    </UserContext.Provider>
  );
};

export function useUser() {
    return useContext(UserContext);
}
