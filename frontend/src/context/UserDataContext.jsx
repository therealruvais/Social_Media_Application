import React, { createContext, useState } from "react";

export const  UserDataContext= createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserProvider;