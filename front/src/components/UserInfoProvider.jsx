import React, { createContext, useContext } from "react";

export const UserInfoContext = createContext();

export function UserInfoProvider({ children, senderIp, roomId }) {
  return (
    <UserInfoContext.Provider value={{ senderIp, roomId }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}
