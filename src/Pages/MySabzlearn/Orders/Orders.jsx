import React from 'react'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import useTitle from '../../../Hooks/useTitle'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { DataGrid , faIR} from '@mui/x-data-grid'
import useFetch from '../../../Hooks/useFetch'
import { Alert } from '@mui/material'


function Orders() {
  const title = useTitle("دوره‌های من - سبزلرن ")
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const {datas : Courses} = useFetch('orders' , true)
  console.log(Courses)
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
        field: "courseStatus",
        headerName: " وضعیت برگزاری ",
        width: 180,
        headerAlign: "center",
        align: "center",
        renderCell: (course) => {
          return (
            course.row.course.status === "start" ? ' در حال برگزاری' : 'پیش فروش'
          );
        },
      },
      {
        field: "courseIsComplete",
        headerName: " وضعیت ضبط ",
        width: 180,
        headerAlign: "center",
        align: "center",
        renderCell: (course) => {
          return (
            course.row.course.isComplete === 1 ? <span className='bg-emerald-50 text-primary p-1 rounded-lg font-DanaBold'>تکمیل شده</span> : <span className='bg-amber-50 text-amber-600 p-1 rounded-lg'>در حال ضبط</span>
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
            <h2 className="font-DanaBold my-8 text-2xl">لیست دوره ها</h2>
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
                    paginationModel: { page: 0, pageSize: 25 },
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
    </>
  )
}

export default Orders
