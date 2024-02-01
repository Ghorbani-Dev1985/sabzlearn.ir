import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userInfos: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState(null)
  const LoginHandler = (token) => {
    setToken(token)
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
