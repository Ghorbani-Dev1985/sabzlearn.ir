import React, { useEffect, useState } from "react";
import useTitle from "../../../Hooks/useTitle";
import { LocalOffer } from "@mui/icons-material";
import Button from "../../../common/Form/Button";
import usePost from "../../../Hooks/usePost";
import toast from "react-hot-toast";

function Campaign() {
  const title = useTitle("   ایجاد کمپین - پنل کاربری");
  const [discountPercent , setDiscountPercent] = useState('')

      //New Function
      const AddNewCampaignHandler = (event) => {
        event.preventDefault()
          if(discountPercent){
              const addNew = usePost('offs/all' , JSON.stringify({discount : discountPercent}))
              setDiscountPercent('')
          }else{
            toast.error('لطفا درصد تخفیف را وارد نمایید')
          }
      }

  return (
    <>
    <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          ایجاد کمپین  جدید
        </legend>
        <div className="flex flex-wrap justify-between gap-5 child:w-48p">
          <div className="relative">
          <input
              type='text'
              className= 'outline-none pl-9 sm:pl-12 bg-white'
              placeholder='  درصد تخفیف*'
              value={discountPercent}
              onChange={(event) => setDiscountPercent(event.target.value)}
              />
          <LocalOffer className="left-3 sm:left-4" />
          </div>
         </div>
        <div className="flex justify-end items-center">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            onClick={AddNewCampaignHandler}
          >
            ایجاد  
          </Button>
        </div>
      </fieldset>
    </>
  );
}

export default Campaign;
