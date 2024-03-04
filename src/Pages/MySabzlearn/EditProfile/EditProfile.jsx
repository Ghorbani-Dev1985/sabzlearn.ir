import React, { useEffect, useState } from 'react'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import useTitle from '../../../Hooks/useTitle'
import { Email, Person, PhoneIphone, PublishedWithChanges, Visibility } from '@mui/icons-material'
import NonUserAvatar from '../../../assets/Images/CommentFormUser/none.png'
import { useAuth } from '../../../Contexts/AuthContext'
import usePut from '../../../Hooks/usePut'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form";


function EditProfile() {
  const title = useTitle(" جزییات حساب - سبزلرن ")
  const {userInfos} = useAuth()
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    isDirty,
    isValid,
    watch,
    formState,
  } = useForm(
    {
      mode: "all",
    },
    {
      defaultValues: {
        FullName: "",
        UserName: "",
        MobilNumber: "",
        Email: "",
        Password: '',
      },
    }
  );
  const EditProfileHandler = (data) => {
    let newUserInfos = {
      name: data.FullName,
	    username: data.UserName,
	   email: data.Email,
	   password: data.Password,
	    phone: data.MobilNumber
    }
      const editProfile = usePut('users/' , newUserInfos)
  }
  useEffect(() => {
	reset({
        FullName: userInfos.name,
        UserName: userInfos.username,
        MobilNumber: userInfos.phone,
        Email: userInfos.email,
      });
  } ,[userInfos])
  return (
	<>
			<form onSubmit={handleSubmit(EditProfileHandler)}>
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-10'>
      <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-4.5 rounded-2xl">
		<div className="pb-4.5 border-b border-b-gray-200 dark:border-b-slate-500 mb-10">
			<span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">جزییات حساب کاربری</span>
		</div>
			<div className="relative mb-11">
				<img src={NonUserAvatar} className="w-32 md:w-44 h-32 md:h-44 rounded-full" />
				<a href="https://gravatar.com/" target="_blank" title="برای تغییر پروفایل وارد وبسایت Gravatar.com شوید." className="absolute bottom-0 right-0 flex-center w-10 md:w-14 h-10 md:h-14 rounded-full bg-sky-600 dark:bg-secondary dark:hover:bg-blue-600 border-2 md:border-4 border-white dark:border-gray-800 cursor-pointer transition-colors">
					<PublishedWithChanges className='text-white'/>
				</a>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
				  {/* MobileNumber */}
				<div>
					<label htmlFor="new_pass" className="font-DanaBold text-zinc-700 dark:text-white">  تلفن تماس* </label>
				  <div className="relative mt-2">
              <input
                type="tel"
                {...register("MobilNumber", {
                  required: "وارد کردن تلفن تماس اجباری می باشد",
                  minLength: {
                    value: 10,
                    message: "لطفا حداقل ۱۰ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 11,
                    message: "لطفا حداکثر ۱۱ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                    message: "لطفا فقط عدد انگلیسی وارد نمایید",
                  },
                })}
                className={`${
                  errors.MobilNumber && "border border-rose-500"
                } outline-none pl-9 sm:pl-12 placeholder:text-right`}
                placeholder=" *تلفن تماس"
              />
              <PhoneIphone className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.MobilNumber && errors.MobilNumber.message}
            </span>
				</div>
				    {/* FullName */}
				<div>
				<label htmlFor="new_pass" className="font-DanaBold text-zinc-700 dark:text-white">  نام و نام خانوادگی* </label>
					<div className="relative mt-2">
              <input
                {...register("FullName", {
                  required: "وارد کردن نام و نام خانوادگی اجباری می باشد",
                  minLength: {
                    value: 5,
                    message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 15,
                    message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /^[\u0600-\u06FF\s]+$/g,
                    message: "لطفا فقط حروف فارسی وارد نمایید",
                  },
                })}
                className={`${
                  errors.FullName && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder=" نام و نام خانوادگی*"
              />
              <Person className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.FullName && errors.FullName.message}
            </span>
				</div>
				  {/* UserName */}
				<div>
				<label htmlFor="new_pass" className="font-DanaBold text-zinc-700 dark:text-white"> نام کاربری* </label>
				  <div className="relative mt-2">
              <input
                {...register("UserName", {
                  required: "وارد کردن نام کاربری اجباری می باشد",
                  minLength: {
                    value: 8,
                    message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 15,
                    message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]{8,15}$/g,
                    message: "نام کاربری معتبر نمی باشد کاراکترهای (a-zA-Z0-9_-) مجاز می باشند",
                  },
                })}
                className={`${
                  errors.UserName && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder=" نام کاربری*"
              />
              <Person className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.UserName && errors.UserName.message}
            </span>
				</div>
				{/* Email */}
				<div>
				<label htmlFor="new_pass" className="font-DanaBold text-zinc-700 dark:text-white">  ایمیل* </label>
					<div className="relative mt-2">
              <input
                type="text"
                {...register("Email", {
                  required: "وارد کردن ایمیل اجباری می باشد",
                  minLength: {
                    value: 5,
                    message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 30,
                    message: "لطفا حداکثر ۲۰ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g,
                    message: "لطفا ایمیل صحیح وارد نمایید",
                  },
                })}
                className={`${
                  errors.Email && "border border-rose-500"
                } outline-none pl-9 sm:pl-12 dir-ltr placeholder:text-right`}
                placeholder="  *ایمیل"
              />
              <Email className="left-3 sm:left-4" />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.Email && errors.Email.message}
            </span>
				</div>
			</div>
		<div className='w-full flex justify-end'>
			<button type="submit" className="button-lg button-primary rounded-xl mr-auto w-full md:w-auto mt-10 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text" disabled={(!formState.isValid)}>ثبت اطلاعات</button>
    </div>
	</div>
  <div className="xl:col-span-1 bg-white dark:bg-gray-800 p-4.5 rounded-2xl">
		<div className="pb-4.5 border-b border-b-gray-200 dark:border-b-slate-500 mb-10">
			<span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">تغییر رمز عبور</span>
		</div>
			<div className="space-y-5 md:space-y-6">
				<div>
					<label htmlFor="old_pass" className="font-DanaBold text-zinc-700 dark:text-white">رمز عبور فعلی</label>
					<input type="password"  name="old_pass" className="outline-none mt-3.5 md:mt-4 mb-3" placeholder="رمز فعلی را وارد کنید" />
					<a href="" className="text-slate-500 dark:text-slate-400 text-sm">رمز عبور را فراموش کرده اید؟</a>
				</div>
				   {/* Password */}
					   <label htmlFor="new_pass" className="block font-DanaBold text-zinc-700 dark:text-white mt-2">رمز عبور جدید* </label>
				   <div className="relative">
              <input
                {...register("Password", {
                  required: "وارد کردن کلمه عبور اجباری می باشد",
                  minLength: {
                    value: 8,
                    message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 15,
                    message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                  },
                  pattern: {
                    value: /^^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
                    message: "کلمه عبور معتبر نمی باشد",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className={`${
                  errors.Password && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder="  کلمه عبور*"
              />
               <Visibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="left-3 sm:left-4 cursor-pointer"
                />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.Password && errors.Password.message}
            </span>
			</div>
	</div>
    </div>
			</form>
	</>
  )
}

export default EditProfile
