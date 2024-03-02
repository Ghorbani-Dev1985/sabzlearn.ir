import React, { useEffect, useState } from "react";
import useTitle from "../../../Hooks/useTitle";
import { LocalOffer } from "@mui/icons-material";
import Button from "../../../common/Form/Button";
import usePost from "../../../Hooks/usePost";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ApiRequest from "../../../Services/Axios/Configs/Config";


function Campaign() {
  const title = useTitle("   ایجاد کمپین - پنل کاربری");
  const [discountPercent , setDiscountPercent] = useState('')
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
        DiscountPercent: "",
      },
    }
  );
      //New Function
      const AddNewCampaignHandler = (data) => {
       
        const ResponseResult = ApiRequest.post('offs/all' , {discount : data.DiscountPercent})
        .then((response) => {
          if(response.status === 200){
            toast.success("فعالسازی کمپین با موفقیت انجام شد");
          }
        })
        reset()
      }

  return (
    <>
    <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          ایجاد کمپین  جدید
        </legend>
        <form onSubmit={handleSubmit(AddNewCampaignHandler)}>
        <div className="flex flex-wrap justify-between gap-5 child:w-48p">
        <div>
              <div className="relative">
                <input
                  type="number"
                  {...register("DiscountPercent", {
                    required: "وارد کردن درصد تخفیف اجباری می باشد",
                    maxLength: {
                      value: 2,
                      message: " لطفا حداکثر 2 کاراکتر وارد نمایید",
                    },
                  })}
                  className={`${
                    errors.DiscountPercent && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder="  کد تخفیف*"
                />
                <LocalOffer className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.DiscountPercent && errors.DiscountPercent.message}
              </span>
            </div>
         </div>
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl select-none button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={!formState.isValid}
          >
            ایجاد  
          </Button>
        </div>
        </form>
      </fieldset>
    </>
  );
}

export default Campaign;
