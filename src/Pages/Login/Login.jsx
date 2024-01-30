import React, { useState } from 'react'
import { usePublicDarkMode } from '../../Contexts/DarkModeContext';
import Logo from "../../assets/Images/Logo/logo.webp";
import LogoTypeLight from "../../assets/Images/svgs/logoTypeLight.svg";
import LogoTypeDark from "../../assets/Images/svgs/logoTypeDark.svg";
import { Link } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';
import { Person, Visibility } from '@mui/icons-material';

function Login() {
    const title = useTitle('ورود به حساب')
    const {  colorTheme } = usePublicDarkMode();
    const [showPassword , setShowPassword] = useState(false)
    const [password , setPassword] = useState("")
  return (
    <div className='flex-center min-h-screen'>
      <div className='w-full xs:w-[25rem] px-5 xs:p-0'>
        {/* Logo */}
       <div className='flex-center gap-x-2.5 mb-7 sm:mb-10'>
       <img src={Logo} alt="ghorbani-dev.ir" className="w-[143px] h-26" />
                {
                  colorTheme === 'dark' ? <img
                  src={LogoTypeLight}
                  alt="ghorbani-dev.ir"
                  className="w-[143px] h-[67px]"
                /> : <img
                src={LogoTypeDark}
                alt="ghorbani-dev.ir"
                className="w-[143px] h-[67px]"
              />
                }
       </div>
       {/* Body */}
       <div className='relative p-7 sm:px-8 sm:py-9 bg-white dark:bg-gray-800 shadow-light dark:shadow-none rounded-2xl'>
           <div className='text-center mb-7 sm:mb-9'>
             <h2 className='font-MorabbaMd text-zinc-700 dark:text-white text-3xl mb-2 sm:mb-3'>ورود</h2>
              <span className='font-Dana text-lg text-slate-500 dark:text-gray-500'>
                حساب کاربری ندارید؟
                <Link to="/register" className='text-primary font-Dana mr-1 hover:text-green-500 transition-colors'>ثبت نام</Link>
              </span>
           </div>
           {/* Inputs */}
           <form>
           <div className='space-y-2.5 sm:space-y-3.5'>
           <div className="relative">
							<input type="text" className="outline-none pl-9 sm:pl-12" placeholder=" نام کاربری یا آدرس ایمیل" value="" />
                            <Person className="left-3 sm:left-4" />
						
						</div>
                        <div className="relative">
				<input type={showPassword ? "text" : "password"}  className="outline-none pl-9 sm:pl-12" placeholder="کلمه عبور" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <Visibility onClick={() => setShowPassword((prev) => !prev)} className="left-3 sm:left-4 cursor-pointer" />
						</div>
           </div>
           <button type="submit" className="button-md h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full">تایید</button>
           </form>
           <div class="flex items-center mt-5 text-sm text-slate-500 dark:text-slate-400 tracking-tight">
					<Link to="">حریم خصوصی</Link>				</div>
       </div>
      </div>
    </div>
  )
}

export default Login
