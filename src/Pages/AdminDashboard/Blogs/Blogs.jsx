import React, { useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { useShowLoading } from "../../../Contexts/ShowLoadingContext";
import { useShowRealtimeDatas } from "../../../Contexts/ShowRealtimeDatasContext";
import { useEditModal } from "../../../Contexts/EditModalContext";
import { useDetailsModal } from "../../../Contexts/DetailsModalContext";
import useTitle from "../../../Hooks/useTitle";
import {
  CloudUploadOutlined,
  FolderOpenOutlined,
  InsertLinkOutlined,
  RemoveRedEye,
} from "@mui/icons-material";
import SkeletonLoading from "../../../Components/SkeletonLoading/SkeletonLoading";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import DetailsModal from "../../../Components/AdminDashboard/DetailsModal/DetailsModal";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "../../../common/Form/Button";
import { BaseURL } from "../../../Utils/Utils";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiRequest from "../../../Services/Axios/Configs/Config";

function Blogs() {
  const title = useTitle("مقاله‌ها - پنل کاربری");
  const { datas: Blogs } = useFetch("articles", true);
  const { datas: categories } = useFetch("category", true);
  const { isShowLoading, setIsShowLoading } = useShowLoading();
  const { showRealtimeDatas, setShowRealTimeDatas } = useShowRealtimeDatas();
  const { showEditModal, setShowEditModal } = useEditModal();
  const { showDetailsModal, setShowDetailsModal } = useDetailsModal();
  const [blogBody, setBlogBody] = useState("");
  const [blogCoverFileName, setBlogCoverFileName] = useState("");

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
        BlogTitle: "",
        BlogLink: "",
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
      headerAlign: "center",
      align: "center",
    },
    {
      field: "photo",
      headerName: " عکس ",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return (
          <img
            src={`https://sabzlearn.ghorbani-dev.ir/courses/covers/${blog.row.cover}`}
            className="object-fill"
            alt="ghorbani-dev.ir"
          />
        );
      },
    },
    {
      field: "blogsTitle",
      headerName: " عنوان ",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return blog.row.publish === 1 ? (
          blog.row.title
        ) : (
          <Link
            to={`draft/${blog.row.shortName}`}
            className="text-primary hover:text-emerald-600 transition-colors"
          >
            {blog.row.title}
          </Link>
        );
      },
    },
    {
      field: "creatorName",
      headerName: "   نویسنده",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return blog.row.creator.name;
      },
    },
    {
      field: "creatorPhone",
      headerName: " تلفن نویسنده ",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return blog.row.creator.phone;
      },
    },
    {
      field: "description",
      headerName: " چکیده",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bodyText",
      headerName: "  متن کامل ",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return (
          <p
            onClick={() => {
              setShowDetailsModal(true);
              setBlogBody(blog.row.body);
            }}
            className="bg-amber-100 p-2 rounded-full cursor-pointer hover:bg-amber-200 transition-colors"
          >
            <RemoveRedEye className="size-6 text-amber-500" />
          </p>
        );
      },
    },
    {
      field: "answerStatus",
      headerName: "  وضعیت ",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return blog.row.publish ? (
          <span className="bg-emerald-100 text-primary font-DanaBold p-2 rounded-lg">
            {" "}
            منتشر شده
          </span>
        ) : (
          <span className="bg-rose-100 text-rose-500 p-2 rounded-lg">
            پیش نویس
          </span>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (blog) => {
        return (
          <div
            onClick={() => {
              DeleteBlogHandler(blog.id);
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
  //Draft Function
  const AddNewBlogInDraftHandler = (data) => {
    let newBlogFormData = new FormData()
    newBlogFormData.append('title' , data.BlogTitle)
    newBlogFormData.append('description' , data.BlogSummery)
    newBlogFormData.append('shortName' , data.BlogLink)
    newBlogFormData.append('categoryID' , data.BlogCategoryID)
    newBlogFormData.append('cover' , data.BlogCover[0])
    newBlogFormData.append('body' , data.BlogBody)

    axios.post(`${BaseURL}articles/draft` , newBlogFormData, {
      headers : {
        Authorization : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
    .then(response => {
      if(response.status === 201){
        toast.success("  پیش نویس مقاله با موفقیت انجام شد")
        setBlogBody('')
        setShowRealTimeDatas((prev) => !prev)
      }else{
        toast.error("پیش نویس مقاله انجام نشد")
      }
    })
    reset()
  };
  //Add Function
  const AddNewBlogHandler = (data) => {

    let newBlogFormData = new FormData()
    newBlogFormData.append('title' , data.BlogTitle)
    newBlogFormData.append('description' , data.BlogSummery)
    newBlogFormData.append('shortName' , data.BlogLink)
    newBlogFormData.append('categoryID' , data.BlogCategoryID)
    newBlogFormData.append('body' , data.BlogBody)
    newBlogFormData.append('cover' , data.BlogCover[0])

       axios.post(`${BaseURL}articles` , newBlogFormData, {
         headers : {
           'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
         }
       })
       .then(response => {
         if(response.status === 201){
           toast.success("  افزودن مقاله با موفقیت انجام شد")
           setBlogBody('')
           setShowRealTimeDatas((prev) => !prev)
         }else{
           toast.error("افزودن مقاله انجام نشد");
         }
       })
       reset()
      
  };
  //Delete Function
  const DeleteBlogHandler = (blogID) => {
    Swal.fire({
      title: "برای حذف پیام مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        const ResponseResult = ApiRequest.delete(`articles/${blogID}`)
        .then((response) => {
          if(response.status === 200){
            toast.success("حذف مقاله با موفقیت انجام گردید");
            setShowRealTimeDatas((prev) => !prev);
          }
        })
      }
    });
  };
  // useEffect(() => {
  //   register("BlogBody", {
  //     required: "وارد کردن  بدنه مقاله اجباری می باشد",
  //     minLength: {
  //       value: 15,
  //       message: "لطفا حداقل 15 کاراکتر وارد نمایید",
  //     },
  //   });
  // },[])
  return (
    <>
      <fieldset className="border border-gray-200 rounded-lg p-3 mb-8">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          افزودن مقاله جدید
        </legend>
        <form>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="relative">
                <input
                  type="text"
                  {...register("BlogTitle", {
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
                    errors.BlogTitle && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder="عنوان  *"
                />
                <FolderOpenOutlined className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.BlogTitle && errors.BlogTitle.message}
              </span>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  {...register("BlogLink", {
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
                    errors.BlogLink && "border border-rose-500"
                  } outline-none pl-9 sm:pl-12`}
                  placeholder=" لینک *"
                />
                <InsertLinkOutlined className="left-3 sm:left-4" />
              </div>
              <span className="block text-rose-500 text-sm my-2">
                {errors.BlogLink && errors.BlogLink.message}
              </span>
            </div>
            <div>
              <textarea
                rows="11"
                placeholder="  چکیده *"
                {...register("BlogSummery", {
                  required: "وارد کردن عنوان مقاله اجباری می باشد",
                  minLength: {
                    value: 5,
                    message: "لطفا حداقل ۵ کاراکتر وارد نمایید",
                  },
                  maxLength: {
                    value: 300,
                    message: " لطفا حداکثر 300 کاراکتر وارد نمایید",
                  },
                })}
                className={`${
                  errors.BlogDescription && "border border-rose-500"
                } mb-3 block w-full outline-none p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 rounded-2xl placeholder:font-danaLight transition-colors`}
              ></textarea>
              <span className="block text-rose-500 text-sm my-2">
                {errors.BlogDescription && errors.BlogDescription.message}
              </span>
            </div>
            <div className="relative">
              <select
                 {...register("BlogCategoryID", {
                  required: " انتخاب دسته بندی مقاله اجباری می باشد",
                })}
                onChange={(event) => setValue("BlogCategoryID" , event.target.value)}
                defaultValue=""
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  انتخاب دسته بندی{" "}
                </option>
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
              <span className="block text-rose-500 text-sm my-2">
                {errors.BlogCategoryID && errors.BlogCategoryID.message}
              </span>
              <div className="flex-center w-full mx-auto my-3">
                <div className="w-full">
                  <div className="flex-center w-full relative">
                    <label
                      htmlFor="CoverUpload"
                      className="flex-center flex-col w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex-center flex-col pt-5 pb-6">
                        <CloudUploadOutlined className="text-gray-500 mb-2" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">انتخاب فایل</span> یا
                          فایل را بکشید و اینجا رها کنید
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          WEBP, PNG, JPG , JPEG (سایز 768x432px )
                        </p>
                        <span className="text-mainSlate dark:text-white my-3">{blogCoverFileName}</span>
                      </div>
                      <input
                        id="CoverUpload"
                        type="file"
                        required
                        {...register("BlogCover", {
                          required: "لطفا کاور دوره را انتخاب نمایید",
                          validate: {
                            fileSize: (file) =>
                              file[0].size / (1024 * 1024) < 1 ||
                              "حداکثر حجم فایل باید کمتر از یک مگابایت باشد",
                          },
                        })}
                        onChange={(event) => 
                          setBlogCoverFileName(event.target.files[0].name)
                        }
                        accept=".webp , .jpg , .png, .jpeg"
                        className="h-full absolute z-50 opacity-0"
                      />
                    </label>
                  </div>
                  <span className="block text-rose-500 text-sm my-2">
                    {errors.BlogCover && errors.BlogCover.message}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={blogBody}
           
            onChange={(event, editor) => {
              const data = editor.getData();
              setValue('BlogBody' , data)
              setBlogBody(data);
            }}
            onBlur={(event, editor) => {
              const data = editor.getData();
              setValue('BlogBody' , data)
              setBlogBody(data);
            }}
          />
          <div className="flex justify-end items-center gap-5">
            <Button
              btnType="submit"
              className="button-md h-12 sm:button-lg rounded-xl button-secondary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
              onClick={handleSubmit(AddNewBlogInDraftHandler)}
              disabled={!formState.isValid}
            >
              پیش نویس مقاله
            </Button>
            <Button
              btnType="submit"
              className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
              onClick={handleSubmit(AddNewBlogHandler)}
              disabled={!formState.isValid}
            >
              انتشار مقاله
            </Button>
          </div>
        </form>
      </fieldset>
      {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl">لیست مقاله‌ها</h2>
            <div className="lg:max-w-[40rem] xl:max-w-full">
              {Blogs.length > 0 ? (
                <DataGrid
                  rows={Blogs.map((blog, index) => {
                    return { id: index + 1, ...blog };
                  })}
                  className="dark:text-white"
                  rowHeight={150}
                  getRowId={(blog) => blog._id}
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
                <Alert severity="info">
                  هیچ مقاله ای تاکنون ثبت نگردیده است
                </Alert>
              )}
            </div>
          </div>
        </>
      )}
      {/* Show Detail */}
      <DetailsModal>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogBody) }}
        />
      </DetailsModal>
    </>
  );
}

export default Blogs;
