import React, { useState } from "react";
import useTitle from "../../../Hooks/useTitle";
import useFetch from "../../../Hooks/useFetch";
import { useShowLoading } from "../../../Contexts/ShowLoadingContext";
import { useShowRealtimeDatas } from "../../../Contexts/ShowRealtimeDatasContext";
import { useEditModal } from "../../../Contexts/EditModalContext";
import { FolderCopyOutlined, LocalOffer } from "@mui/icons-material";
import SkeletonLoading from "../../../Components/SkeletonLoading/SkeletonLoading";
import { DataGrid , faIR} from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";
import Button from "../../../common/Form/Button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ApiRequest from "../../../Services/Axios/Configs/Config";


function Discounts() {
  const title = useTitle(" کدهای تخفیف - پنل کاربری");
  const { datas: Discounts } = useFetch("offs", true)
  const { datas: Courses } = useFetch("courses", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
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
        DiscountCode: "",
        DiscountPercent: "",
        BlogSummery: "",
        BlogCategoryID: "",
        BlogCover: "",
        BlogBody: ""
      },
    }
  );

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
      field: "creator",
      headerName: " تعریف توسط",
      width: 200,
      height: 150,
      headerAlign: "center",
      align: "center",
      whiteSpace: "wrap",
    },
    {
      field: "code",
      headerName: " کد تخفیف",
      width: 200,
      height: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "percent",
      headerName: " درصد",
      width: 200,
      height: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "max",
      headerName: " حداکثر استفاده",
      width: 130,
      height: 150,
      headerAlign: "center",
      align: "center",
    },  
    {
      field: "uses",
      headerName: " تعداد استفاده",
      width: 130,
      height: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (discount) => {
        return (
          <div
            onClick={() => {
              DeleteDiscountHandler(discount.id);
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
    const DeleteDiscountHandler = (discountID) => {
        Swal.fire({
          title: "برای حذف کد تخفیف مطمعن هستید؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f43f5e",
          cancelButtonColor: "#0ea5e9",
          confirmButtonText: "تایید",
          cancelButtonText: "انصراف",
        }).then((result) => {
          if (result.isConfirmed) {
            const ResponseResult = ApiRequest.delete(`offs/${discountID}`)
            .then((response) => {
              if(response.status === 200){
                toast.success("حذف کد تخفیف با موفقیت انجام گردید");
                setShowRealTimeDatas((prev) => !prev);
              }
            })
          }
        });
      };
      //New Function
      const AddNewDiscountHandler = (data) => {
        let newDiscountInfos = {
          code: data.DiscountCode,
          percent: data.DiscountPercent,
          course: data.DiscountCourseID,
          max: data.DiscountMaxUse,
          }
          const ResponseResult = ApiRequest.post("offs", newDiscountInfos)
          .then((response) => {
              if (response.status === 201) {
                setShowRealTimeDatas((prev) => !prev);
                toast.success(" کد تخفیف جدید با موفقیت انجام گردید");
              }
            }
          )
         reset() 
      }

  return (
    <>
    <fieldset className="border border-gray-200 rounded-lg p-3 mb-8">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن کد تخفیف جدید
        </legend>
        <form onSubmit={handleSubmit(AddNewDiscountHandler)}>
        <div className="grid grid-cols-2 gap-5">
        <div>
              <div className="relative">
                <input
                  type="text"
                  {...register("DiscountCode", {
                    required: "وارد کردن کد تخفیف اجباری می باشد",
                    minLength: {
                      value: 2,
                      message: "لطفا حداقل 2 کاراکتر وارد نمایید",
                    },
                    maxLength: {
                      value: 15,
                      message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                    },
                  })}
                  className={`${
                    errors.DiscountCode && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder="  کد تخفیف*"
                />
                <FolderCopyOutlined className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.DiscountCode && errors.DiscountCode.message}
              </span>
            </div>
            <div>
              <div className="relative">
                <input
                  type="number"
                  {...register("DiscountPercent", {
                    required: "وارد کردن عنوان مقاله اجباری می باشد",
                    maxLength: {
                      value: 2,
                      message: " لطفا حداکثر 2 کاراکتر وارد نمایید",
                    },
                  })}
                  className={`${
                    errors.DiscountPercent && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder="  درصد تخفیف*"
                />
                <LocalOffer className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.DiscountPercent && errors.DiscountPercent.message}
              </span>
            </div>
          <div>
          <div className="relative">
            <select
            {...register("BlogCategoryID", {
              required: " انتخاب دوره اجباری می باشد",
            })}
            onChange={(event) => setValue("DiscountCourseID" , event.target.value)}
               defaultValue=""
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>انتخاب دوره</option>
              {Courses.map(({ _id, name }) => {
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
          <span className="block text-rose-500 text-sm my-2">
                {errors.DiscountCourseID && errors.DiscountCourseID.message}
              </span>
          </div>
          <div>
              <div className="relative">
                <input
                  type="number"
                  {...register("DiscountMaxUse", {
                    required: "وارد کردن تعداد استفاده اجباری می باشد",
                    maxLength: {
                      value: 2,
                      message: " لطفا حداکثر 2 کاراکتر وارد نمایید",
                    },
                  })}
                  className={`${
                    errors.DiscountMaxUse && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder="  تعداد استفاده*"
                />
                <LocalOffer className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.DiscountMaxUse && errors.DiscountMaxUse.message}
              </span>
            </div>
         </div>
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg select-none rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={!formState.isValid}
          >
            افزودن کد تخفیف 
          </Button>
        </div>
        </form>
      </fieldset>
      {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست کدهای تخفیف</h2>
            <div className="lg:max-w-[40rem] xl:max-w-full">
            {Discounts.length > 0 ? (
              <DataGrid
                rows={Discounts.map((category, index) => {
                  return { id: index + 1, ...category };
                })}
                className="dark:text-white"
                getRowId={(category) => category._id}
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
              <Alert severity="info">هیچ کد تخفیفی تاکنون ثبت نگردیده است</Alert>
            )}
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default Discounts;
