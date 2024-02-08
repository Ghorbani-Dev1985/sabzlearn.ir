import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../Utils/Utils";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  const [userInfos, setUserInfos] = useState(null)

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
      axios.get(`${BaseURL}auth/me` , {
        headers : {
          'Authorization' : `Bearer ${localStorageData.token}`
        }
      })
      .then(response => {
        setIsLoggedIn(true)
        setUserInfos(response.data)
      })
      .catch(error => {
          console.log(error)
          toast.error("  خطا در اتصال به سرور ");
      })
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
