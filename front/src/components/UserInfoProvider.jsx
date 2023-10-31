import React, { createContext, useContext } from "react";

export const UserInfoContext = createContext();

export function UserInfoProvider({ children, senderIp, roomId, roomName }) {
  return (
    <UserInfoContext.Provider value={{ senderIp, roomId, roomName }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}
