import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { BaseURL } from '../../../Utils/Utils'
import useFetch from '../../../Hooks/useFetch'
import { FolderCopy, HowToReg, OndemandVideo } from '@mui/icons-material'

function Overview() {
  const {datas : infos} = useFetch('infos/p-admin' , true)
  console.log(infos.infos)
  
  const [infoDetails , setInfoDetails] = useState([])
  const [lastUsers , setLastUsers] = useState([])

  useEffect(() => {
    axios.get(`${BaseURL}infos/p-admin` , {
      headers : {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
    .then(response => {
      console.log(response.data)
      setInfoDetails(response.data.infos)
      setLastUsers(response.data.lastUsers)
    })
    .catch(error => {
        console.log(error)
        toast.error("  خطا در اتصال به سرور ");
    })
}, [])
  const Navigate = useNavigate()
  useEffect(() => {
      axios.get(`${BaseURL}auth/me` , {
        headers : {
          'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      })
      .then(response => {
        if(response.data.role !== 'ADMIN'){
          Navigate('/')
         toast.error('امکان دسترسی وجود ندارد')
        }
        console.log(response.data)
      })
      .catch(error => {
          console.log(error)
          toast.error("  خطا در اتصال به سرور ");
      })
  }, [])
  return (
    <>
      <div className="flex-center flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-10">
        {
          infoDetails.map(({title , count}) => {
            console.log(title)
            
             if(title === 'ثبت نامی‌ها'){
              return(
                <InfosBox color={'bg-amber-600 dark:bg-yellow-400'} title={title} count={count} icon={<HowToReg className='text-white size-12'/>}/>
              )
             }else if(title === 'دوره‌ها'){
              return(
                <InfosBox color={'bg-sky-500 dark:bg-secondary'} title={title} count={count} icon={<FolderCopy className='text-white size-12'/>}/>
              )
             }else{
              return(
                <InfosBox color={'bg-primary'} title={title} count={count} icon={<OndemandVideo className='text-white size-12'/>}/>
              )
             }
            
          })
        }
</div>
    </>
  )
}

export default Overview


const InfosBox = ({title , count , icon , color}) => {
  return(
    <div className={`${color} flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-64 p-2 rounded-2xl`}>
    <div className="flex-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
         {icon}
    </div>
    <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
        <span className="font-MorabbaBold text-xl">{title} </span>
        <span className="font-DanaBold text-xl">{count}</span>
    </div>
</div>
  )
}

export {InfosBox}