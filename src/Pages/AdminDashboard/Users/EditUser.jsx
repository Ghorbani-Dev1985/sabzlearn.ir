import { Email, Person, PhoneIphone, Visibility } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../common/Form/Button";
import useFetch from "../../../Hooks/useFetch";

const EditUser = ({ updateUserID, UpdateUserHandler }) => {
  const { datas: users } = useFetch("users");
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
  //Edit Function

  useEffect(() => {
    let filterUpdateUser = users.find((user) => user._id === updateUserID);
    if (filterUpdateUser) {
      reset({
        FullName: filterUpdateUser.name,
        UserName: filterUpdateUser.username,
        MobilNumber: filterUpdateUser.phone,
        Email: filterUpdateUser.email,
        Password: filterUpdateUser.password,
      });
    }
  }, [updateUserID]);
  return (
    <form onSubmit={handleSubmit(UpdateUserHandler)}>
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
      </div>
      <div className="flex justify-end items-center">
        <Button
          btnType="submit"
          className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
          disabled={!formState.isValid}
        >
          ویرایش کاربر
        </Button>
      </div>
    </form>
  );
};

export default EditUser;
