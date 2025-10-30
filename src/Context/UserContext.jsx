import React, { useState, createContext } from "react";

export const UserContext = createContext();

const Userprovider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userdata) => {
    setUser(userdata);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children} {/* 👈 Yeh line zaroori hai */}
    </UserContext.Provider>
  );
};

export default Userprovider;
