import { ContentCopyOutlined } from '@mui/icons-material'
import React, { useRef } from 'react'

function ShortLink({bgColor , link}) {
    const CourseShortLink = useRef(null)
    const CopyInClipboardHandler = (event) => {
        let CourseShortLinkText = CourseShortLink.current.innerText
        if(CourseShortLinkText){
          navigator.clipboard.writeText(CourseShortLinkText)
          toast.success('لینک کپی شد')
        }else{
          toast.error('کپی انجام نشد')
        }
      }
  return (
    <div className="hidden lg:block bg-white dark:bg-gray-800 px-5 py-6 shadow-light dark:shadow-none rounded-2xl">
    <span className="flex items-center gap-x-2.5 text-zinc-700 mb-2 -mr-5 dark:text-white font-DanaBold text-2xl">
    <span className={`${bgColor} block w-7 h-2 dark:bg-secondary rounded-l-sm`}></span>
      لینک کوتاه:</span>
    <div onClick={CopyInClipboardHandler} className="flex-between cursor-pointer gap-x-2.5 px-4 h-[65px] text-slate-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-gray-800 border border-dashed border-gray-600/30 rounded-xl transition-colors">
      <ContentCopyOutlined className="size-6"/>
      <span ref={CourseShortLink} className="text-xl truncate dir-ltr">{link}</span>           
    </div>
</div>
  )
}

export default ShortLink
