import React, { createContext, useContext, useEffect, useState } from "react";
import { authState } from "../api/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    authState(setUser);
  }, []);
  return (
    <UserContext.Provider value={{ user, uid: user && user.uid }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
