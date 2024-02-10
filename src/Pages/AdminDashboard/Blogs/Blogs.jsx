import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import { useShowRealtimeDatas } from '../../../Contexts/ShowRealtimeDatasContext'
import { useEditModal } from '../../../Contexts/EditModalContext'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import useTitle from '../../../Hooks/useTitle'
import { CloudUploadOutlined, FolderOpenOutlined, InsertLinkOutlined, RemoveRedEye } from '@mui/icons-material'
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

function Blogs() {
  const title = useTitle("مقاله‌ها - پنل کاربری")
  const { datas: Blogs } = useFetch("articles", true)
  const { datas: categories } = useFetch("category", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
  const [blogTitle, setBlogTitle] = useState("")
  const [blogDescription, setBlogDescription] = useState("")
  const [blogShortName, setBlogShortName] = useState("")
  const [blogCategoryID, setBlogCategoryID] = useState("")
  const [blogBody , setBlogBody] = useState('')
  const [blogCover, setBlogCover] = useState({})
  const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 10,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "photo",
      headerName: " عکس ",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return (
          <img
            src={`http://localhost:5000/courses/covers/${blog.row.cover}`}
            className="object-fill"
            alt="ghorbani-dev.ir"
          />
        );
      },
    },
    {
      field: "title",
      headerName: " عنوان ",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creatorName",
      headerName: "   نویسنده",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return (
          blog.row.creator.name
        );
      },
    },
    {
      field: "creatorPhone",
      headerName: " تلفن نویسنده ",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return (
          blog.row.creator.phone
        );
      },
    },
    {
      field: "description",
      headerName: " چکیده",
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
        renderCell: (blog) => {
          return (
            <p onClick={() => {
                setShowDetailsModal(true)
                setBlogBody(blog.row.body)
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
      renderCell: (blog) => {
        return (
            blog.row.publish ? <span className='bg-emerald-100 text-primary font-DanaBold p-2 rounded-lg'> منتشر شده</span> : <span className='bg-rose-100 text-rose-500 p-2 rounded-lg'>پیش نویس</span>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return (
          <div
            onClick={() => {
              DeleteBlogHandler(blog.id);
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
     const AddNewBlogHandler = (event) => {
      event.preventDefault()
      let newBlogFormData = new FormData()
      newBlogFormData.append('title' , blogTitle)
      newBlogFormData.append('description' , blogDescription)
      newBlogFormData.append('shortName' , blogShortName)
      newBlogFormData.append('categoryID' , blogCategoryID)
      newBlogFormData.append('body' , blogBody)
      newBlogFormData.append('cover' , blogCover)
    console.log(blogCover.name)
       if(blogTitle && blogDescription && blogShortName && blogCategoryID && blogCover.name){
         axios.post(`${BaseURL}articles` , newBlogFormData, {
           headers : {
             'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
           }
         })
         .then(response => {
           console.log(response)
           if(response.status === 201){
             
             toast.success("  افزودن مقاله با موفقیت انجام شد")
             setBlogTitle('')
             setBlogDescription('')
             setBlogShortName('')
             setBlogCategoryID('')
             setBlogCover('')
             setBlogBody('')
             setShowRealTimeDatas((prev) => !prev)
           }else{
             toast.error("افزودن مقاله انجام نشد");
           }
         })
         .catch(error => {
             console.log(error)
             toast.error('خطا در اتصال به سرور')
            })
          }else if(blogTitle.length <=2 && blogShortName.length <=2){
            toast.error('تعداد کاراکترها کمتر از حد مجاز می باشد')
          }else{
            toast.error('عکس مقاله را آپلود نمایید')
          }
     }
     //Delete Function
     const DeleteBlogHandler = (blogID) =>{
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
            const blogDel = useDelete(`articles/${blogID}`);
            setShowRealTimeDatas((prev) => !prev)
          }
        });
    }
  return (
    <>
     <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن مقاله جدید
        </legend>
        <div className="flex flex-wrap justify-between gap-5 child:w-48p">
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder="نام  *"
              value={blogTitle}
              onChange={(event) => setBlogTitle(event.target.value)}
            />
            <FolderOpenOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder=" لینک *"
              value={blogShortName}
              onChange={(event) => setBlogShortName(event.target.value)}
            />
            <InsertLinkOutlined className="left-3 sm:left-4" />
          </div>
          <textarea rows="8" placeholder='  چکیده *' value={blogDescription} onChange={(event) => setBlogDescription(event.target.value)} className='mb-3 block w-full outline-none p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 rounded-2xl placeholder:font-danaLight transition-colors'></textarea> 
           <div className="relative">
            <select
              defaultValue={'انتخاب دسته بندی دوره'}
              onChange={(event) => setBlogCategoryID(event.target.value)}
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={'انتخاب دسته بندی دوره'} disabled>انتخاب دسته بندی دوره</option>
              {categories.map(({ _id, title }) => {
                return (
                  <React.Fragment key={_id}>
                    <option value={_id} className="px-3">
                      {title}
                    </option>
                  </React.Fragment>
                );
              })}
            </select>
        <div className="flex-center w-full mx-auto my-3">
          <div className="flex-center w-full relative">
            <label
              htmlFor="CoverUpload"
              className="flex-center flex-col w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex-center flex-col pt-5 pb-6">
                <CloudUploadOutlined className="text-gray-500 mb-2" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">انتخاب فایل</span> یا فایل را
                  بکشید و اینجا رها کنید
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  WEBP, PNG, JPG , JPEG (سایز 768x432px )
                </p>
               <span className="text-mainSlate dark:text-white my-3">{blogCover.name}</span> 
              </div>
              <input id="CoverUpload" type="file" required onChange={(event) => setBlogCover(event.target.files[0])} accept=".webp , .jpg , .png, .jpeg" className="h-full absolute z-50 opacity-0" />
            </label>
          </div>
        </div>
          </div>
    
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={blogBody}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBlogBody(data);
          }}
        />
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            onClick={AddNewBlogHandler}
          >
            افزودن مقاله
          </Button>
        </div>
      </fieldset>
       {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست مقاله‌ها</h2>
            {Blogs.length > 1 ? (
              <DataGrid
                rows={Blogs.map((blog, index) => {
                  return { id: index + 1, ...blog };
                })}
                className="dark:text-white"
                rowHeight={150}
                getRowId={(blog) => blog._id}
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
       {/* Show Detail */}
       <DetailsModal>
       <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogBody) }} />
      </DetailsModal>
    </>
  )
}

export default Blogs
