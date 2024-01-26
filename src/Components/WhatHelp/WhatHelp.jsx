import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'



function WhatHelp() {
  return (
    // WhatHelp Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-sky-500 dark:bg-secondary" title="ما چه کمکی بهتون میکنیم؟" subTitle="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست" isLink={false} /> 
       {/* WhatHelp */}
       <div className='grid grid-rows-2 md:grid-cols-2 gap-5 cursor-default'>
       
       <SingleWhatHelp boxStyle="from-sky-500/30 to-sky-500 dark:from-secondary rotate-45" title="دوره های اختصاصی" description="با پشتیبانی و کیفیت بالا ارائه میده. چون خوش نام بودن نام برند و منافع مشتری و حفظ شان دیگر همکارانش براش مهمه" />
       <SingleWhatHelp boxStyle="from-primary/30 to-primary rotate-[255deg]" title="اجازه تدریس" description="به هر مدرسی رو نمیده و فقط فقط با مدرسای سینیور و مید لول وارد همکاری میشه چون کیفیت براش مهمه" />
       <SingleWhatHelp boxStyle="from-amber-400/30 to-amber-400 from-yellow-500/30 to-yellow-500 -rotate-[255deg]" title=" دوره پولی یا رایگان " description="براش مهم نیست. به مدرسینش بهترین مزایا و دستمزد رو میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده" />
       <SingleWhatHelp boxStyle="from-pink-500/30 to-pink-500 dark:from-rose-500/30 dark:to-rose-500 -rotate-45" title="اولویت بندی به ترتیب منافع" description="در سبزلرن اولویت اول با مدرس هست چون اون قراره دل بسوزونه. اولویت دوم با کاربره چون باید کمکش کرد و درنهایت اولویت آخر با سبزلرنه" />
       </div>
    </section>
  )
}

export default WhatHelp


const SingleWhatHelp = ({boxStyle , title , description}) => {
  return(
   <div className='flex items-center flex-wrap xs:flex-nowrap justify-center xs:justify-start text-center xs:text-right gap-6 shadow-light dark:shadow-none bg-white dark:bg-gray-800 dark:border border-gray-700 rounded-2xl p-5'>
  <div className={`${boxStyle} w-20 h-20 rounded-full bg-conic-gradient to-secondary-dark shrink-0`}></div>
  <div className='space-y-2.5'>
       <span className='text-zinc-700 dark:text-white font-DanaBold text-xl'>{title}</span>
       <p className='text-slate-500 dark:text-slate-400 font-Dana lg:pl-5'>{description}</p>
  </div>
   </div>
  )
}
export {SingleWhatHelp}