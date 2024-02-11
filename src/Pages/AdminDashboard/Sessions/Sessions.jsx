import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import { useShowRealtimeDatas } from '../../../Contexts/ShowRealtimeDatasContext'
import { useEditModal } from '../../../Contexts/EditModalContext'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import useTitle from '../../../Hooks/useTitle'
import { AccessTimeFilled, CloudUploadOutlined, FolderOpenOutlined, InsertLinkOutlined, RemoveRedEye } from '@mui/icons-material'
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
import DOMPurify from 'dompurify'

function Sessions() {
  const title = useTitle("جلسه دوره‌ها - پنل کاربری")
  const { datas: Sessions } = useFetch("courses/sessions", true)
  const { datas: courses } = useFetch("courses", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
  const [sessionTitle, setSessionTitle] = useState("")
  const [sessionTime, setSessionTime] = useState("")
  const [courseID , setCourseID] = useState('')
  const [sessionVideo , setSessionVideo] = useState("")
  const [isFree, setIsFree] = useState(1)
 console.log(Sessions)
   const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 10,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: " عنوان ",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "courseName",
      headerName: "    عنوان دوره",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (session) => {
        return (
         session.row.course.name
        );
      },
    },
    {
      field: "time",
      headerName: " زمان",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sessionIsfree",
      headerName: "  وضعیت ",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (session) => {
        return (
            session.row.free ? <span className='bg-emerald-100 text-primary font-DanaBold p-2 rounded-lg'>  نقدی</span> : <span className='bg-rose-100 text-rose-500 p-2 rounded-lg'>رایگان </span>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (session) => {
        return (
          <div
            onClick={() => {
              DeleteSessionHandler(session.row._id);
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
     //Add Function
     const AddNewSessionHandler = (event) => {
      event.preventDefault()
      let newSessionFormData = new FormData()
      newSessionFormData.append('title' , sessionTitle)
      newSessionFormData.append('time' , +sessionTime)
      newSessionFormData.append('video' , sessionVideo)
      newSessionFormData.append('free' , isFree)

       if(sessionTitle && sessionTime && sessionVideo.name){
         axios.post(`${BaseURL}courses/${courseID}/sessions` , newSessionFormData, {
           headers : {
             'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
           }
         })
         .then(response => {
           console.log(response)
           if(response.status === 201){
             
             toast.success("  افزودن جلسه با موفقیت انجام شد")
             setSessionTitle('')
             setSessionTime('')
             setSessionVideo('')
             setCourseID('')
             setIsFree('')
             setShowRealTimeDatas((prev) => !prev)
           }else{
             toast.error("افزودن جلسه انجام نشد");
           }
         })
         .catch(error => {
             console.log(error)
             toast.error('خطا در اتصال به سرور')
            })
          }else if(blogTitle.length <=2 && blogShortName.length <=2){
            toast.error('تعداد کاراکترها کمتر از حد مجاز می باشد')
          }else{
            toast.error('ویدیو جلسه را آپلود نمایید')
          }
     }
     //Delete Function
     const DeleteSessionHandler = (sessionID) =>{
      console.log(sessionID)
      Swal.fire({
          title: "برای حذف جلسه مطمعن هستید؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f43f5e",
          cancelButtonColor: "#0ea5e9",
          confirmButtonText: "تایید",
          cancelButtonText: "انصراف",
        }).then((result) => {
          if (result.isConfirmed) {
            const sessionDel = useDelete(`courses/sessions/${sessionID}`);
            setShowRealTimeDatas((prev) => !prev)
          }
        });
    }
  return (
    <>
     <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن جلسه جدید
        </legend>
        <div className="flex flex-wrap justify-between gap-5 child:w-48p">
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder=" عنوان *"
              value={sessionTitle}
              onChange={(event) => setSessionTitle(event.target.value)}
            />
            <InsertLinkOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative">
            <input
              type="number"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder=" زمان *"
              value={sessionTime}
              onChange={(event) => setSessionTime(event.target.value)}
            />
            <AccessTimeFilled className="left-3 sm:left-4" />
          </div>
          <div>
          <div className="relative my-12">
            <select
              defaultValue={'انتخاب دوره'}
              onChange={(event) => setCourseID(event.target.value)}
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={'انتخاب دوره'} disabled>انتخاب دوره</option>
              {courses.map(({ _id, name }) => {
                return (
                  <React.Fragment key={_id}>
                    <option value={_id} className="px-3">
                      {name}
                    </option>
                  </React.Fragment>
                );
              })}
            </select>
          </div>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Start"
                    type="radio"
                    value={1}
                    onChange={(event) => setIsFree(event.target.value)}
                    hidden
                    name="list-radio"
                    className="peer"
                  />
                  <label
                    htmlFor="Start"
                    className="w-full cursor-pointer peer-checked:text-primary peer-checked:font-DanaBold py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                   نقدی
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Presell"
                    type="radio"
                    value={0}
                    onChange={(event) => setIsFree(event.target.value)}
                    name="list-radio"
                    hidden
                    className="peer "
                  />
                  <label
                    htmlFor="Presell"
                    className="w-full cursor-pointer py-3 peer-checked:text-primary peer-checked:font-DanaBold ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    رایگان
                  </label>
                </div>
              </li>
            </ul>
          </div>
           <div className="relative">
        <div className="flex-center w-full mx-auto my-3">
          <div className="flex-center w-full relative">
            <label
              htmlFor="VideoUpload"
              className="flex-center flex-col w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex-center flex-col pt-5 pb-6">
                <CloudUploadOutlined className="text-gray-500 mb-2" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">انتخاب فایل</span> یا فایل را
                  بکشید و اینجا رها کنید
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP4 , MKV (حجم 200MB)
                </p>
               <span className="text-mainSlate dark:text-white my-3">{sessionVideo.name}</span> 
              </div>
              <input id="VideoUpload" type="file" required onChange={(event) => setSessionVideo(event.target.files[0])} accept=".mp4 , .mkv" className="h-full absolute z-50 opacity-0" />
            </label>
          </div>
        </div>
          </div>
    
        </div>
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            onClick={AddNewSessionHandler}
          >
            افزودن جلسه
          </Button>
        </div>
      </fieldset>
       {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست مقاله‌ها</h2>
            {Sessions.length > 0 ? (
              <DataGrid
                rows={Sessions.map((session, index) => {
                  return { id: index + 1, ...session };
                })}
                className="dark:text-white"
                rowHeight={150}
                getRowId={(session) => session._id}
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
              <Alert severity="info">هیچ مقاله ای تاکنون ثبت نگردیده است</Alert>
            )}
          </div>
        </>
      )}
      
    </>
  )
}

export default Sessions
