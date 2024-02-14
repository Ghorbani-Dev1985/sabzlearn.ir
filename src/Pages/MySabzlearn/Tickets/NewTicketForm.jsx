import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseURL } from '../../../Utils/Utils'
import useFetch from '../../../Hooks/useFetch'
import usePost from '../../../Hooks/usePost'
import toast from 'react-hot-toast'


function NewTicketForm({setNewTicketForm}) {
    const {datas : departments} = useFetch('tickets/departments', true)
    const [departmentID , setDepartmentID] = useState('-1')
    const [ticketTitle , setTicketTitle] = useState('')
    const [ticketBody , setTicketBody] = useState('')
    console.log(departments)
    const AddNewTicketHandler = (event) => {
        event.preventDefault()
        let NewTicketInfo = JSON.stringify({
            departmentID,
            departmentSubID: '65cce5bc95ff4d0e047abde2',
            title: ticketTitle,
            priority: '2',
            body: ticketBody,
            course: undefined,
        })
        console.log(ticketTitle , ticketBody , departmentID )
        if(ticketTitle && ticketBody && departmentID && ticketTitle.length >= 2 && ticketBody.length >= 10){
            const newTicket = usePost('tickets' ,NewTicketInfo, "افزودن تیکت جدید با موفقیت انجام شد")
            setDepartmentID('-1')
            setTicketTitle('')
            setTicketBody('')
            setNewTicketForm(false)
        }else{
            toast.error('لطفا فرم را با تعداد کاراکتر کافی تکمیل نمایید')
        }
    }
  return (
    <div className='bg-white dark:bg-gray-800 p-3.5 md:p-4.5 rounded-2xl mb-8'>
    <div className='flex-between pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700'>
    <span className="font-DanaMd md:text-xl text-zinc-700 dark:text-white">ارسال تیکت</span>
    </div>
    <div>
<label for="department" className="font-DanaBold text-zinc-700 dark:text-white">دپارتمان</label>
<select defaultValue={'-1'} onChange={(event) => setDepartmentID(event.target.value)} name="department" id="department" required="" className="mt-3.5 outline-none md:mt-4 w-full p-3 sm:p-5 font-Dana text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all">
  <option value="-1" disabled>دپارتمان مورد نظر...</option>
              {
                departments.map(({_id , title}) => {
                    return(
                        <React.Fragment key={_id}>
                         <option value={_id}>{title}</option>
                        </React.Fragment>
                    )
                })
              }         
              </select>
 </div>
 <div className="mt-6">
			<label for="title" className="font-DanaBold text-zinc-700 dark:text-white">موضوع تیکت</label>
			<input type="text" value={ticketTitle} onChange={(event) => setTicketTitle(event.target.value)} className="mt-3.5 md:mt-4 outline-none" name="title" required="" placeholder="موضوع تیکت خود را وارد کنید" />
		</div>
        <div className="mt-6">
			<label for="text" className="font-DanaBold text-zinc-700 dark:text-white">متن تیکت</label>
			<textarea rows="8" value={ticketBody} onChange={(event) => setTicketBody(event.target.value)} className="mt-3.5 outline-none md:mt-4 w-full p-3 sm:p-5 font-Dana text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-mainSlate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all" name="text" placeholder="متن تیکت خود را وارد کنید" required="" ></textarea>
		</div>
        <div className="flex justify-between gap-5 flex-wrap mt-6">
			<div className="flex gap-x-3 mr-auto">
				<button type="submit" className="button-md button-primary rounded-xl" onClick={AddNewTicketHandler}>ارسال</button>
			</div>
		</div>
  </div>
  )
}

export default NewTicketForm
