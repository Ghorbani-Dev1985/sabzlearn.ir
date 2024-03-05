import { createContext, useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../Services/Axios/Configs/Config";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userInfos: null,
  LoginHandler: () => {},
  LogoutHandler: () => {}
});

export const AuthProvider = ({ children }) => {
  const Navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState({})
  const abortController = new AbortController()

  const LoginHandler = useCallback((userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem('user' , JSON.stringify({token}))
  }, [token])

  const LogoutHandler = useCallback(() => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    toast.success('خروج از سیستم با موفقیت انجام شد')
    Navigate('/')
  } , [token])

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    if(localStorageData){
      const ResponseResult = ApiRequest('auth/me' , {signal: abortController.signal})
      .then((response) => {
         setIsLoggedIn(true)
         setUserInfos(response.data)
         if(response.data.role !== 'ADMIN'){
          Navigate('/')
         }
      });
    }
    
    return () => {
      abortController.abort()
    }
  }, [LoginHandler])
  
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token , userInfos , LoginHandler , LogoutHandler}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
