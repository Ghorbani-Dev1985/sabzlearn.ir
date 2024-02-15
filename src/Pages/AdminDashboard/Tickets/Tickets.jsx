import React, { useState } from 'react'
import useTitle from '../../../Hooks/useTitle'
import useFetch from '../../../Hooks/useFetch'
import { MarkChatRead, MarkEmailRead, RemoveRedEye } from '@mui/icons-material'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import { useShowRealtimeDatas } from '../../../Contexts/ShowRealtimeDatasContext'
import { useEditModal } from '../../../Contexts/EditModalContext'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { Alert } from '@mui/material'
import { DataGrid , faIR} from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import useDelete from '../../../Hooks/useDelete'
import DetailsModal from '../../../Components/AdminDashboard/DetailsModal/DetailsModal'
import EditModal from '../../../Components/AdminDashboard/EditModal/EditModal'
import Button from '../../../common/Form/Button'
import usePost from '../../../Hooks/usePost'
import toast from 'react-hot-toast'

function Tickets() {
    const title = useTitle("تیکت ها - پنل کاربری")
    const { datas: Tickets } = useFetch("tickets", true)
    const { isShowLoading, setIsShowLoading } = useShowLoading()
    const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
    const { showEditModal, setShowEditModal } = useEditModal()
    const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
    const [ticketBody , setTicketBody] = useState('')
    const [sendAnswerText , setSendAnswerText] = useState('')
    const [ticketID , setTicketID] = useState('')
    const [userEmail , setUserEmail] = useState('')
   console.log(Tickets)
    const columns = [
        {
          field: "id",
          headerName: "ردیف",
          width: 10,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "user",
          headerName: " نام کامل",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "title",
          headerName: " عنوان ",
          width: 120,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "departmentID",
          headerName: " دپارتمان",
          width: 250,
          headerAlign: "center",
          align: "center",
        },
        {
            field: "bodyText",
            headerName: "  متن کامل ",
            width: 140,
            headerAlign: "center",
            align: "center",
            renderCell: (ticket) => {
              return (
                <p onClick={() => {
                    setShowDetailsModal(true)
                    setTicketBody(ticket.row.body)
                }} className='bg-amber-100 p-2 rounded-full cursor-pointer hover:bg-amber-200 transition-colors'>
                    <RemoveRedEye className="size-6 text-amber-500"/>
                   
                </p>
                
              );
            },
          },
        {
          field: "answerStatus",
          headerName: "  وضعیت ",
          width: 140,
          headerAlign: "center",
          align: "center",
          renderCell: (ticket) => {
            return (
                ticket.row.answer ? <span className='bg-emerald-100 text-primary font-DanaBold p-2 rounded-lg'>پاسخ داده شده</span> : <span className='bg-rose-100 text-rose-500 p-2 rounded-lg'>پاسخ داده نشده</span>
            );
          },
        },
        {
          field: "editAction",
          headerName: "ارسال پاسخ",
          width: 90,
          headerAlign: "center",
          align: "center",
          renderCell: (ticket) => {
            return (
              <div
                onClick={() => {
                  setShowEditModal(true);
                  setTicketID(ticket.id)
                  setUserEmail(ticket.row.email)

                }}
                className="flex-center cursor-pointer text-sky-500 hover:text-sky-300 transition-colors"
              >
                <MarkChatRead className="size-8" />
              </div>
            );
          },
        },
      ];
      //Answer Function
      const SendAnswerHandler = () => {
        let sendAnswerInfos = JSON.stringify({
            ticketID,
            body: sendAnswerText
        })
        if(sendAnswerText){
            const sendAnswer = usePost('tickets/answer' , sendAnswerInfos)
            setShowEditModal(false)
            setShowRealTimeDatas((prev) => !prev)
        }else{
            toast.error('لطفا متن پاسخ را وارد نمایید')
        }
      }
      //Delete Function
      const DeleteContactHandler = (DeleteContactHandlerID) =>{
        Swal.fire({
            title: "برای حذف پیام مطمعن هستید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f43f5e",
            cancelButtonColor: "#0ea5e9",
            confirmButtonText: "تایید",
            cancelButtonText: "انصراف",
          }).then((result) => {
            if (result.isConfirmed) {
              const contactDel = useDelete(`contact/${DeleteContactHandlerID}`);
              setShowRealTimeDatas((prev) => !prev)
            }
          });
      }
  return (
    <>
       {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست تیکت ها</h2>
            <div className='lg:max-w-[40rem] xl:max-w-full'>
            {Tickets.length > 0 ? (
              <DataGrid
                rows={Tickets.map((ticket, index) => {
                  return { id: index + 1, ...ticket };
                })}
                className="dark:text-white"
                rowHeight={150}
                
                getRowId={(ticket) => ticket._id}
                getRowClassName={(tickets) => `${tickets.row.answer ? 'bg-emerald-50 dark:bg-mainSlate/30' : 'bg-rose-50 dark:bg-mainSlate'}`}
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
              <Alert severity="info">هیچ پیامی تاکنون ثبت نگردیده است</Alert>
            )}
            </div>
          </div>
        </>
      )}
      {/* Show Detail */}
      <DetailsModal>
           {ticketBody}
      </DetailsModal>
      {/* Send Answer */}
      <EditModal headerText="ارسال پاسخ">
        <div className="min-w-96">
        <div className="relative mb-4">
        <textarea rows="8" placeholder=' متن پاسخ *' value={sendAnswerText} onChange={(event) => setSendAnswerText(event.target.value)} className='mb-3 block w-full outline-none p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 rounded-2xl placeholder:font-danaLight transition-colors'></textarea> 
          </div>
        </div>
        <div className="flex-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            onClick={SendAnswerHandler}
          >
          ارسال پاسخ
          </Button>
        </div>
      </EditModal>
    </>
  )
}

export default Tickets
