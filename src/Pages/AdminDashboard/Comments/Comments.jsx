import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import { useShowRealtimeDatas } from '../../../Contexts/ShowRealtimeDatasContext'
import { useEditModal } from '../../../Contexts/EditModalContext'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import useTitle from '../../../Hooks/useTitle'
import { CloudUploadOutlined, DoneAllOutlined, FolderOpenOutlined, GppGood, InsertLinkOutlined, MarkChatRead, RemoveCircleOutlineOutlined, RemoveDoneOutlined, RemoveRedEye } from '@mui/icons-material'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { DataGrid , faIR} from '@mui/x-data-grid'
import { Alert } from '@mui/material'
import DetailsModal from '../../../Components/AdminDashboard/DetailsModal/DetailsModal'
import useDelete from '../../../Hooks/useDelete'
import Swal from 'sweetalert2'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from '../../../common/Form/Button'
import axios from 'axios'
import { BaseURL } from '../../../Utils/Utils'
import toast from 'react-hot-toast'
import EditModal from '../../../Components/AdminDashboard/EditModal/EditModal'
import usePost from '../../../Hooks/usePost'
import usePut from '../../../Hooks/usePut'


function Comments() {
  const title = useTitle("نظرها - پنل کاربری")
  const { datas: Comments } = useFetch("comments", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
  const [menuTitle, setMenuTitle] = useState("")
  const [menuHref, setMenuHref] = useState("")
  const [menuParentID, setMenuParentID] = useState('')
  const [commentBody , setCommentBody] = useState('')
  const [commentID , setCommentID] = useState('')
  const [commentAnswerText , setCommentAnswerText] = useState('')
  
  const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 10,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "course",
      headerName: " نام دوره ",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creatorName",
      headerName: "   نام نویسنده",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          comment.row.creator.name
          );
      },
    },
    {
      field: "creatorUsername",
      headerName: "   نام کاربری",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          comment.row.creator.username
          );
      },
    },
    {
      field: "creatorPhone",
      headerName: "   تلفن تماس ",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          comment.row.creator.phone
          );
      },
    },
    {
      field: "bodyText",
      headerName: "  متن کامل ",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          <p onClick={() => {
              setShowDetailsModal(true)
              setCommentBody(comment.row.body)
          }} className='bg-amber-100 p-2 rounded-full cursor-pointer hover:bg-amber-200 transition-colors'>
              <RemoveRedEye className="size-6 text-amber-500"/>
             
          </p>
          
        );
      },
    },
    {
      field: "parentMenuLink",
      headerName: "  وضعیت",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          comment.row.answer ? <span className='bg-emerald-100 text-primary font-DanaBold p-2 rounded-lg'>پاسخ داده شده</span> : <span className='bg-rose-100 text-rose-500 p-2 rounded-lg'>پاسخ داده نشده</span>
        );
      },
    },
    {
      field: "editAction",
      headerName: "ارسال پاسخ",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true);
              setCommentID(comment.id)
            }}
            className="flex-center cursor-pointer text-sky-500 hover:text-sky-300 transition-colors"
          >
            <MarkChatRead className="size-8" />
          </div>
        );
      },
    },
    {
      field: "acceptAction",
      headerName: "تایید",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          
            comment.row.answer ? <DoneAllOutlined className='size-7 text-gray-600'/> :  <div
            onClick={() => {
              AcceptCommentHandler(comment.id)
            }}
            className="flex-center cursor-pointer text-sky-500 hover:text-sky-300 transition-colors"
          >
           <DoneAllOutlined className='size-7'/>
          </div>
          
        
        );
      },
    },
    {
      field: "rejectAction",
      headerName: "رد",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          comment.row.answer ? 
          <div
            onClick={() => {
              RejectCommentHandler(comment.id);
            }}
            className="flex-center cursor-pointer text-amber-500 hover:text-amber-300 transition-colors"
          >
           <RemoveDoneOutlined className='size-7'/>
          </div>
          :  <RemoveDoneOutlined className='size-7 text-gray-600'/>
        );
      },
    },
    {
      field: "ban",
      headerName: "مسدود سازی",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (comment) => {
        return (
          
          <div
            onClick={() => {
              BanUserHandler(comment.id);
            }}
            className="flex-center cursor-pointer text-red-500 hover:text-red-300 transition-colors"
          >
           <RemoveCircleOutlineOutlined className='size-7'/>
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
      renderCell: (comment) => {
        return (
          <div
            onClick={() => {
              DeleteCommentHandler(comment.row.creator._id);
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
     //Accept Function
       const AcceptCommentHandler = (commentID) => {
        Swal.fire({
          title: "برای تایید نظر مطمعن هستید؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f43f5e",
          cancelButtonColor: "#0ea5e9",
          confirmButtonText: "تایید",
          cancelButtonText: "انصراف",
        }).then((result) => {
          if (result.isConfirmed) {
            const accept = usePut(`comments/accept/${commentID}`)
            setShowRealTimeDatas((prev) => !prev)
          }
        });
       }
          //Accept Function
       const RejectCommentHandler = (commentID) => {
        Swal.fire({
          title: "برای رد نظر مطمعن هستید؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f43f5e",
          cancelButtonColor: "#0ea5e9",
          confirmButtonText: "تایید",
          cancelButtonText: "انصراف",
        }).then((result) => {
          if (result.isConfirmed) {
            const accept = usePut(`comments/reject/${commentID}`)
            setShowRealTimeDatas((prev) => !prev)
          }
        });
       }
       //Ban User Function

       const BanUserHandler = (userID) => {
        Swal.fire({
          title: "برای مسدود شدن کاربر مطمعن هستید؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f43f5e",
          cancelButtonColor: "#0ea5e9",
          confirmButtonText: "تایید",
          cancelButtonText: "انصراف",
        }).then((result) => {
          if (result.isConfirmed) {
            const accept = usePut(`users/ban/${userID}`)
            setShowRealTimeDatas((prev) => !prev)
          }
        });
       }
        //Answer Function
        const SendAnswerHandler = () => {
          let sendAnswerInfos = {
              body: commentAnswerText
          }
          if(commentAnswerText){
              const sendAnswer = usePost(`comments/answer/${commentID}` , sendAnswerInfos , "ارسال پاسخ با موفقیت انجام شد")
              setShowEditModal(false)
              setShowRealTimeDatas((prev) => !prev)
          }else{
              toast.error('لطفا متن پاسخ را وارد نمایید')
          }
        }
     //Delete Function
     const DeleteCommentHandler = (commentID) =>{
      Swal.fire({
          title: "برای حذف نظر مطمعن هستید؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f43f5e",
          cancelButtonColor: "#0ea5e9",
          confirmButtonText: "تایید",
          cancelButtonText: "انصراف",
        }).then((result) => {
          if (result.isConfirmed) {
            const commentDel = useDelete(`comments/${commentID}`);
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
            <h2 className="font-DanaBold my-8 text-2xl">لیست نظرها</h2>
            
            {Comments.length > 0 ? (
              <DataGrid
                rows={Comments.map((menu, index) => {
                  return { id: index + 1, ...menu };
                })}
                className="dark:text-white"
                rowHeight={150}
                getRowId={(menu) => menu._id}
                getRowClassName={(UsersMessages) => `${UsersMessages.row.answer ? 'bg-emerald-50 dark:bg-mainSlate/30' : 'bg-rose-50 dark:bg-mainSlate'}`}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                  },
                }}
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
                pageSizeOptions={[5, 10, 25, 100, 200]}
              />
            ) : (
              <Alert severity="info">هیچ نظری ای تاکنون ثبت نگردیده است</Alert>
            )}
          </div>
        </>
      )}
       {/* Show Detail */}
       <DetailsModal>
           {commentBody}
      </DetailsModal>
       {/* Send Answer */}
       <EditModal headerText="ارسال پاسخ">
        <div className="min-w-96">
        <div className="relative mb-4">
        <textarea rows="8" placeholder=' متن پاسخ *' value={commentAnswerText} onChange={(event) => setCommentAnswerText(event.target.value)} className='mb-3 block w-full outline-none p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 rounded-2xl placeholder:font-danaLight transition-colors'></textarea> 
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

export default Comments
