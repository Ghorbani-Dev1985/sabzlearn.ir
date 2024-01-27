import { Instagram, Telegram } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const quickAccessLinks = [
    {
        id: 1,
        to: "/termsConditions",
        linkText : "قوانین و مقررات"
    },
    {
        id: 2,
        to: "/userAccount/tickets",
        linkText : " ارسال تیکت"
    },
    {
        id: 3,
        to: "/courses",
        linkText : " همه دوره ها"
    },
]

const usefulLinks = [
    {
        id: 1,
        to: "/course/java-script-zero-to-hero",
        linkText : " آموزش جاوااسکریپت"
    },
    {
        id: 2,
        to: "/course/python",
        linkText : "  آموزش پایتون"
    },
    {
        id: 3,
        to: "/course/html-tutorial",
        linkText : " آموزش HTML "
    },
    {
        id: 4,
        to: "/course/css-tutorial",
        linkText : " آموزش CSS "
    }
]


function Footer() {
  return (
    <footer className='pt-8 lg:pt-16 mt-24 bg-white dark:bg-transparent dark:border-t border-t-gray-700 font-danaLight text-slate-500 dark:text-slate-400 text-base xl:text-lg'>
        <div className='container'>
        {/* Footer Grid */}
      <div className='flex justify-between flex-wrap gap-y-5 gap-x-4 pb-5 border-b dark:border-b-gray-700'>
          {/* About Us */}
          <div className='flex flex-col items-center sm:items-start gap-y-5 sm:flex-grow'>
            <h4 className='font-DanaMd text-2xl text-zinc-700 dark:text-white'>درباره ما</h4>
            <p className='sm:max-w-xs'>سبزلرن یک اکادمی خصوصی آموزش برنامه نویسی هست که با هدف تحویل نیروی متخصص بر پایه تولید محتوای غیرسطحی فعالیت میکند</p>
          </div>
          {/*  Footer Links */}
           <FooterLinks title="دسترسی سریع" linkList={quickAccessLinks}/>
           <FooterLinks title=" لینک های مفید" linkList={usefulLinks}/>
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
}

export default Footer

const FooterLinks = ({title , linkList}) => {
    return(
     <div className='flex flex-col gap-y-5 flex-grow'>
         <h4 className='font-DanaMd text-2xl text-zinc-700 dark:text-white'>{title}</h4>
         <div className='flex flex-col items-start gap-y-3'>
           { linkList.map(({id , to , linkText}) => {
              return(
                <React.Fragment key={id}>
                <Link to={to}>{linkText}</Link>
                </React.Fragment>
              )
            })
        }
         </div>
     </div>
    )
}
export {FooterLinks}