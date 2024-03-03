import React from "react";
import useFetch from "../../../Hooks/useFetch";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ApiRequest from "../../../Services/Axios/Configs/Config";
import { useShowRealtimeDatas } from "../../../Contexts/ShowRealtimeDatasContext";

function NewTicketForm({ setNewTicketForm }) {
  const { datas: departments } = useFetch("tickets/departments");
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas();
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
        DepartmentID: "",
        TicketTitle: "",
        TicketBody: "",
      },
    }
  );
  const AddNewTicketHandler = (data) => {
    let NewTicketInfo = {
      departmentID: data.DepartmentID,
      departmentSubID: "65cce5bc95ff4d0e047abde2",
      title: data.TicketTitle,
      priority: "2",
      body: data.TicketBody,
      course: undefined,
    };
    const ResponseResult = ApiRequest.post("tickets", NewTicketInfo).then(
      (response) => {
        if (response.status === 201) {
          toast.success("افزودن تیکت جدید با موفقیت انجام شد");
          setShowRealTimeDatas((prev) => !prev);
          setNewTicketForm(false);
        }
      }
    );
    reset();
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-3.5 md:p-4.5 rounded-2xl mb-8">
      <div className="flex-between pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
        <span className="font-DanaMd md:text-xl text-zinc-700 dark:text-white">
          ارسال تیکت
        </span>
      </div>
      <form onSubmit={handleSubmit(AddNewTicketHandler)}>
        <div>
          <label
            htmlFor="department"
            className="font-DanaBold text-zinc-700 dark:text-white"
          >
            دپارتمان
          </label>
          <select
            {...register("DepartmentID", {
              required: " انتخاب دسته بندی مقاله اجباری می باشد",
            })}
            onChange={(event) => setValue("DepartmentID", event.target.value)}
            defaultValue=""
            name="department"
            id="department"
            className="mt-3.5 outline-none md:mt-4 w-full p-3 sm:p-5 font-Dana text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all"
          >
            <option value="" disabled>
              دپارتمان مورد نظر...
            </option>
            {departments.map(({ _id, title }) => {
              return (
                <React.Fragment key={_id}>
                  <option value={_id}>{title}</option>
                </React.Fragment>
              );
            })}
          </select>
          <span className="block text-rose-500 text-sm my-2">
            {errors.DepartmentID && errors.DepartmentID.message}
          </span>
        </div>
        <div className="mt-6">
          <label className="font-DanaBold text-zinc-700 dark:text-white">
            موضوع تیکت
          </label>
          <input
            type="text"
            {...register("TicketTitle", {
              required: "وارد کردن موضوع تیکت اجباری می باشد",
              minLength: {
                value: 5,
                message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
              },
              maxLength: {
                value: 60,
                message: " لطفا حداکثر 60 کاراکتر وارد نمایید",
              },
            })}
            className={`${
              errors.TicketTitle && "border border-rose-500"
            } outline-none mt-3.5 md:mt-4`}
            placeholder="موضوع تیکت خود را وارد کنید"
          />
          <span className="block text-rose-500 text-sm my-2">
            {errors.TicketTitle && errors.TicketTitle.message}
          </span>
        </div>
        <div className="mt-6">
          <label className="font-DanaBold text-zinc-700 dark:text-white">
            متن تیکت
          </label>
          <textarea
            rows="8"
            {...register("TicketBody", {
              required: "وارد کردن متن تیکت اجباری می باشد",
              minLength: {
                value: 20,
                message: "لطفا حداقل 20 کاراکتر وارد نمایید",
              },
              maxLength: {
                value: 150,
                message: " لطفا حداکثر 150 کاراکتر وارد نمایید",
              },
            })}
            placeholder="متن تیکت خود را وارد کنید"
            className={`${
              errors.TicketBody && "border border-rose-500"
            } mt-3.5 outline-none md:mt-4 w-full p-3 sm:p-5 font-Dana text-sm sm:text-base tracking-tight text-zinc-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl border border-transparent focus:border-gray-300 dark:focus:border-mainSlate placeholder:text-slate-500 dark:placeholder:text-gray-500 transition-all`}
          ></textarea>
          <span className="block text-rose-500 text-sm my-2">
            {errors.TicketBody && errors.TicketBody.message}
          </span>
        </div>
        <div className="flex justify-between gap-5 flex-wrap mt-6">
          <div className="flex gap-x-3 mr-auto">
            <button
              type="submit"
              className="button-md button-primary rounded-xl disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
              disabled={!formState.isValid}
            >
              ارسال
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewTicketForm;
