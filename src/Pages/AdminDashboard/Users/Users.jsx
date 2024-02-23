import React, { useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { useShowLoading } from "../../../Contexts/ShowLoadingContext";
import { useShowRealtimeDatas } from "../../../Contexts/ShowRealtimeDatasContext";
import SkeletonLoading from "../../../Components/SkeletonLoading/SkeletonLoading";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import {
  Block,
  Edit,
  Email,
  Person,
  PhoneIphone,
  Visibility,
} from "@mui/icons-material";
import NoImg from "../../../assets/Images/CommentFormUser/none.png";
import Swal from "sweetalert2";
import useDelete from "../../../Hooks/useDelete";
import toast from "react-hot-toast";
import EditModal from "../../../Components/AdminDashboard/EditModal/EditModal";
import { useEditModal } from "../../../Contexts/EditModalContext";
import useTitle from "../../../Hooks/useTitle";
import Button from "../../../common/Form/Button";
import { useForm } from "react-hook-form";
import ApiRequest from "../../../Services/Axios/Configs/Config";
import EditUser from "./EditUser";

function Users() {
  const title = useTitle("کاربر‌ها - پنل کاربری");
  const { datas: users } = useFetch("users");
  const { isShowLoading, setIsShowLoading } = useShowLoading();
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas();
  const { showEditModal, setShowEditModal } = useEditModal();
  const [updateUserID, setUpdateUserID] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        FullName: "",
        UserName: "",
        MobilNumber: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
      },
    }
  );
  const AddNewUserHandler = (data) => {
    console.log(data);
    const newUserInfos = {
      name: data.FullName,
      username: data.UserName,
      phone: data.MobilNumber,
      email: data.Email,
      password: data.Password,
      confirmPassword: data.ConfirmPassword,
    };
    const ResponseResult = ApiRequest.post("auth/register", newUserInfos)
    .then(
      (response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("ثبت نام کاربر با موفقیت انجام گردید");
          setShowRealTimeDatas((prev) => !prev);
        }
      }
    );
    reset();
  };
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
            src={`${
              user.row.profile
                ? `../../../../Backend/public/courses/covers${user.row.profile}`
                : `${NoImg}`
            } `}
            className="size-12 rounded-full"
            alt="ghorbani-dev.ir"
          />
        );
      },
    },
    {
      field: "name",
      headerName: " نام کامل",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "نام کاربری",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: " تلفن تماس",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: " آدرس ایمیل ",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userRole",
      headerName: " نقش کاربری ",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          <span
            className={`${
              user.row.role === "ADMIN"
                ? "bg-emerald-100 text-primary p-2 rounded-lg"
                : "bg-gray-200 text-mainSlate px-3 py-2 rounded-lg"
            }`}
          >
            {user.row.role === "ADMIN" ? "مدیر" : "کاربر"}
          </span>
        );
      },
    },
    {
      field: "banAction",
      headerName: " مسدود سازی",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          <div
            onClick={() => {
              UserBanHandler(user.id);
            }}
            className="flex-center cursor-pointer text-pink-700 hover:text-pink-300 transition-colors"
          >
            <Block className="size-5" />
          </div>
        );
      },
    },
    {
      field: "editAction",
      headerName: "ویرایش",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          <div
            onClick={() => {
              setShowEditModal(true);
              setUpdateUserID(user.id);
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

  //Ban Function
  const UserBanHandler = (userID) => {
    Swal.fire({
      title: "برای مسدودسازی مطمعن هستید؟",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const ResponseResult = ApiRequest.put(`users/ban/${userID}`).then(
          (response) => {
            console.log(response.data);
            if (response.data.msg === "User banned successfully") {
              setShowRealTimeDatas((prev) => !prev);
              toast.success("مسدودسازی کاربر با موفقیت انجام شد");
            }
          }
        );
      }
    });
  };
  const UpdateUserHandler = (data) => {
    let updateUserInfos = {
      name: data.FullName,
      username: data.UserName,
      phone: data.PhoneNumber,
      email: data.Email,
      password: data.Password,
    };
    const ResponseResult = ApiRequest.put(
      `users/${updateUserID}`,
      updateUserInfos
    ).then((response) => {
      if (response.data) {
        setShowRealTimeDatas((prev) => !prev);
        setShowEditModal(false);
        toast.success("ویرایش کاربر با موفقیت انجام شد");
      }
    });
  };
  //  Delete Function
  const DeleteUserHandler = (userID) => {
    Swal.fire({
      title: "برای حذف کاربر مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const usrDel = useDelete(`users/${userID}`);
        setShowRealTimeDatas((prev) => !prev);
      }
    });
  };

  return (
    <>
      <fieldset className="border border-gray-200 rounded-lg p-3 mb-8">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن کاربر جدید
        </legend>
        <form onSubmit={handleSubmit(AddNewUserHandler)}>
          <div className="grid grid-cols-2 gap-5">
            {/* FullName */}
            <div>
              <div className="relative">
                <input
                  {...register("FullName", {
                    required: "وارد کردن نام و نام خانوادگی اجباری می باشد",
                    minLength: {
                      value: 5,
                      message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                    },
                    maxLength: {
                      value: 15,
                      message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                    },
                    pattern: {
                      value: /^[\u0600-\u06FF\s]+$/g,
                      message: "لطفا فقط حروف فارسی وارد نمایید",
                    },
                  })}
                  className={`${
                    errors.FullName && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder=" نام و نام خانوادگی*"
                />
                <Person className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.FullName && errors.FullName.message}
              </span>
            </div>
            {/* UserName */}
            <div>
              <div className="relative">
                <input
                  {...register("UserName", {
                    required: "وارد کردن نام کاربری اجباری می باشد",
                    minLength: {
                      value: 8,
                      message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                    },
                    maxLength: {
                      value: 15,
                      message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_-]{8,15}$/g,
                      message:
                        "نام کاربری معتبر نمی باشد کاراکترهای (a-zA-Z0-9_-) مجاز می باشند",
                    },
                  })}
                  className={`${
                    errors.UserName && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder=" نام کاربری*"
                />
                <Person className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.UserName && errors.UserName.message}
              </span>
            </div>
            {/* Email */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  {...register("Email", {
                    required: "وارد کردن ایمیل اجباری می باشد",
                    minLength: {
                      value: 5,
                      message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                    },
                    maxLength: {
                      value: 30,
                      message: "لطفا حداکثر ۲۰ کاراکتر وارد نمایید",
                    },
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g,
                      message: "لطفا ایمیل صحیح وارد نمایید",
                    },
                  })}
                  className={`${
                    errors.Email && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12 dir-ltr placeholder:text-right`}
                  placeholder="  *ایمیل"
                />
                <Email className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.Email && errors.Email.message}
              </span>
            </div>
            {/* MobileNumber */}
            <div>
              <div className="relative">
                <input
                  type="tel"
                  {...register("MobilNumber", {
                    required: "وارد کردن تلفن تماس اجباری می باشد",
                    minLength: {
                      value: 10,
                      message: "لطفا حداقل ۱۰ کاراکتر وارد نمایید",
                    },
                    maxLength: {
                      value: 11,
                      message: "لطفا حداکثر ۱۱ کاراکتر وارد نمایید",
                    },
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                      message: "لطفا فقط عدد انگلیسی وارد نمایید",
                    },
                  })}
                  className={`${
                    errors.MobilNumber && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12 placeholder:text-right`}
                  placeholder=" *تلفن تماس"
                />
                <PhoneIphone className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.MobilNumber && errors.MobilNumber.message}
              </span>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  {...register("Password", {
                    required: "وارد کردن کلمه عبور اجباری می باشد",
                    minLength: {
                      value: 8,
                      message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                    },
                    maxLength: {
                      value: 15,
                      message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
                      message: "کلمه عبور معتبر نمی باشد",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`${
                    errors.Password && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder="  کلمه عبور*"
                />
                <Visibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="left-3 sm:left-4 cursor-pointer"
                />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.Password && errors.Password.message}
              </span>
            </div>
            {/* Comfirm Password */}
            <div>
              <div className="relative">
                <input
                  {...register("ConfirmPassword", {
                    required: "وارد کردن تکرار کلمه عبور اجباری می باشد",
                    minLength: {
                      value: 8,
                      message: "لطفا حداقل ۸ کاراکتر وارد نمایید",
                    },
                    maxLength: {
                      value: 15,
                      message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
                      message: "کلمه عبور معتبر نمی باشد",
                    },
                    validate: (val) => {
                      if (watch("Password") != val) {
                        return "کلمه عبور با تکرار کلمه عبور مطابقت ندارد";
                      }
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`${
                    errors.Password && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder="  تکرار کلمه عبور*"
                />
                <Visibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="left-3 sm:left-4 cursor-pointer"
                />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.ConfirmPassword && errors.ConfirmPassword.message}
              </span>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Button
              btnType="submit"
              className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
              disabled={!formState.isValid}
            >
              افزودن کاربر
            </Button>
          </div>
        </form>
      </fieldset>

      {isShowLoading ? (
        <SkeletonLoading listsToRender={10} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست کاربر‌ها</h2>
            <div className="lg:max-w-[40rem] xl:max-w-full">
              {users.length > 0 ? (
                <DataGrid
                  rows={users.map((user, index) => {
                    return { id: index + 1, ...user };
                  })}
                  className="dark:text-white"
                  getRowId={(user) => user._id}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  localeText={
                    faIR.components.MuiDataGrid.defaultProps.localeText
                  }
                  pageSizeOptions={[5, 10, 25, 100, 200]}
                />
              ) : (
                <Alert severity="info">هیچ کاربری تاکنون ثبت نگردیده است</Alert>
              )}
            </div>
          </div>
        </>
      )}
      {/* Edit Modal */}
      <EditModal>
        <EditUser
          updateUserID={updateUserID}
          UpdateUserHandler={UpdateUserHandler}
        />
      </EditModal>
    </>
  );
}

export default Users;
