import React, { useState, createContext } from 'react';

export const UserInfoContext = createContext<any>(null);

export const UserInfoProvider: React.FC = (props) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
      {props.children}
    </UserInfoContext.Provider>
  );
};
