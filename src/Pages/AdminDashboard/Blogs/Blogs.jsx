import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import { useShowRealtimeDatas } from '../../../Contexts/ShowRealtimeDatasContext'
import { useEditModal } from '../../../Contexts/EditModalContext'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import useTitle from '../../../Hooks/useTitle'
import { RemoveRedEye } from '@mui/icons-material'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { DataGrid , faIR} from '@mui/x-data-grid'
import { Alert } from '@mui/material'
import DetailsModal from '../../../Components/AdminDashboard/DetailsModal/DetailsModal'


function Blogs() {
  const title = useTitle("مقاله‌ها - پنل کاربری")
  const { datas: Blogs } = useFetch("articles", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
  const [blogBody , setBlogBody] = useState('')
  console.log(Blogs)
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
      headerName: " توصیحات",
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
  return (
    <>
       {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست کاربر‌ها</h2>
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
              <Alert severity="info">هیچ پیامی تاکنون ثبت نگردیده است</Alert>
            )}
          </div>
        </>
      )}
       {/* Show Detail */}
       <DetailsModal>
       <div dangerouslySetInnerHTML={{ __html: blogBody }} />
      </DetailsModal>
    </>
  )
}

export default Blogs
