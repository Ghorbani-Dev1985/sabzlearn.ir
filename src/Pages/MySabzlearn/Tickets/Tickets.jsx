import React, { useState } from 'react'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import useTitle from '../../../Hooks/useTitle'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { DataGrid , faIR} from '@mui/x-data-grid'
import useFetch from '../../../Hooks/useFetch'
import { Alert } from '@mui/material'
import { AddCircleOutline, ConfirmationNumber, DraftsOutlined, FolderCopy, ForumOutlined, MonetizationOn, RemoveRedEye, RocketLaunch } from '@mui/icons-material'
import DetailsModal from '../../../Components/AdminDashboard/DetailsModal/DetailsModal'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import { useEffect } from 'react'
import axios from 'axios'
import { BaseURL, ChangeGregorianDateToPersian } from '../../../Utils/Utils'
import InfosBox from '../../../Components/InfosBoxInDashboard/InfosBoxInDashboard'
import { Link } from 'react-router-dom'
import NewTicketForm from './NewTicketForm'


function Tickets() {
  const title = useTitle("تیکت‌ ها - سبزلرن ")
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const {datas : tickets} = useFetch('tickets/user' , true)
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
  const [userCourses , setUserCourses] = useState([])
  const [showNewTicketForm , setNewTicketForm] = useState(false)
  const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 10,
      height: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ticketTitle",
      headerName: " عنوان",
      width: 400,
      height: 150,
      headerAlign: "center",
      align: "center",
      whiteSpace: "wrap",
      renderCell: (ticket) => {
        return (
          ticket.row.amser === 1 ?
          <Link to={`viewTicket/${ticket.id}`}>
           {ticket.row.title}
          </Link>
           : ticket.row.title
          );
      },
    },
    {
      field: "ticketDate",
      headerName: " تاریخ",
      width: 200,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (ticket) => {
        return (
          <div className='dir-ltr'>
          { ChangeGregorianDateToPersian(ticket.row.createdAt)} - ({ticket.row.createdAt.slice(11 , 16)})
          </div>
           
          );
      },
    },
    {
      field: "ticketDep",
      headerName: " دپارتمان",
      width: 200,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (ticket) => {
        return (
          <span className='text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded'>
           {ticket.row.departmentID}
          </span>
           
          );
      },
    },
    {
      field: "ticketStatus",
      headerName: " وضعیت",
      width: 200,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (ticket) => {
        return (
          ticket.row.isAnswer === 1 ?  <span className='text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded'>بسته شده </span> : <span className='text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded'> در حال بررسی</span>
          );
      },
    },

  ];
   console.log(tickets)
  return (
    <>
      <div className="flex-center flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-14">
              <InfosBox
                color={"bg-amber-600 dark:bg-yellow-400"}
                title=" همه تیکت ها"
                count={tickets.length}
                icon={<ConfirmationNumber className="text-white size-10" />}
              />
               <InfosBox
                color={"bg-sky-500 dark:bg-secondary"}
                title=" تیکت های باز"
                count={tickets.filter(ticket => ticket.isAnswer === 0).length}
                icon={<DraftsOutlined className="text-white size-10" />}
              />
               <InfosBox
                color={"bg-rose-500"}
                title="   بسته شده"
                count={userCourses.filter(course => course.price === 1).length}
                icon={<ForumOutlined className="text-white size-10" />}
              />
               <div onClick={() => setNewTicketForm((prev) => !prev)} className='cursor-pointer select-none'>
               <InfosBox
                color={"bg-secondary"}
                title=" تیکت جدید "
                count=''
                transparent={true}
                icon={<AddCircleOutline className="text-white size-12" />}
              />
               </div>
      </div>
               {
                showNewTicketForm &&
              <NewTicketForm setNewTicketForm={setNewTicketForm}/>
               }
          {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست کاربر‌ها</h2>
            {tickets.length > 0 ? (
              <DataGrid
                rows={tickets.map((ticket, index) => {
                  return { id: index + 1, ...ticket };
                })}
                className="dark:text-white"
                getRowId={(ticket) => ticket._id}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
                pageSizeOptions={[5, 10, 25, 100, 200]}
              />
            ) : (
              <Alert severity="info">هیچ تیکتی تاکنون ثبت نگردیده است</Alert>
            )}
          </div>
        </>
      )}
           
    </>
  )
}

export default Tickets

