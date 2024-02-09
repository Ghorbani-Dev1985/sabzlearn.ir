import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch';
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading';
import { useShowLoading } from '../../../Contexts/ShowLoadingContext';
import { useShowRealtimeDatas } from '../../../Contexts/ShowRealtimeDatasContext';
import { useEditModal } from '../../../Contexts/EditModalContext';
import { Alert } from '@mui/material';
import { DataGrid , faIR} from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import useTitle from '../../../Hooks/useTitle';


function Courses() {
  const title = useTitle('دوره‌ها - پنل کاربری')
  const { datas: courses } = useFetch("courses", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const [updateUserID, setUpdateUserID] = useState("")
  console.log(courses)
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
      field: "photo",
      headerName: " عکس ",
      width: 70,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          <img
            src={`${
              user.row.cover
                ? `../../../../Backend/public/courses/covers${user.row.cover}`
                : `${NoImg}`
            } `}
            className=""
            alt="ghorbani-dev.ir"
          />
        );
      },
    },
    {
      field: "name",
      headerName: " عنوان",
      width: 180,
      height: 150,
      headerAlign: "center",
      align: "center",
      whiteSpace: "wrap",
    },
    {
      field: "creator",
      headerName: " مدرس",
      width: 180,
      height: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "prices",
      headerName: " مبلغ (تومان)",
      width: 100,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          user.row.price ? 
          user.row.price.toLocaleString()
          :
          <span>رایگان</span>
        );
      },
    },
    {
      field: "registers",
      headerName: " تعداد ثبت نام  ",
      width: 110,
      height: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "showStatus",
      headerName: " وضعیت ",
      width: 120,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          <span
            className={`${
              user.row.isComplete 
                ? "bg-emerald-100 text-primary p-1 rounded-lg"
                : "bg-gray-200 text-mainSlate p-1 rounded-lg"
            }`}
          >
            {user.row.isComplete ? "ضبط شده" : "در حال ضبط"}
          </span>
        );
      },
    },
    {
      field: "shortName",
      headerName: " لینک ",
      width: 110,
      height: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: " دسته بندی ",
      width: 120,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          user.row.categoryID.title
        );
      },
    },
    {
      field: "editAction",
      headerName: "ویرایش",
      width: 70,
      height: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true);
              UpdateUserHandler(user.id);
              setUpdateUserID(user.id)
            }}
            className="flex-center cursor-pointer text-sky-500 hover:text-sky-300 transition-colors"
          >
            <Edit className="size-5" />
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
      renderCell: (user) => {
        return (
          <div
            onClick={() => {
              DeleteUserHandler(user.id);
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
            {courses.length > 1 ? (
              <DataGrid
                rows={courses.map((course, index) => {
                  return { id: index + 1, ...course };
                })}
                className="dark:text-white"
                getRowId={(course) => course._id}
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
              <Alert severity="info">هیچ  دوره ای تاکنون ثبت نگردیده است</Alert>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Courses
