import React, { useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import SkeletonLoading from "../../../Components/SkeletonLoading/SkeletonLoading";
import { useShowLoading } from "../../../Contexts/ShowLoadingContext";
import { useShowRealtimeDatas } from "../../../Contexts/ShowRealtimeDatasContext";
import { useEditModal } from "../../../Contexts/EditModalContext";
import { Alert } from "@mui/material";
import { DataGrid, faIR } from "@mui/x-data-grid";
import {
  AttachMoneyOutlined,
  AutorenewOutlined,
  CloudUploadOutlined,
  DescriptionOutlined,
  Edit,
  FolderOpenOutlined,
  HeadsetMicOutlined,
  InsertLinkOutlined,
} from "@mui/icons-material";
import useTitle from "../../../Hooks/useTitle";
import Swal from "sweetalert2";
import useDelete from "../../../Hooks/useDelete";
import Button from "../../../common/Form/Button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import usePost from "../../../Hooks/usePost";
import axios from "axios";
import { BaseURL } from "../../../Utils/Utils";
import toast from "react-hot-toast";

function Courses() {
  const title = useTitle("دوره‌ها - پنل کاربری")
  const { datas: courses } = useFetch("courses", true)
  const { datas: categories } = useFetch("category", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const [updateUserID, setUpdateUserID] = useState("")
  const [courseName, setCourseName] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [courseShortName, setCourseShortName] = useState("")
  const [courseCategoryID, setCourseCategoryID] = useState("-1")
  const [isCompleteCourse, setIsCompleteCourse] = useState(0)
  const [coursePrice, setCoursePrice] = useState("")
  const [courseSupport, setCourseSupport] = useState("")
  const [courseStatus, setCourseStatus] = useState("start")
  const [courseCover, setCourseCover] = useState({})
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
      renderCell: (user) => {
        return (
          <img
            src={`http://localhost:5000/courses/covers/${user.row.cover}`}
            className="object-fill"
            alt="ghorbani-dev.ir"
          />
        );
      },
    },
    {
      field: "name",
      headerName: " عنوان",
      width: 180,
      headerAlign: "center",
      align: "center",
      whiteSpace: "wrap",
    },
    {
      field: "creator",
      headerName: " مدرس",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "prices",
      headerName: " مبلغ (تومان)",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return user.row.price ? (
          user.row.price.toLocaleString()
        ) : (
          <span>رایگان</span>
        );
      },
    },
    {
      field: "registers",
      headerName: " تعداد ثبت نام  ",
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "showStatus",
      headerName: " وضعیت ",
      width: 120,
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
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: " دسته بندی ",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return user.row.categoryID.title;
      },
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (course) => {
        return (
          <div
            onClick={() => {
              DeleteCourseHandler(course.id);
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
  //  Delete Function
  const DeleteCourseHandler = (courseID) => {
    Swal.fire({
      title: "برای حذف دوره مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const courseDel = useDelete(`courses/${courseID}`);
        setShowRealTimeDatas((prev) => !prev)
      }
    });
  };

  //Add New Function
  const AddNewCourseHandler = (event) => {
    event.preventDefault()
    let newCourseFormData = new FormData()
    newCourseFormData.append('name' , courseName)
    newCourseFormData.append('description' , courseDescription)
    newCourseFormData.append('shortName' , courseShortName)
    newCourseFormData.append('categoryID' , courseCategoryID)
    newCourseFormData.append('isComplete' , +isCompleteCourse)
    newCourseFormData.append('price' , +coursePrice)
    newCourseFormData.append('support' , courseSupport)
    newCourseFormData.append('status' , courseStatus)
    newCourseFormData.append('cover' , courseCover)

     if(courseName && courseDescription && courseShortName && courseCategoryID && coursePrice && courseSupport && courseCover.name){
       axios.post(`${BaseURL}courses` , newCourseFormData, {
         headers : {
           'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
         }
       })
       .then(response => {
         console.log(response)
         if(response.status === 201){
           
           toast.success("  افزودن دوره با موفقیت انجام شد")
           setCourseName('')
           setCourseCategoryID('-1')
           setCourseShortName('')
           setCoursePrice('')
           setCourseSupport('')
           setCourseStatus('')
           setCourseCover('')
           setCourseDescription('')
           setShowRealTimeDatas((prev) => !prev)
         }else{
           toast.error("افزودن دوره انجام نشد");
         }
       })
       .catch(error => {
           console.log(error)
           toast.error('خطا در اتصال به سرور')
          })
        }else if(courseName.length <=2 && courseShortName.length <=2 && courseSupport.length <=1){
          toast.error('تعداد کاراکترها کمتر از حد مجاز می باشد')
        }else{
          toast.error('عکس دوره را آپلود نمایید')
        }
  };
  
  return (
    <>
      
         <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن دوره جدید
        </legend>
        <div className="flex flex-wrap justify-between gap-5 md:child:w-30p lg:child:w-48p">
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder="نام  *"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
            <FolderOpenOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative">
            <select
              value={courseCategoryID}
              onChange={(event) => setCourseCategoryID(event.target.value)}
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={'-1'} defaultValue={'-1'} disabled>انتخاب دسته بندی دوره</option>
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
          </div>
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder=" لینک *"
              value={courseShortName}
              onChange={(event) => setCourseShortName(event.target.value)}
            />
            <InsertLinkOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative">
            <input
              type="number"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder=" مبلغ *"
              value={coursePrice}
              onChange={(event) => setCoursePrice(event.target.value)}
            />
            <AttachMoneyOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative mt-11">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder=" پشتیبانی *"
              value={courseSupport}
              onChange={(event) => setCourseSupport(event.target.value)}
            />
            <HeadsetMicOutlined className="left-3 sm:left-4" />
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              وضعیت دوره
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Start"
                    type="radio"
                    value="start"
                    onChange={(event) => setCourseStatus(event.target.value)}
                    hidden
                    name="list-radio"
                    className="peer"
                  />
                  <label
                    htmlFor="Start"
                    className="w-full cursor-pointer peer-checked:text-primary peer-checked:font-DanaBold py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    در حال برگزاری
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Presell"
                    type="radio"
                    value="Presell"
                    onChange={(event) => setCourseStatus(event.target.value)}
                    name="list-radio"
                    hidden
                    className="peer "
                  />
                  <label
                    htmlFor="Presell"
                    className="w-full cursor-pointer py-3 peer-checked:text-primary peer-checked:font-DanaBold ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    پیش فروش
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-center w-full max-w-xl mx-auto my-7">
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
               <span className="text-mainSlate dark:text-white my-3">{courseCover.name}</span> 
              </div>
              <input id="CoverUpload" type="file" required onChange={(event) => setCourseCover(event.target.files[0])} accept=".webp , .jpg , .png, .jpeg" className="h-full absolute z-50 opacity-0" />
            </label>
          </div>
        </div>

        <CKEditor
          width= "500px"
          editor={ClassicEditor}
          data={courseDescription}
          onChange={(event, editor) => {
            const data = editor.getData();
            setCourseDescription(data);
          }}
        />
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            onClick={AddNewCourseHandler}
          >
            افزودن دوره
          </Button>
        </div>
      </fieldset>
     
      {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست کاربر‌ها</h2>
            <div className='lg:max-w-[40rem] xl:max-w-full'>
            {courses.length > 0 ? (
              <DataGrid
                rows={courses.map((course, index) => {
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
              <Alert severity="info">هیچ دوره ای تاکنون ثبت نگردیده است</Alert>
            )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Courses;
