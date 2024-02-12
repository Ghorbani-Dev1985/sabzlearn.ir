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

function UsersMessages() {
    const title = useTitle("پیام‌ها - پنل کاربری")
    const { datas: UsersMessages } = useFetch("contact", true)
    const { isShowLoading, setIsShowLoading } = useShowLoading()
    const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
    const { showEditModal, setShowEditModal } = useEditModal()
    const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
    const [magBody , setMsgBody] = useState('')
    const [sendAnswerText , setSendAnswerText] = useState('')
    const [userEmail , setUserEmail] = useState('')
    const columns = [
        {
          field: "id",
          headerName: "ردیف",
          width: 10,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "name",
          headerName: " نام کامل",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "phone",
          headerName: " تلفن تماس",
          width: 120,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "email",
          headerName: " آدرس ایمیل ",
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
            renderCell: (UserMessage) => {
              return (
                <p onClick={() => {
                    setShowDetailsModal(true)
                    setMsgBody(UserMessage.row.body)
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
          renderCell: (UserMessage) => {
            return (
                UserMessage.row.answer ? <span className='bg-emerald-100 text-primary font-DanaBold p-2 rounded-lg'>پاسخ داده شده</span> : <span className='bg-rose-100 text-rose-500 p-2 rounded-lg'>پاسخ داده نشده</span>
            );
          },
        },
        {
          field: "editAction",
          headerName: "ارسال پاسخ",
          width: 90,
          headerAlign: "center",
          align: "center",
          renderCell: (UserMessage) => {
            return (
              <div
                onClick={() => {
                  setShowEditModal(true);
                  setUserEmail(UserMessage.row.email)
                }}
                className="flex-center cursor-pointer text-sky-500 hover:text-sky-300 transition-colors"
              >
                <MarkChatRead className="size-8" />
              </div>
            );
          },
        },
        {
          field: "deleteAction",
          headerName: "حذف",
          width: 50,
          headerAlign: "center",
          align: "center",
          renderCell: (UserMessage) => {
            return (
              <div
                onClick={() => {
                  DeleteContactHandler(UserMessage.id);
                }}
                className="flex-center cursor-pointer text-rose-500 hover:text-rose-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            );
          },
        },
      ];
      //Answer Function
      const SendAnswerHandler = () => {
        let sendAnswerInfos = JSON.stringify({
            email: userEmail,
            answer: sendAnswerText
        })
        if(sendAnswerText){
            const sendAnswer = usePost('contact/answer' , sendAnswerInfos , true)
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
            <h2 className="font-DanaBold my-8 text-2xl">لیست کاربر‌ها</h2>
            <div className='lg:max-w-[40rem] xl:max-w-full'>
            {UsersMessages.length > 0 ? (
              <DataGrid
                rows={UsersMessages.map((UsersMessage, index) => {
                  return { id: index + 1, ...UsersMessage };
                })}
                className="dark:text-white"
                rowHeight={150}
                
                getRowId={(UsersMessage) => UsersMessage._id}
                getRowClassName={(UsersMessages) => `${UsersMessages.row.answer ? 'bg-emerald-50 dark:bg-mainSlate/30' : 'bg-rose-50 dark:bg-mainSlate'}`}
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
           {magBody}
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

export default UsersMessages
