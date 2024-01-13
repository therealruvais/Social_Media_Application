import React, { createContext, useState } from "react";

export const NotifyContext = createContext();

const NotifyProvider = ({ children }) => {
  const [notifyData, setNotifyData] = useState([]);

  return (
    <NotifyContext.Provider value={{ notifyData, setNotifyData }}>
      {children}
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
