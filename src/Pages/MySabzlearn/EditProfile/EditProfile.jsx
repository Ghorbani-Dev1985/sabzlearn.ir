import React, { useEffect, useState } from 'react'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import useTitle from '../../../Hooks/useTitle'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { DataGrid , faIR} from '@mui/x-data-grid'
import useFetch from '../../../Hooks/useFetch'
import { Alert } from '@mui/material'
import { PublishedWithChanges, RemoveRedEye } from '@mui/icons-material'
import DetailsModal from '../../../Components/AdminDashboard/DetailsModal/DetailsModal'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import axios from 'axios'
import { BaseURL } from '../../../Utils/Utils'
import NonUserAvatar from '../../../assets/Images/CommentFormUser/none.png'
import { useAuth } from '../../../Contexts/AuthContext'
import usePut from '../../../Hooks/usePut'
import toast from 'react-hot-toast'

function EditProfile() {
  const title = useTitle(" جزییات حساب - سبزلرن ")
  const {userInfos} = useAuth()
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const [fullName , setFullName] = useState('')
  const [userName , setUserName] = useState('')
  const [phone , setPhone] = useState('')
  const [email , setEmail] = useState('')
  const [newPassword , setNewPassword] = useState('')

  const EditProfileHandler = (event) => {
    event.preventDefault()
    let newUserInfos = JSON.stringify({
      name: fullName,
	    username: userName,
	   email,
	   password: newPassword,
	    phone
    })
    if(fullName && userName && phone && email && newPassword && fullName.length >= 3 && userName.length >= 3 && phone.length >=10 && email.length >= 5 && newPassword.length >= 7){
      const editProfile = usePut('users/' , newUserInfos)
    }else{
      toast.error('لطفا فرم را با مقادیر صحیح پر نمایید')
    }
  }
  useEffect(() => {
    setFullName(userInfos.name)
    setPhone(userInfos.phone)
    setEmail(userInfos.email)
    setUserName(userInfos.username)
    
  } ,[userInfos])
  return (
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
				<div>
					<label htmlFor="phone" className="font-DanaBold text-zinc-700 dark:text-white">شماره موبایل</label>
					<input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} className="dir-ltr outline-none mt-3.5 md:mt-4 bg-gray-200" />
				</div>
				
				<div>
					<label htmlFor="first_name" className="font-DanaBold text-zinc-700 dark:text-white"> نام و نام خانوادگی </label>
					<input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} className="outline-none mt-3.5 md:mt-4" id="first_name" name="first_name" />
				</div>
				<div>
					<label htmlFor="username" className="font-DanaBold text-zinc-700 dark:text-white">نام کاربری</label>
					<input type="text" value={userName} onChange={(event) => setUserName(event.target.value)} className="outline-none dir-ltr mt-3.5 md:mt-4 bg-gray-200" />
				</div>
				<div>
					<label htmlFor="email" className="font-DanaBold text-zinc-700 dark:text-white">ایمیل</label>
					<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="outline-none dir-ltr  mt-3.5 md:mt-4" name="email" />
				</div>
			</div>
		<div className='w-full flex justify-end'>
			<button onClick={EditProfileHandler} type="submit" className="button-lg button-primary rounded-xl mr-auto w-full md:w-auto mt-10">ثبت اطلاعات</button>
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
				<div>
					<label htmlFor="new_pass" className="font-DanaBold text-zinc-700 dark:text-white">رمز عبور جدید* </label>
					<input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="outline-none mt-3.5 md:mt-4" name="new_pass" placeholder="رمز جدید را وارد کنید" />
				</div>
			</div>
      {/* <div className='w-full flex justify-end'>
			<button type="submit" className="button-lg button-primary rounded-xl mr-auto w-full md:w-auto mt-10" disabled>تغییر رمز</button>
      </div> */}
	</div>
    </div>
  )
}

export default EditProfile
