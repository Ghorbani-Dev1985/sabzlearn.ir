import { AlternateEmail, Email, Instagram, PhoneIphone, Telegram } from '@mui/icons-material'
import React, { memo, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import Button from '../../common/Form/Button'
import { Divider } from '@mui/material'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form";
import ApiRequest from '../../Services/Axios/Configs/Config'

const quickAccessLinks = [
    {
        _id: 1,
        href: "/termsConditions",
        title : "قوانین و مقررات"
    },
    {
        _id: 2,
        href: "/contactUS",
        title : "  ارتباط با ما"
    },
    {
        _id: 3,
        href: "/courses",
        title : " همه دوره ها"
    },
]



export default memo(function Footer() {
   const { datas: usefulLinks } = useFetch("menus/topbar")
   const { datas: infos } = useFetch("infos/index")
    const [newsLatterValue , setNewsLatterValue] = useState('')
    const ShuffledLinks = useCallback([...usefulLinks].sort(() => 0.5 - Math.random()), [usefulLinks])
    const { register , handleSubmit , formState: {errors} , reset , isDirty, isValid , formState} = useForm(
      {
       mode: 'all'
      },
      {
       defaultValues: {
        Email: '',
       }
    })
     const NewsLatterHandler = (data) => {
      console.log(data)
      const ResponseResult = ApiRequest.post('newsletters' , {email: data.Email})
      .then(response => {
        if(response.status === 201){
          toast.success(" عضویت در خبرنامه با موفقیت انجام شد")

        }else{
          toast.error(" عضویت در خبرنامه انجام نشد")
        }
      })
      reset()
     }
  return (
    <footer className='pt-8 lg:pt-16 mt-24 bg-white dark:bg-transparent dark:border-t border-t-gray-700 font-danaLight text-slate-500 dark:text-slate-400 text-base xl:text-lg'>
        <div className='container'>
        {/* Footer Grid */}
      <div className='flex justify-between flex-wrap gap-y-5 gap-x-4 pb-5 border-b dark:border-b-gray-700'>
          {/* About Us */}
          <div className='flex flex-col items-center sm:items-start gap-y-5 sm:flex-grow'>
            <h4 className='font-DanaMd text-2xl text-zinc-700 dark:text-white'>درباره ما</h4>
            <p className='sm:max-w-xs'>سبزلرن یک اکادمی خصوصی آموزش برنامه نویسی هست که با هدف تحویل نیروی متخصص بر پایه تولید محتوای غیرسطحی فعالیت میکند</p>
            <div className='w-full flex-between'>
            <a href='tel:989921558293' className='dir-ltr'>
             <PhoneIphone /> <span>{infos.phone}</span>
            </a>
            <a href='mailto:sabzlearn@gmail.com' className='dir-ltr'>
             <AlternateEmail /> <span>{infos.email}</span>
            </a>
            </div>
            <div className='w-full flex-between'>
              <div className='flex-center gap-3'><p className='flex-center bg-emerald-100 dark:bg-mainSlate text-primary size-12 font-DanaBold text-2xl p-2 rounded-full'>{infos.coursesCount}</p><span>دوره</span></div>
              <div className='flex-center gap-3'><p className='flex-center bg-emerald-100 dark:bg-mainSlate text-primary size-12 font-DanaBold text-2xl p-2 rounded-full'>{infos.usersCount}</p><span>کاربر</span></div>
              <div className='flex-center gap-3'><p className='flex-center bg-emerald-100 dark:bg-mainSlate text-primary size-12 font-DanaBold text-2xl p-2 rounded-full'>{infos.totalTime}</p><span>ساعت</span></div>
            </div>
          </div>
          {/*  Footer Links */}
           <FooterLinks title="دسترسی سریع" linkList={quickAccessLinks}/>
           <FooterLinks title=" لینک های مفید" linkList={ShuffledLinks.slice(0 , 5)}/>
           {/* Social Media */}
           <div className='flex flex-col gap-y-5 flex-grow'>
            <h4 className='font-DanaMd text-2xl text-zinc-700 dark:text-white'>شبکه های اجتماعی</h4>
            <div className='flex flex-col items-start gap-y-3'>
            <div className='flex items-center gap-x-4'>
                <div className='flex-center rounded-full size-8 bg-orange-600 text-white bg-gradient-to-tr from-[#FEDC15] via-[#F71F87] to-[#9000DC]'>
                   <Instagram className='size-5'/>
                </div>
                <Link to="https://www.instagram.com/sabzlearn_" className='dir-ltr text-hover font-DanaBold'>@sabzlearn_</Link>
            </div>
           
            <div className='flex items-center gap-x-4'>
                <div className='flex-center rounded-full size-8 bg-blue-500 text-white bg-gradient-to-b from-blue-400 to-blue-600'>
                 <Telegram className='size-5'/>
                </div>
                 <Link to="https://t.me/sabzlearn" className='dir-ltr font-DanaBold'>@sabzlearn</Link>
            </div>
            <div className='flex flex-col gap-4'>
            <Divider className="dark:border-mainSlate"/>
              <h4 className='font-DanaBold'>عضویت در خبرنامه</h4>
            <div className='shadow-light dark:shadow-none bg-gray-100 dark:bg-gray-800 dark:border border-gray-700 rounded-2xl overflow-hidden'>
            <form className='h-full' onSubmit={handleSubmit(NewsLatterHandler)}>

        <div className={`${errors.Email && 'border border-rose-500'} h-full flex-between text-slate-500 dark:text-gray-500`}>
          <input
             type="text"
             {...register('Email' , {
                required: 'وارد کردن ایمیل اجباری می باشد',
                minLength: {
                  value: 5,
                  message: 'لطفا حداقل ۵ کاراکتر وارد نمایید'
                },
                maxLength: {
                  value: 30,
                  message: 'لطفا حداکثر ۲۰ کاراکتر وارد نمایید'
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g,
                  message: 'لطفا ایمیل صحیح وارد نمایید'
                }
              })}
              className={` outline-none pl-9 sm:pl-12 rounded-tl-none rounded-bl-none dir-ltr placeholder:text-right`}
              placeholder="  *ایمیل"
              />
         <Button btnType="submit" className="h-full px-2 bg-primary text-white" disabled={!formState.isValid} > عضویت</Button>
        </div>
                  </form>
     </div>
        <span className="block text-rose-500 text-sm">{errors.Email && errors.Email.message}</span> 
            </div>
            </div>
           </div>
           {/* Copyright */}
           <div className='w-full flex justify-center xs:justify-between flex-wrap gap-x-3 gap-y-2 py-5 text-base'>
            <span>ساخته شده با ❤️ در سبزلرن - Ghorbani-dev.ir</span>
            <p className="dir-ltr text-center">Copyright © 2019-2024 Sabzlearn. All rights reserved.</p>
           </div>
      </div>
      </div>
    </footer>
  )
})


const FooterLinks = ({title , linkList}) => {
    return(
     <div className='flex flex-col gap-y-5 flex-grow'>
         <h4 className='font-DanaMd text-2xl text-zinc-700 dark:text-white'>{title}</h4>
         <div className='flex flex-col items-start gap-y-3'>
           { linkList.map(({_id , href , title}) => {
              return(
                <React.Fragment key={_id}>
                <Link to={href}>{title}</Link>
                </React.Fragment>
              )
            })
        }
         </div>
     </div>
    )
}
export {FooterLinks}