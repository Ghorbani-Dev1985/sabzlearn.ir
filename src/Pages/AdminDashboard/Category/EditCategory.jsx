import { FolderCopyOutlined, InsertLinkOutlined } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import Button from '../../../common/Form/Button';
import useFetch from '../../../Hooks/useFetch';



const EditCategory = ({updateCategoryID , UpdateCategoryHandler}) => {
    const { datas: categories } = useFetch("category")
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
            EditCategoryTitle: "",
            EditCategoryLink: "",
          },
        }
      );
      useEffect(() => {
        let filterUpdateUser = categories.find((category) => category._id === updateCategoryID)
        if (filterUpdateUser) {
          reset({
            EditCategoryTitle: filterUpdateUser.title,
            EditCategoryLink: filterUpdateUser.name,
          });
        }
      }, [updateCategoryID]);
  return (
    <form onSubmit={handleSubmit(UpdateCategoryHandler)}>
    <div className="min-w-96">
    <div>
    <div className="relative mb-4">
      <input
          type='text'
          {...register("EditCategoryTitle", {
            required: "وارد کردن نام دسته بندی اجباری می باشد",
            minLength: {
              value: 3,
              message: "لطفا حداقل 3 کاراکتر وارد نمایید",
            },
            maxLength: {
              value: 15,
              message: " لطفا حداکثر ۱۵ کاراکتر وارد نمایید",
            },
          })}
          className={`${
            errors.EditCategoryTitle && "border border-rose-500"
          } outline-none pl-9 sm:pl-12`}
          placeholder='نام دسته بندی*'
          />
      <FolderCopyOutlined className="left-3 sm:left-4" />
      </div>
      <span className="block text-rose-500 text-sm my-2">
            {errors.EditCategoryTitle && errors.EditCategoryTitle.message}
          </span>
      </div>
      <div>
      <div className="relative mb-4">
      <input
          type='text'
          {...register("EditCategoryLink", {
            required: "وارد کردن لینک دسته بندی اجباری می باشد",
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
                "لینک دسته بندی معتبر نمی باشد کاراکترهای (a-zA-Z0-9_) مجاز می باشند",
            },
          })}
          className={`${
            errors.EditCategoryLink && "border border-rose-500"
          } outline-none pl-9 sm:pl-12`}
          placeholder='لینک دسته بندی*'
          />
      <InsertLinkOutlined className="left-3 sm:left-4" />
      </div>
      <span className="block text-rose-500 text-sm my-2">
            {errors.EditCategoryLink && errors.EditCategoryLink.message}
          </span>
      </div>
    </div>
    <div className="flex-center">
      <Button
        btnType="submit"
        className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
        disabled={!formState.isValid}
      >
        ویرایش دسته بندی
      </Button>
    </div>
    </form>
  )
}

export default EditCategory