import { useState, createContext, useCallback } from "react";

import type { IUserDetails, IUserContext } from "../type";

const initialUserData = { username: "", profileImage: "", score: 0 };

const initialContextValue = {
  userData: [],
  setUserData: () => {},
  getCurrentUser: (param: string) => {
    return initialUserData;
  },
};

const UserContext = createContext<IUserContext>({ ...initialContextValue });

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUserDetails[]>([]);
  const getCurrentUser = useCallback(
    (userName: string) =>
      userData.find((user) => user.username === userName) || initialUserData,
    [userData]
  );

  return (
    <UserContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
