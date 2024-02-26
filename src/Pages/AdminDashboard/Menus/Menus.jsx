import React, { useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useShowLoading } from '../../../Contexts/ShowLoadingContext'
import { useShowRealtimeDatas } from '../../../Contexts/ShowRealtimeDatasContext'
import { useEditModal } from '../../../Contexts/EditModalContext'
import { useDetailsModal } from '../../../Contexts/DetailsModalContext'
import useTitle from '../../../Hooks/useTitle'
import { FolderOpenOutlined, GppGood, InsertLinkOutlined } from '@mui/icons-material'
import SkeletonLoading from '../../../Components/SkeletonLoading/SkeletonLoading'
import { DataGrid , faIR} from '@mui/x-data-grid'
import { Alert } from '@mui/material'
import useDelete from '../../../Hooks/useDelete'
import Swal from 'sweetalert2'
import Button from '../../../common/Form/Button'
import axios from 'axios'
import { BaseURL } from '../../../Utils/Utils'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import ApiRequest from '../../../Services/Axios/Configs/Config'





function Menus() {
  const title = useTitle("منو‌ها - پنل کاربری")
  const { datas: Menus } = useFetch("menus/all")
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal()
  const [menuTitle, setMenuTitle] = useState("")
  const [menuHref, setMenuHref] = useState("")
  const [menuParentID, setMenuParentID] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    isDirty,
    isValid,
    watch,
    control,
    setValue,
    formState,
  } = useForm(
    {
      mode: "all",
    },
    {
      defaultValues: {
        MenuTitle: "",
        MenuHref: "",
      },
    }
  )

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
      field: "href",
      headerName: " لینک ",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "parentMenu",
      headerName: "   نام منوی اصلی",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (menu) => {
        return (
          menu.row.parent ? menu.row.parent.title : <GppGood className='text-primary'/>
          );
      },
    },
    {
      field: "parentMenuLink",
      headerName: "   لینک منوی اصلی",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (menu) => {
        return (
          menu.row.parent ? menu.row.parent.href : <GppGood className='text-primary'/>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (menu) => {
        return (
          <div
            onClick={() => {
              DeleteMenuHandler(menu.id);
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
     const AddNewMenuHandler = (data) => {
      console.log(data)
      let addNewMenuInfos = {
        title : data.MenuTitle,
        href: data.MenuHref,
        parent: menuParentID === '' ? undefined : data.MenuParentID ,
      }
   
      const ResponseResult = ApiRequest.post("menus", addNewMenuInfos)
         .then(response => {
           console.log(response)
           if(response.status === 201){
             toast.success("افزودن منو با موفقیت انجام شد")
             setShowRealTimeDatas((prev) => !prev)
           }else{
             toast.error("افزودن منو انجام نشد");
           }
         })
      reset()
     }
     //Delete Function
     const DeleteMenuHandler = (menuID) =>{
      Swal.fire({
          title: "برای حذف منو مطمعن هستید؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f43f5e",
          cancelButtonColor: "#0ea5e9",
          confirmButtonText: "تایید",
          cancelButtonText: "انصراف",
        }).then((result) => {
          if (result.isConfirmed) {
            const menuDel = useDelete(`menus/${menuID}`);
            setShowRealTimeDatas((prev) => !prev)
          }
        });
    }
  return (
    <>
     <fieldset className="border border-gray-200 rounded-lg p-3 mb-8">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن منوی جدید
        </legend>
        <form onSubmit={handleSubmit(AddNewMenuHandler)}>
        <div className="grid grid-cols-2 gap-5">
          {/* MenuTitle */}
          <div>
          <div className="relative">
            <input
              type="text"
              {...register("MenuTitle", {
                required: "وارد کردن عنوان مقاله اجباری می باشد",
                minLength: {
                  value: 5,
                  message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                },
                maxLength: {
                  value: 15,
                  message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                },
              })}
              className={`${
                errors.MenuTitle && "border border-rose-500"
              } outline-none pl-9 sm:pl-12`}
              placeholder=" عنوان *"
            />
            <FolderOpenOutlined className="left-3 sm:left-4" />
          </div>
          <span className="block text-rose-500 text-sm my-2">
                {errors.MenuTitle && errors.MenuTitle.message}
              </span>
          </div>
           <div>
          <div className="relative">
            <input
              type="text"
              {...register("MenuHref", {
                required: "وارد کردن لینک منو اجباری می باشد",
                minLength: {
                  value: 3,
                  message: "لطفا حداقل 3 کاراکتر وارد نمایید",
                },
                maxLength: {
                  value: 15,
                  message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,15}$/g,
                  message:
                    "لینک منو  معتبر نمی باشد کاراکترهای (a-zA-Z0-9_) مجاز می باشند",
                },
              })}
              className={`${
                errors.MenuHref && "border border-rose-500"
              } outline-none pl-9 sm:pl-12`}
              placeholder=" لینک *"
            />
            <InsertLinkOutlined className="left-3 sm:left-4" />
          </div>
          <span className="block text-rose-500 text-sm my-2">
                {errors.MenuHref && errors.MenuHref.message}
              </span>
           </div>
           <div className="relative">
            <select
               value={menuParentID}
              onChange={(event) =>
                setMenuParentID(event.target.value)
              }
              defaultValue=""
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>انتخاب منوی اصلی</option>
              {
                Menus.map((menu) => {
                 return(  
                    <React.Fragment key={menu._id}>
                      !Boolean(menu.parent) && (<option value={menu._id}>{menu.title}</option>)
                    </React.Fragment>            
                 )
              })}
            </select>
          </div>
        
        </div>
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={!formState.isValid}
          >
            افزودن منو
          </Button>
        </div>
        </form>
      </fieldset>
       {isShowLoading ? (
        <SkeletonLoading listsToRender={25} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست منوها</h2>
            <div className='lg:max-w-[40rem] xl:max-w-full'>
            {Menus.length > 0 ? (
              <DataGrid
                rows={Menus.map((menu, index) => {
                  return { id: index + 1, ...menu };
                })}
                className="dark:text-white"
                rowHeight={150}
                getRowId={(menu) => menu._id}
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
              <Alert severity="info">هیچ منویی  تاکنون ثبت نگردیده است</Alert>
            )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Menus
