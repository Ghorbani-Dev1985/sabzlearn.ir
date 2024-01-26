import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import { Link } from 'react-router-dom'
import FrontEnd from '../../assets/Images/svgs/forntEndIcon.svg'
import Security from '../../assets/Images/svgs/securityIcon.svg'
import Python from '../../assets/Images/svgs/pythonIcon.svg'
import SoftSkill from '../../assets/Images/svgs/softSkillIcon.svg'


function RoadMap() {
  return (
    // Roadmap Component
    <section className='mt-25'>
       <SectionTitle squareColor="bg-fuchsia-500" title="نقشه راه ها" subTitle="نقشه های راه برای شروع اصولی یادگیری" isLink={false} /> 
       {/* Roadmap */}
       <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          <SingleRoadMap to="" boxBgColor="from-[#FFB535] to-[#F2295B]" icon={FrontEnd} title="فرانت اند" countNumber={27} />
          <SingleRoadMap to="" boxBgColor="from-[#30C4E5] to-[#27E55C]" icon={Security} title=" امنیت" countNumber={8} />
          <SingleRoadMap to="" boxBgColor="from-[#9C33F7] to-[#2B9FFF]" icon={Python} title="پایتون" countNumber={6} />
          <SingleRoadMap to="" boxBgColor="from-[#FF3571] to-[#870075]" icon={SoftSkill} title=" مهارت‌های نرم" countNumber={6} />
       </div>
    </section>
  )
}

export default RoadMap


const SingleRoadMap = ({to , boxBgColor , icon , title , countNumber}) => {
  return(
   <div className='overflow-hidden rounded-2xl h-40'>
     <Link className={`${boxBgColor} w-full h-full flex justify-center items-center relative bg-gradient-to-r group`}>
      <div className='text-white flex flex-col items-center text-center'>
        <img src={icon} alt='ghorbani-dev.ir' />
        <span className='font-DanaBold text-2xl mt-2.5 block'>{title}</span>
      </div>
      <span className='absolute top-2.5 left-2.5 size-6 rounded-full text-center leading-[26px] text-zinc-700 dark:text-white font-DanaMd bg-white dark:bg-gray-800'>{countNumber}</span>
     </Link>
   </div>
  )
}
export {SingleRoadMap}