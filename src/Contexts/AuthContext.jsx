import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState(null)
  const LoginHandler = (userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem('user' , JSON.stringify({token}))
  }
  const LogoutHandler = () => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token , userInfos , LoginHandler , LogoutHandler}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
