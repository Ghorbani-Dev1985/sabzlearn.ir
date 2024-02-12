import React, { useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { useShowLoading } from "../../../Contexts/ShowLoadingContext";
import { useShowRealtimeDatas } from "../../../Contexts/ShowRealtimeDatasContext";
import SkeletonLoading from "../../../Components/SkeletonLoading/SkeletonLoading";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Alert, Button } from "@mui/material";
import {
  AccountCircle,
  Block,
  DeleteOutlineOutlined,
  Edit,
  KeyOutlined,
  LocalPostOfficeOutlined,
  Person,
  PhoneIphoneOutlined,
} from "@mui/icons-material";
import NoImg from "../../../assets/Images/CommentFormUser/none.png";
import Swal from "sweetalert2";
import useDelete from "../../../Hooks/useDelete";
import usePut from "../../../Hooks/usePut";
import Input from "../../../common/Form/Input";
import {
  RequiredValidator,
  MinValidator,
  MaxValidator,
  EmailValidator,
  PhoneValidator,
} from "../../../Validators/Rules";
import useForm from "../../../Hooks/useForm";
import toast from "react-hot-toast";
import axios from "axios";
import { BaseURL } from "../../../Utils/Utils";
import EditModal from "../../../Components/AdminDashboard/EditModal/EditModal";
import { useEditModal } from "../../../Contexts/EditModalContext";
import useUpdate from "../../../Hooks/useUpdate";
import useTitle from "../../../Hooks/useTitle";

function Users() {
  const title = useTitle('کاربر‌ها - پنل کاربری')
  const { datas: users } = useFetch("users", true)
  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas()
  const { showEditModal, setShowEditModal } = useEditModal()
  const [updateUserID, setUpdateUserID] = useState("")
  const [fullName , setFullName] = useState('')
  const [username , setUserName] = useState('')
  const [phoneNumber , setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [formState, onInputHandler] = useForm(
    {
      FullName: {
        value: "",
        isValid: false,
      },
      UserName: {
        value: "",
        isValid: false,
      },
      Email: {
        value: "",
        isValid: false,
      },
      PhoneNumber: {
        value: "",
        isValid: false,
      },
      Password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const AddNewUserHandler = (event) => {
    event.preventDefault();
    const newUserInfos = JSON.stringify({
      name: formState.inputs.FullName.value,
      username: formState.inputs.UserName.value,
      phone: formState.inputs.PhoneNumber.value,
      email: formState.inputs.Email.value,
      password: formState.inputs.Password.value,
      confirmPassword: formState.inputs.Password.value,
    });
    axios
      .post(`${BaseURL}auth/register`, newUserInfos, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("ثبت نام با موفقیت انجام گردید");
          setShowRealTimeDatas((prev) => !prev);
        } else {
          toast.error("ثبت نام انجام نشد");
        }
      })
      .catch((error) => {
        toast.error("این شماره مسدود شده است");
      });
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
        const usrBan = usePut(`users/ban/${userID}`);
        setShowRealTimeDatas((prev) => !prev);
      }
    });
  };
  //Edit Function
  const UpdateUserHandler = (userID) => {
    console.log(userID)
    let updateUserInfos = JSON.stringify({
      name: formState.inputs.FullName.value,
      username: formState.inputs.UserName.value,
      phone: formState.inputs.PhoneNumber.value,
      email: formState.inputs.Email.value,
      password: formState.inputs.Password.value,
    })
    const updateUser = useUpdate(`users/${userID}` , updateUserInfos ) 
  };
  //  Delete Function
  const DeleteUserHandler = (userID) => {
    console.log(userID);
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
  useEffect(() => {
    console.log(users)
    let filterUpdateUser = users.find((user) => user._id === updateUserID)
    console.log(filterUpdateUser)
    if (filterUpdateUser) {
      setFullName(filterUpdateUser.name)
      setUserName(filterUpdateUser.username)
      setPhoneNumber(filterUpdateUser.phone)
      setEmail(filterUpdateUser.email)
      setPassword(filterUpdateUser.password)
    }
  }, [updateUserID]);
  return (
    <>
      <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن کاربر جدید
        </legend>
        <div className="flex flex-wrap justify-between gap-5 child:w-48p">
          <Input
            id="FullName"
            element="input"
            placeholder="نام کامل"
            icon={<Person className="left-3 sm:left-4" />}
            validations={[
              RequiredValidator(),
              MinValidator(8),
              MaxValidator(20),
            ]}
            onInputHandler={onInputHandler}
          />
          <Input
            id="UserName"
            element="input"
            placeholder="نام کاربری"
            icon={<AccountCircle className="left-3 sm:left-4" />}
            validations={[
              RequiredValidator(),
              MinValidator(8),
              MaxValidator(20),
            ]}
            onInputHandler={onInputHandler}
          />
          <Input
            id="Email"
            element="input"
            placeholder=" ایمیل"
            icon={<LocalPostOfficeOutlined className="left-3 sm:left-4" />}
            validations={[
              RequiredValidator(),
              MinValidator(8),
              MaxValidator(20),
              EmailValidator(),
            ]}
            onInputHandler={onInputHandler}
          />
          <Input
            id="PhoneNumber"
            element="input"
            type="number"
            placeholder=" تلفن تماس"
            icon={<PhoneIphoneOutlined className="left-3 sm:left-4" />}
            validations={[
              RequiredValidator(),
              MinValidator(8),
              MaxValidator(20),
              PhoneValidator(),
            ]}
            onInputHandler={onInputHandler}
          />
          <Input
            id="Password"
            element="input"
            placeholder="  کلمه عبور"
            icon={<KeyOutlined className="left-3 sm:left-4" />}
            validations={[
              RequiredValidator(),
              MinValidator(8),
              MaxValidator(20),
            ]}
            onInputHandler={onInputHandler}
          />
        </div>
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={!formState.isFormValid}
            onClick={AddNewUserHandler}
          >
            افزودن کاربر
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
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
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
        <div className="flex flex-wrap justify-between gap-5 child:w-48p">
        <div className="relative">
          <input
              type='text'
              className= 'outline-none pl-9 sm:pl-12'
              placeholder='نام کامل'
              value={fullName}
              onChange={(event) =>setFullName(event.target.value)}
              />
          <Person className="left-3 sm:left-4" />
          </div>
          <div className="relative">
          <input
              type='text'
              className= 'outline-none pl-9 sm:pl-12'
              placeholder='نام کاربری'
              value={username}
              onChange={(event) =>setUserName(event.target.value)}
              />
          <AccountCircle className="left-3 sm:left-4" />
          </div>
          <div className="relative">
          <input
              type='text'
              className= 'outline-none pl-9 sm:pl-12'
              placeholder=' تلفن تماس'
              value={phoneNumber}
              onChange={(event) =>setPhoneNumber(event.target.value)}
              />
          <PhoneIphoneOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative">
          <input
              type='text'
              className= 'outline-none pl-9 sm:pl-12'
              placeholder=' ایمیل'
              value={email}
              onChange={(event) =>setEmail(event.target.value)}
              />
          <LocalPostOfficeOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative">
          <input
              type='text'
              className= 'outline-none pl-9 sm:pl-12'
              placeholder=' کلمه عیور'
              value={password}
              onChange={(event) =>setPassword(event.target.value)}
              />
          <LocalPostOfficeOutlined className="left-3 sm:left-4" />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            onClick={UpdateUserHandler}
          >
            ویرایش کاربر
          </Button>
        </div>
      </EditModal>
    </>
  );
}

export default Users;
