import React, { useState } from 'react'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import useTitle from '../../../Hooks/useTitle'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { DataGrid , faIR} from '@mui/x-data-grid'
import useFetch from '../../../Hooks/useFetch'
import { Alert } from '@mui/material'
import { RemoveRedEye } from '@mui/icons-material'
import DetailsModal from '../../../Components/AdminDashboard/DetailsModal/DetailsModal'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'


function Orders() {
  const title = useTitle("دوره‌های من - سبزلرن ")
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const {datas : Courses} = useFetch('orders' , true)
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
  const [courseID , setCourseID] = useState('')
  const {datas : OneCourse} = useFetch(`orders/${courseID}` , true)
    console.log(OneCourse)
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
        renderCell: (course) => {
          return (
            <img
              src={`http://localhost:5000/courses/covers/${course.row.course.cover}`}
              className="object-fill"
              alt="ghorbani-dev.ir"
            />
          );
        },
      },
      {
        field: "courseTitle",
        headerName: " عنوان ",
        width: 180,
        headerAlign: "center",
        align: "center",
        renderCell: (course) => {
          return (
            course.row.course.name
          );
        },
      },
      {
        field: "showDetails",
        headerName: "  جزییات ",
        width: 140,
        headerAlign: "center",
        align: "center",
        renderCell: (course) => {
          return (
            <p onClick={() => {
                setShowDetailsModal(true)
                setCourseID(course.id)
                
            }} className='bg-amber-100 p-2 rounded-full cursor-pointer hover:bg-amber-200 transition-colors'>
                <RemoveRedEye className="size-6 text-amber-500"/>
               
            </p>
            
          );
        },
      },
      {
        field: "coursePrice",
        headerName: " قیمت(تومان) ",
        width: 180,
        headerAlign: "center",
        align: "center",
        renderCell: (course) => {
          return (
            <div className='flex flex-col items-center gap-5'>
            <p className='opacity-60 line-through'>{course.row.price !== course.row.course.price ? course.row.course.price.toLocaleString() : ''}</p>
            <p className='text-primary font-DanaBold'>{course.row.course.price === 0 ? 'رایگان' :  course.row.price.toLocaleString()}</p>
            </div>
          );
        },
      },
      {
        field: "courseDiscount",
        headerName: " میزان تخفیف(تومان) ",
        width: 180,
        headerAlign: "center",
        align: "center",
        renderCell: (course) => {
          return (
            course.row.course.price === course.row.price ? 'ندارد' : <span className='font-DanaBold'>{(course.row.course.price - course.row.price).toLocaleString()} -</span>
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
            <h2 className="font-DanaBold my-8 text-2xl">لیست دوره های خریداری شده</h2>
            <div className='lg:max-w-[40rem] xl:max-w-full'>
            {Courses.length > 0 ? (
              <DataGrid
                rows={Courses.map((course, index) => {
                  return { id: index + 1, ...course };
                })}
                className="dark:text-white"
                rowHeight={150}
                getRowId={(course) => course._id}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
                pageSizeOptions={[5, 10, 25, 100, 200]}
              />
            ) : (
              <Alert severity="info">هیچ دوره ای تاکنون اضافه نگردیده است</Alert>
            )}
            </div>
          </div>
        </>
      )}
        {/* Show Detail */}
        <DetailsModal>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className='text-center'>
                <th scope="col" className="px-6 py-3">
                    وضعیت ضبط
                </th>
                <th scope="col" className="px-6 py-3">
                    وضعیت برگزاری
                </th>
                <th scope="col" className="px-6 py-3">
                    نوع پشتیبانی
                </th>
                <th scope="col" className="px-6 py-3">
                    لینک
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {OneCourse && OneCourse[0].course.isComplete === 1 ? <span className='bg-emerald-50 text-primary p-1 rounded-lg font-DanaBold'>تکمیل شده</span> : <span className='bg-amber-50 text-amber-600 p-1 rounded-lg'>در حال ضبط</span>}
                </th>
                <td className="px-6 py-4">
                {OneCourse && OneCourse[0].course.status === "start" ? 'درحال برگزاری' : 'پیش فروش'}
                </td>
                <td className="px-6 py-4">
                  {OneCourse && OneCourse[0].course.support}
                </td>
                <td className="px-6 py-4">
                {OneCourse && OneCourse[0].course.shortName}
                </td>
            </tr>
          
        </tbody>
    </table>
</div>
      </DetailsModal>
    </>
  )
}

export default Orders
